defmodule AshSwarm.Reactors.GreetReactorTest do
  use ExUnit.Case
  import ExUnit.CaptureLog
  alias AshSwarm.Reactors.GreetReactor

  setup do
    Logger.configure(level: :debug)
    :ok
  end

  # Scenario: Running the reactor with a name
  # Given the input "Alice"
  # When the reactor executes
  # Then the output should be "Hello, Alice"
  # And the log should contain "Step `greet` completed successfully"
  test "runs successfully with a name" do
    log =
      capture_log(fn ->
        {:ok, result} = Reactor.run(GreetReactor, %{name: "Alice"})
        assert result == "Hello, Alice"
      end)

    assert log =~ "▶️ Step `greet` started"
    assert log =~ "✅ Step `greet` completed successfully"
  end

  # Scenario: Running the reactor without a name
  # Given no input
  # When the reactor executes
  # Then the output should be "Hello, World!"
  # And the log should contain "Step `greet` completed successfully"
  test "runs successfully without a name" do
    log =
      capture_log(fn ->
        {:ok, result} = Reactor.run(GreetReactor, name: nil)
        assert result == "Hello, World!"
      end)

    assert log =~ "▶️ Step `greet` started"
    assert log =~ "✅ Step `greet` completed successfully"
  end

  # Scenario: Running the reactor with a failing step
  # Given the failing step is enabled
  # When the reactor executes
  # Then the reactor should fail
  # And the log should contain "Step `fail` encountered an error"
  test "handles failures" do
    # Define a failing version of GreetReactor dynamically
    defmodule FailingGreetReactor do
      use Reactor

      input :name

      middlewares do
        middleware AshSwarm.Reactors.Middlewares.DebugMiddleware
      end

      step :greet do
        argument :name, input(:name)

        run fn
          %{name: nil}, _ -> {:ok, "Hello, World!"}
          %{name: name}, _ -> {:ok, "Hello, #{name}"}
        end
      end

      step :fail, Reactor.Step.Fail
    end

    log =
      capture_log(fn ->
        {:error, _reason} =
          Reactor.run(FailingGreetReactor, %{name: "Alice"}, %{verbose: true})
      end)

    assert log =~ "❌ Step `fail` encountered an error"
  end
end
