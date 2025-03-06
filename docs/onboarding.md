# Developer Onboarding Guide for AshSwarm

Welcome to AshSwarm! This guide will help you get up to speed on the codebase and development practices.

## What is AshSwarm?

AshSwarm is an Elixir project that combines the Ash Framework with concurrency patterns to create domain-specific "swarms" that coordinate multiple steps and LLM (Large Language Model) interactions. Instead of using complex, black-box "agent" frameworks, AshSwarm provides explicit, step-based orchestration of AI interactions.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Elixir and Erlang (recommend using `asdf` for version management)
- PostgreSQL (for Oban jobs and domain persistence)
- An API key for an LLM provider (OpenAI, Groq, etc.)

### First-Time Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/you/ash_swarm.git
   cd ash_swarm
   ```

2. Install dependencies:
   ```bash
   mix deps.get
   ```

3. Set up the database:
   ```bash
   mix ecto.create
   mix ecto.migrate
   ```

4. Configure your environment variables:
   ```bash
   # Set up your LLM provider API key
   export GROQ_API_KEY=your_groq_api_key
   # Or
   export OPENAI_API_KEY=your_openai_api_key
   
   # Set default adapter if needed
   export ASH_SWARM_DEFAULT_INSTRUCTOR_ADAPTER=Instructor.Adapters.Groq
   ```

5. Run the server:
   ```bash
   mix phx.server
   ```

## Key Concepts

To work effectively with AshSwarm, you should understand these core concepts:

### 1. Ash Framework

AshSwarm builds on [Ash Framework](https://ash-hq.org/), a declarative, resource-oriented framework for Elixir. Key Ash concepts used in this project:

- **Resources**: Declarative entities (e.g., `Question` in `lib/ash_swarm/reactors/question.ex`)
- **Domains**: Groupings of related resources
- **Actions**: Operations that can be performed on resources

### 2. DSL Modeling

AshSwarm implements a DSL (Domain-Specific Language) modeling approach:

- Uses the `ToFromDSL` behavior (`lib/ash_swarm/to_from_dsl.ex`)
- Allows serializing/deserializing between YAML/JSON and Elixir structures
- Example implementation in `AshSwarm.DSLModel` (`lib/ash_swarm/dsl_model.ex`)

### 3. Domain Reasoning

Domain reasoning is implemented in:

- `AshSwarm.DomainReasoning` (`lib/ash_swarm/domain_reasoning.ex`)
- Ecto schemas in `lib/ash_swarm/ecto_schema/domain_reasoning.ex`

It represents resources, relationships, and reasoning steps in a structured format.

### 4. Reactors

[Reactors](https://github.com/ash-project/reactor) provide step-based workflow orchestration:

- `QASaga` (`lib/ash_swarm/reactors/qa_saga.ex`) - Orchestrates question-answer flows
- `QASagaJob` (`lib/ash_swarm/reactors/qa_saga_job.ex`) - Integrates with Oban for scheduled execution

### 5. LLM Integration

LLM integration happens through:

- `AshSwarm.InstructorHelper` (`lib/ash_swarm/instructor_helper.ex`)
- Uses the Instructor library for structured LLM interactions

### 6. Adaptive Code Evolution

Adaptive Code Evolution is a pattern that enables continuous improvement of code based on usage patterns:

- `AshSwarm.Foundations.AICodeAnalysis` (`lib/ash_swarm/foundations/ai_code_analysis.ex`) - Analyzes code to identify opportunities
- `AshSwarm.Foundations.AIAdaptationStrategies` (`lib/ash_swarm/foundations/ai_adaptation_strategies.ex`) - Generates optimized implementations
- `AshSwarm.Foundations.AIExperimentEvaluation` (`lib/ash_swarm/foundations/ai_experiment_evaluation.ex`) - Evaluates optimization experiments

You can try the feature using:
- Demo script: `mix run demo_adaptive_code_evolution.exs`
- Stress test: `mix run stress_test_adaptive_code_evolution.exs`

Both scripts require a valid Groq API key set in the `GROQ_API_KEY` environment variable.

## Development Workflow

### Running the Application

```bash
# Start the Phoenix server
mix phx.server

# Or start with an interactive console
iex -S mix phx.server
```

### Running LiveBooks

AshSwarm includes several LiveBooks for interactive exploration:

1. Start the LiveBook server:
   ```bash
   livebook server
   ```

2. Open the LiveBook UI (usually at http://localhost:8080)

3. Navigate to one of the example LiveBooks in the `live_books/` directory:
   - `streaming_orderbot.livemd`
   - `reactor_practice.livemd`
   - `ash_domain_reasoning.livemd`

### Running Tests

```bash
# Run all tests
mix test

# Run a specific test file
mix test test/ash_swarm/dsl_model_test.exs

# Run tests with code coverage report
mix test --cover
```

## Common Development Tasks

### Creating a New DSL Model

1. Create a new module that uses the `ToFromDSL` behavior
2. Implement the required callbacks: `model_dump/1`, `model_validate/1`, and `model_dump_json/2`
3. Define a struct with the desired fields

Example:
```elixir
defmodule MyNewModel do
  use ToFromDSL
  
  defstruct [:field1, :field2]
  
  @impl true
  def model_dump(%__MODULE__{} = struct), do: Map.from_struct(struct)
  
  @impl true
  def model_validate(data) when is_map(data) do
    %__MODULE__{
      field1: Map.get(data, "field1") || Map.get(data, :field1),
      field2: Map.get(data, "field2") || Map.get(data, :field2)
    }
  end
  
  @impl true
  def model_dump_json(%__MODULE__{} = struct, opts \\ []) do
    indent = Keyword.get(opts, :indent, 2)
    Jason.encode!(Map.from_struct(struct), pretty: indent > 0)
  end
end
```

### Creating a New Reactor

1. Define a new module that uses `Ash.Reactor`
2. Define inputs, steps, and a return value

Example:
```elixir
defmodule MyNewReactor do
  use Ash.Reactor
  
  ash do
    default_domain MyApp.Domain
  end
  
  input(:input_parameter)
  
  action :my_step, MyResource, :some_action do
    inputs(%{param: input(:input_parameter)})
  end
  
  return(:my_step)
end
```

### Working with LLMs

Use the `AshSwarm.InstructorHelper.gen/4` function:

```elixir
AshSwarm.InstructorHelper.gen(
  %{answer: :string},           # Response model
  "You are a helpful assistant", # System message
  "What is the capital of France?", # User message
  "gpt-4o"                       # Optional: model name
)
```

## Code Organization

- `lib/ash_swarm/` - Core business logic
- `lib/ash_swarm_web/` - Web interface components
- `test/` - Test files
- `config/` - Configuration files
- `priv/` - Private assets and migrations
- `live_books/` - Interactive LiveBook examples

## Getting Help

- Check the project documentation in `docs/`
- Refer to example LiveBooks in `live_books/`
- Review test cases for usage examples
- Consult the [Ash Framework documentation](https://hexdocs.pm/ash/Ash.html)
- Ask questions in the project's communication channels

## Contributing

1. Create a new branch for your feature or bugfix
2. Write tests for your changes
3. Implement your changes
4. Ensure tests pass with `mix test`
5. Submit a pull request with a clear description of your changes

Welcome aboard, and happy coding! 