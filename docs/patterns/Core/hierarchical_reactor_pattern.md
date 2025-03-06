# Hierarchical Multi-Level Reactor Pattern

**Status**: Minimal Implementation

## Description

This pattern extends the Reactor pattern to support hierarchical workflows, allowing parent reactors to manage child reactors dynamically. It enables modeling complex business processes as a hierarchy of reactors, where higher-level reactors can spawn, monitor, and coordinate lower-level reactors based on their results.

## Current Implementation

The pattern has minimal implementation in AshSwarm:

1. Basic reactor implementation in `AshSwarm.Reactors.QASaga`
2. Example reactor middleware in `AshSwarm.Reactors.Middlewares.DebugMiddleware`
3. Job handling in `AshSwarm.Reactors.QASagaJob`
4. Examples in the `reactor_practice.livemd` notebook

### Key Components

- `lib/ash_swarm/reactors.ex`: Domain definition for reactors
- `lib/ash_swarm/reactors/qa_saga.ex`: Basic reactor implementation
- `lib/ash_swarm/reactors/middlewares/debug_middleware.ex`: Middleware for debugging reactors
- `live_books/reactor_practice.livemd`: Examples of reactor usage

### Example Usage

The current implementation demonstrates:
1. Creating simple reactors with steps
2. Adding middleware for debugging and monitoring
3. Running reactors as jobs
4. Integrating reactors with Ash resources

## Implementation Gaps

While the current implementation provides basic reactor functionality, it lacks the hierarchical aspects:

1. No parent-child relationship between reactors
2. No dynamic spawning of child reactors
3. No coordination between multiple reactor levels
4. Limited error handling and recovery across reactor hierarchies

## Implementation Recommendations

To fully implement this pattern:

1. Create a hierarchical reactor base module that can spawn child reactors
2. Implement coordination and communication between parent and child reactors
3. Add monitoring and supervision capabilities
4. Create patterns for error handling and recovery across the hierarchy
5. Implement testing utilities for hierarchical reactors

## Code Examples

Current implementation in qa_saga.ex:

```elixir
defmodule AshSwarm.Reactors.QASaga do
  use Ash.Reactor

  ash do
    default_domain AshSwarm.Reactors
  end

  # Define the input to the saga.
  input(:question)

  # Use an action step that calls our resource's :ask action.
  action :ask_question, AshSwarm.Reactors.Question, :ask do
    inputs(%{question: input(:question)})
  end

  # Return the result of the ask_question step.
  return(:ask_question)
end
```

Example middleware in debug_middleware.ex:

```elixir
defmodule AshSwarm.Reactors.Middlewares.DebugMiddleware do
  @moduledoc """
  A Reactor middleware that logs debug information.

  This middleware logs the start and stop of the Reactor execution, as well as the
  execution of individual steps, including their inputs, results, errors, and retries.

  Add verbose to the context to log the context and step details.
  """

  use Reactor.Middleware
  require Logger

  @doc false
  @impl true
  def init(context) do
    verbose = Map.get(context, :verbose, false)

    log_message =
      if verbose do
        """
        🚀 Reactor started execution.

        📌 Context:
        #{inspect(context, pretty: true)}
        """
      else
        "🚀 Reactor started execution."
      end

    Logger.info(log_message)
    {:ok, context}
  end

  # Additional middleware implementation...
end
```

## Related Resources

- [Reactor Library Documentation](https://hexdocs.pm/reactor/Reactor.html)
- [Ash Reactors Documentation](https://hexdocs.pm/ash/reactors.html)
- [Hierarchical State Machines Pattern](https://statecharts.dev/) 