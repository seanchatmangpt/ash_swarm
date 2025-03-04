defmodule AshSwarm.Reactors.GreetReactor do
  use Reactor

  input :name do
    description "The name to greet."
  end

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

  # step :fail, Reactor.Step.Fail
end
