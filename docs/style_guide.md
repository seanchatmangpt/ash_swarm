# AshSwarm Code Style Guide

This guide documents the coding patterns, practices, and style conventions used in the AshSwarm project.

## Table of Contents

- [General Principles](#general-principles)
- [File Organization](#file-organization)
- [Naming Conventions](#naming-conventions)
- [Module Structure](#module-structure)
- [Documentation](#documentation)
- [Formatting](#formatting)
- [Elixir-Specific Patterns](#elixir-specific-patterns)
- [Ash Framework Patterns](#ash-framework-patterns)
- [Testing Conventions](#testing-conventions)
- [DSL Style Guidelines](#dsl-style-guidelines)
- [Error Handling](#error-handling)

## General Principles

AshSwarm follows these general coding principles:

1. **Clarity over cleverness** - Prefer clear, readable code over clever or terse solutions.
2. **Explicit over implicit** - Be explicit about intentions and functionality.
3. **Consistent patterns** - Use consistent patterns and structures throughout the codebase.
4. **Proper abstraction** - Create abstractions that make sense within the domain.
5. **Let it crash** - Follow Elixir's "let it crash" philosophy with proper supervision.

## File Organization

### Directory Structure

```
/lib
  /ash_swarm             # Core business logic
    /ecto_schema         # Ecto schemas
    /reactors            # Reactor definitions
      /middleware        # Reactor middleware
      /steps             # Reactor steps
  /ash_swarm_web         # Web interface components
/test                    # Test files
/config                  # Configuration files
/priv                    # Private assets and migrations
/live_books              # Interactive LiveBook examples
/docs                    # Documentation
```

### File Naming

- Use **snake_case** for file names.
- Files should match the module name they contain (e.g., `lib/ash_swarm/dsl_model.ex` for `AshSwarm.DSLModel`).
- Test files should end with `_test.exs`.

## Naming Conventions

### Modules

- Use **PascalCase** for module names.
- Use plural forms for modules that represent collections (e.g., `AshSwarm.Reactors`).
- Use singular forms for modules that represent a single concept (e.g., `AshSwarm.DSLModel`).

### Functions

- Use **snake_case** for function names.
- Use descriptive names that clearly indicate what the function does.
- Verb-first naming for functions that perform actions (e.g., `create_user`, `validate_data`).
- Prefer `get_*` for retrievals, `update_*` for modifications, etc.

### Variables

- Use **snake_case** for variable names.
- Use descriptive names that clearly indicate the content or purpose.
- Single-letter variables are acceptable only in very short, simple functions or for common patterns (e.g., `e` for errors in `rescue` blocks).

### Atoms

- Use **snake_case** for atom names.
- For atoms that represent status or types, prefer clear descriptive names (e.g., `:domain_resource`, `:ok`, `:error`).

## Module Structure

Organize module contents in the following order:

1. `use` statements and imports
2. `alias` statements
3. `require` statements 
4. Module attributes and constants
5. Type definitions
6. Public API functions
7. Private implementation functions
8. Callback implementations

Example:

```elixir
defmodule AshSwarm.SomeModule do
  @moduledoc """
  Documentation for the module.
  """
  
  use Ash.Resource
  use Instructor
  
  alias AshSwarm.OtherModule
  alias AshSwarm.ThirdModule
  
  require Logger
  
  @some_constant "value"
  
  @type some_type :: String.t()
  
  # Public API
  def public_function(arg) do
    # implementation
  end
  
  # Private implementation
  defp private_helper(arg) do
    # implementation
  end
  
  # Callback implementations
  @impl true
  def callback_function(arg) do
    # implementation
  end
end
```

## Documentation

### Module Documentation

Every module should have a `@moduledoc` that explains:

1. The purpose of the module
2. How it fits into the larger system
3. Any important implementation details or usage notes

Example:

```elixir
defmodule AshSwarm.DSLModel do
  @moduledoc """
  A sample model that demonstrates how to implement the ToFromDSL behaviour
  for YAML/JSON/TOML serialization.
  """
  # ...
end
```

### Function Documentation

Public functions should have a `@doc` that explains:

1. What the function does
2. Input parameters and their types
3. Return values and their types
4. Any exceptions or errors that might be raised

Example:

```elixir
@doc """
Generates a completion using Instructor.chat_completion.

## Parameters

  - `response_model`: The expected structure for the response (map, Ecto embedded schema, or partial).
  - `sys_msg`: The system message providing context to the LLM.
  - `user_msg`: The user prompt.
  - `model`: (Optional) The LLM model to use. Defaults to `"llama-3.1-8b-instant"`.

## Returns

  - `{:ok, result}` on success.
  - `{:error, reason}` on failure.
"""
def gen(response_model, sys_msg, user_msg, model \\ nil) do
  # implementation
end
```

### Type Specifications

Use `@spec` annotations for public functions to document their input and output types:

```elixir
@spec gen(map() | struct(), String.t(), String.t(), String.t() | nil) :: 
        {:ok, map()} | {:error, term()}
def gen(response_model, sys_msg, user_msg, model \\ nil) do
  # implementation
end
```

## Formatting

AshSwarm follows standard Elixir formatting conventions:

1. Use 2-space indentation.
2. Keep line length under 100 characters when possible.
3. Use the standard Elixir formatter (`mix format`).
4. Follow the formatting rules defined in `.formatter.exs`.

## Elixir-Specific Patterns

### Pattern Matching

- Prefer pattern matching in function heads over conditional logic in function bodies.
- Use guard clauses for type checks and simple conditions.

```elixir
# Good
def process(%{status: :done} = item), do: {:ok, item}
def process(%{status: :pending} = item), do: process_pending(item)

# Avoid
def process(item) do
  case item.status do
    :done -> {:ok, item}
    :pending -> process_pending(item)
  end
end
```

### Pipelines

- Use the pipe operator (`|>`) for sequences of operations on the same data.
- Maintain consistent indentation in pipelines.
- Aim for clarity in pipeline operations.

```elixir
# Good
def transform_data(data) do
  data
  |> validate_structure()
  |> enrich_with_metadata()
  |> convert_to_output_format()
end
```

### Error Handling

- Use the `{:ok, result}` and `{:error, reason}` pattern for functions that might fail.
- Leverage the `with` statement for combining multiple operations that might fail.

```elixir
def complex_operation(input) do
  with {:ok, validated} <- validate(input),
       {:ok, processed} <- process(validated),
       {:ok, result} <- finalize(processed) do
    {:ok, result}
  end
end
```

## Ash Framework Patterns

### Resource Definitions

Follow these patterns when defining Ash resources:

```elixir
defmodule AshSwarm.SomeResource do
  use Ash.Resource,
    data_layer: Ash.DataLayer.Ets,
    extensions: [AshAdmin.Resource]

  attributes do
    uuid_primary_key :id
    attribute :name, :string, allow_nil?: false
    timestamps()
  end

  actions do
    defaults [:read, :destroy, create: [:name], update: [:name]]
    
    action :custom_action, :string do
      argument :arg, :string, allow_nil?: false
      run fn input, _ ->
        # implementation
      end
    end
  end
end
```

### Reactor Definitions

Follow these patterns when defining Ash reactors:

```elixir
defmodule AshSwarm.SomeReactor do
  use Ash.Reactor

  ash do
    default_domain AshSwarm.SomeDomain
  end

  input(:input_parameter)

  action :some_step, AshSwarm.SomeResource, :some_action do
    inputs(%{param: input(:input_parameter)})
  end

  return(:some_step)
end
```

## Testing Conventions

### Test File Organization

- Test files should mirror the structure of the application code.
- Group tests using `describe` blocks for related functionality.
- Use descriptive test names that clearly state what is being tested.

```elixir
defmodule AshSwarmTest.DSLModelTest do
  use ExUnit.Case, async: true

  alias AshSwarm.DSLModel

  describe "from_map/1" do
    test "creates a struct from a valid map" do
      # test code
    end

    test "raises an error when 'name' is missing" do
      # test code
    end
  end

  describe "to_json/2 and from_json/2" do
    test "round trips a struct to JSON and back" do
      # test code
    end
  end
end
```

### Test Data and Setup

- Use setup blocks for common test data preparation.
- Prefer creating test data within the test to ensure isolation.
- Clean up any persistent resources in `on_exit` callbacks.

```elixir
setup do
  # Setup code
  model = %DSLModel{name: "Test", description: "For testing", count: 123}
  
  on_exit(fn ->
    # Cleanup code
  end)
  
  %{model: model}
end
```

## DSL Style Guidelines

### YAML/JSON Files

- Use 2-space indentation in YAML and JSON files.
- Prefer YAML for human-edited files due to its readability.
- Organize fields logically, with identifying fields (like `name`) first.

Example YAML:

```yaml
name: User
attributes:
  - name: email
    type: string
    allow_nil: false
  - name: password
    type: string
    sensitive: true
relationships:
  - name: posts
    destination: Post
    cardinality: many
```

### Embedded DSLs

When using Elixir for DSL-like configuration:

- Keep indentation consistent and aligned.
- Group related items together.
- Use blank lines to separate logical sections.

```elixir
actions do
  defaults [:read, :destroy]
  
  action :create, :create do
    argument :name, :string, allow_nil?: false
    argument :email, :string, allow_nil?: false
  end
  
  action :update, :update do
    argument :name, :string
    argument :email, :string
  end
end
```

## Error Handling

### Error Classification

Classify errors into these categories:

1. **Expected Domain Errors** - Problems within the domain logic (e.g., validation failures)
2. **Programming Errors** - Bugs in the code (e.g., passing wrong types)
3. **External Failures** - Issues with external services (e.g., LLM API timeouts)

### Error Response Patterns

- Use `{:ok, result}` and `{:error, reason}` tuples for functions that might fail.
- For domain errors, provide structured error information (e.g., `{:error, %{field: :name, message: "is required"}}`)
- For catastrophic errors, let them crash and handle with supervision.

```elixir
# Domain error
def validate_model(%{name: nil}), do: {:error, "name is required"}

# External service error
def call_llm(prompt) do
  case make_api_call(prompt) do
    {:ok, response} -> {:ok, parse_response(response)}
    {:error, %{status: 429}} -> {:error, :rate_limited}
    {:error, _} = error -> error
  end
end
```

### Error Logging

- Log all significant errors with appropriate context.
- Use log levels appropriately:
  - `:debug` for detailed troubleshooting information
  - `:info` for general operational information
  - `:warn` for concerning but non-critical issues
  - `:error` for failures that need attention

```elixir
case AshSwarm.InstructorHelper.gen(response_model, sys_msg, user_msg) do
  {:ok, result} ->
    {:ok, result}
  {:error, error} ->
    Logger.error("Failed to generate response: #{inspect(error)}")
    {:error, "Failed to generate response"}
end
``` 