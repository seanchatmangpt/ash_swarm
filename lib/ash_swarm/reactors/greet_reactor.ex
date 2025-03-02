defmodule AshSwarm.Reactors.GreetReactor do
  use Reactor

  input :name

  middlewares do
    middleware AshSwarm.Reactors.Middleware.DebugMiddleware
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
