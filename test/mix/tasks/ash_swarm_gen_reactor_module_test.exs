defmodule Mix.Tasks.AshSwarm.Gen.ReactorModuleTest do
  use ExUnit.Case, async: true
  alias Mix.Tasks.AshSwarm.Gen.Reactor

  describe "parse_inputs/1" do
    test "parses valid inputs" do
      assert Reactor.parse_inputs(["email:string", "password:string"]) == [:email, :password]
    end

    test "raises error on invalid format" do
      assert_raise Mix.Error, fn -> Reactor.parse_inputs(["email"]) end
    end

    test "handles empty inputs gracefully" do
      assert Reactor.parse_inputs([]) == []
    end
  end

  describe "parse_steps/1" do
    test "parses valid steps" do
      assert Reactor.parse_steps(["register_user:MyApp.RegisterUserStep"]) ==
               [{:register_user, MyApp.RegisterUserStep}]
    end

    test "raises error on invalid step format" do
      assert_raise Mix.Error, fn -> Reactor.parse_steps(["register_user"]) end
    end

    test "handles empty steps gracefully" do
      assert Reactor.parse_steps([]) == []
    end
  end
end
