import Mox
import ExUnit.CaptureIO

defmodule Mix.Tasks.Reactor.Gen.ReactorMocksTest do
  use ExUnit.Case, async: false
  alias Mix.Tasks.Reactor.Gen.Reactor

  setup :verify_on_exit!

  setup do
    Application.put_env(:my_app, :igniter, MockIgniter)
    :ok
  end

  test "Successfully generating a reactor without creating files" do
    # Given Igniter is mocked
    MockIgniter
    |> expect(:module_exists, fn _, _ -> {false, %Igniter{assigns: %{}}} end)
    |> expect(:create_module, fn _, module_name, _ ->
      Mix.shell().info("Mocking module creation: #{module_name}")
      %Igniter{assigns: %{}} # Return a valid struct
    end)

    # When I run `mix reactor.gen.reactor MyApp.CheckoutReactor --inputs email:string --steps register_user:MyApp.RegisterUserStep --return register_user`
    args = %{
      positional: %{reactor: "MyApp.CheckoutReactor"},  # ✅ Ensure positional exists
      options: %{
        inputs: ["email:string"],
        steps: ["register_user:MyApp.RegisterUserStep"],
        return: "register_user"
      },
      argv_flags: []
    }

    igniter_struct = %Igniter{%{args: args}}

    output =
      capture_io(fn ->
        Mix.Tasks.Reactor.Gen.Reactor.igniter(igniter_struct)
      end)

    # Then `module_exists/2` should be called with "MyApp.CheckoutReactor"
    # And `create_module/3` should be called with "MyApp.CheckoutReactor"
    # And `create_module/3` should be called with "MyApp.RegisterUserStep"
    assert output =~ "Mocking module creation: MyApp.CheckoutReactor"
    assert output =~ "Mocking module creation: MyApp.RegisterUserStep"
  end

  test "Skipping existing files when --ignore-if-exists is passed" do
    # Given Igniter is mocked
    MockIgniter
    |> expect(:module_exists, fn _, _ -> {true, %Igniter{assigns: %{}}} end)

    # When I run `mix reactor.gen.reactor MyApp.CheckoutReactor --ignore-if-exists`
    args = %{
      positional: %{reactor: "MyApp.CheckoutReactor"},  # ✅ Ensure positional exists
      options: %{
        inputs: ["email:string"],
        steps: ["register_user:MyApp.RegisterUserStep"],
        return: "register_user"
      },
      argv_flags: ["--ignore-if-exists"]
    }

    igniter_struct = %Igniter{assigns: %{args: args}}

    output =
      capture_io(fn ->
        Mix.Tasks.Reactor.Gen.Reactor.igniter(igniter_struct)
      end)

    # Then `module_exists/2` should be called with "MyApp.CheckoutReactor"
    # And `create_module/3` should not be called
    assert output =~ "Skipping Reactor generation: MyApp.CheckoutReactor already exists."
  end

  test "Handling failure when create_module/3 fails" do
    # Given Igniter is mocked
    MockIgniter
    |> expect(:module_exists, fn _, _ -> {false, %Igniter{assigns: %{}}} end)
    |> expect(:create_module, fn _, _, _ -> {:error, "Failed to create module"} end)

    # When I run `mix reactor.gen.reactor MyApp.CheckoutReactor`
    args = %{
      positional: %{reactor: "MyApp.CheckoutReactor"},  # ✅ Ensure positional exists
      options: %{
        inputs: ["email:string"],
        steps: ["register_user:MyApp.RegisterUserStep"],
        return: "register_user"
      },
      argv_flags: []
    }

    igniter_struct = %Igniter{assigns: %{args: args}}

    output =
      capture_io(fn ->
        assert_raise Mix.Error, "Failed to create module", fn ->
          Mix.Tasks.Reactor.Gen.Reactor.igniter(igniter_struct)
        end
      end)

    # Then the process should exit with an error
    assert output =~ "Error: Failed to create module"
  end
end
