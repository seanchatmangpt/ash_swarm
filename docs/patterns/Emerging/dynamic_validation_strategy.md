# Dynamic Validation Strategy Pattern

## Status
**Partially Implemented**

## Description
The Dynamic Validation Strategy pattern enables resources to adapt their validation rules based on context, external services, or AI recommendations. This pattern goes beyond static validation rules, allowing for complex, context-aware validation logic that can evolve over time.

This pattern is particularly valuable for applications with complex business rules that change based on context, user roles, or external factors.

## Current Implementation
AshSwarm has a partial implementation of this pattern through the following components:

1. `AshSwarm.InstructorHelper` - A helper module for interacting with LLMs through the Instructor library, which can be used for validation.
2. `AshSwarm.Reactors.Question` - Uses the `InstructorHelper` to validate and transform input data.

These components provide the foundation for dynamic validation using LLMs, but don't yet offer a comprehensive, reusable pattern for all resources.

## Key Components

- `lib/ash_swarm/instructor_helper.ex` - Helper module for structured interaction with LLMs
- `lib/ash_swarm/reactors/question.ex` - Example of basic LLM-powered validation

## Example Usage
The current implementation demonstrates basic LLM-powered validation in the Question resource:

```elixir
# From lib/ash_swarm/reactors/question.ex
action :ask, :string do
  argument :question, :string, allow_nil?: false
  description "Submit a question to the LLM and receive an answer."

  run fn input, _ ->
    sys_msg = "You are a helpful assistant."
    user_msg = input.arguments.question

    case AshSwarm.InstructorHelper.gen(%{answer: :string}, sys_msg, user_msg) do
      {:ok, %{answer: answer}} ->
        {:ok, answer}

      {:error, error} ->
        {:error, error}
    end
  end
end
```

## Implementation Gaps
While the current implementation provides basic LLM-powered validation, it lacks:

1. A standardized approach to defining and applying dynamic validation strategies
2. Easy integration with Ash's validation pipeline
3. Caching and optimization for repeated validation calls
4. Support for combining multiple validation strategies
5. Context-aware validation strategy selection

## Implementation Recommendations
To fully implement this pattern in AshSwarm, consider:

1. Creating a reusable module for dynamic validation strategies:
   - Define a consistent way to declare validation strategies
   - Integrate with Ash's validation pipeline
   - Support for multiple strategy types (rule-based, LLM-based, etc.)

2. Implementing context-aware strategy selection:
   - Automatically select validation strategies based on context
   - Support for fallbacks when primary strategies are unavailable

3. Adding caching and optimization:
   - Cache validation results to reduce redundant validations
   - Batch similar validations for efficiency

4. Building validation strategy management:
   - Tools to monitor validation performance and accuracy
   - Mechanisms to update strategies based on feedback

## Potential Implementation

```elixir
defmodule AshSwarm.Patterns.DynamicValidationStrategy do
  defmacro __using__(_opts) do
    quote do
      # Define dynamic validation strategies
      Module.register_attribute(__MODULE__, :validation_strategies, accumulate: true)
      
      import AshSwarm.Patterns.DynamicValidationStrategy, only: [validation_strategy: 2]
      
      @before_compile AshSwarm.Patterns.DynamicValidationStrategy
    end
  end
  
  defmacro validation_strategy(name, do: block) do
    quote do
      @validation_strategies {unquote(name), unquote(block)}
    end
  end
  
  defmacro __before_compile__(_env) do
    quote do
      def apply_validation_strategy(changeset, strategy_name, opts \\ []) do
        case Enum.find(@validation_strategies, fn {name, _} -> name == strategy_name end) do
          {^strategy_name, strategy_fn} ->
            strategy_fn.(changeset, opts)
          nil ->
            raise "Unknown validation strategy: #{inspect(strategy_name)}"
        end
      end
      
      # Register custom validation with Ash
      validation :apply_dynamic_strategy, {__MODULE__, :apply_validation_strategy, []}
    end
  end
  
  # Example implementation for AI-powered validation
  def apply_ai_validation(changeset, field, prompt) do
    value = Ash.Changeset.get_attribute(changeset, field)
    
    case AshSwarm.InstructorHelper.gen(
      %{is_valid: :boolean, reason: :string},
      "You are a validation expert. Determine if this value is valid.",
      "Value to validate: #{inspect(value)}\nPrompt: #{prompt}"
    ) do
      {:ok, %{is_valid: true}} -> changeset
      {:ok, %{is_valid: false, reason: reason}} -> 
        Ash.Changeset.add_error(changeset, field, reason)
      {:error, _} -> 
        changeset
    end
  end
end
```

## Usage Example

```elixir
defmodule MyApp.Resources.Product do
  use Ash.Resource,
    extensions: [AshSwarm.Patterns.DynamicValidationStrategy]
  
  # Define a custom validation strategy
  validation_strategy :validate_product_description do
    fn changeset, _opts ->
      description = Ash.Changeset.get_attribute(changeset, :description)
      
      if String.length(description) < 10 do
        Ash.Changeset.add_error(changeset, :description, "Description too short")
      else
        # Use AI validation for complex cases
        AshSwarm.Patterns.DynamicValidationStrategy.apply_ai_validation(
          changeset, 
          :description, 
          "Is this product description appropriate and complete?"
        )
      end
    end
  end
  
  # Use the validation in actions
  actions do
    create :create do
      accept [:name, :description, :price]
      
      validate :apply_dynamic_strategy, strategy: :validate_product_description
    end
  end
  
  # Resource definition...
end
```

## Benefits of Implementation
Fully implementing this pattern would provide several benefits:

1. **Adaptable Validation**: Validation rules that adapt to changing business requirements.
2. **Context-Awareness**: Validation logic that considers the full context of an operation.
3. **Reduced Code Complexity**: Centralizing complex validation logic in reusable strategies.
4. **Enhanced User Experience**: More accurate and helpful validation error messages.
5. **AI Integration**: Leveraging LLMs for complex validation scenarios.

## Related Resources
- [Ash Framework Validation Documentation](https://hexdocs.pm/ash/validations.html)
- [Instructor Library](https://github.com/hypothetical/instructor-ex)
- [Domain-Driven Validation](https://martinfowler.com/articles/validation-dsl.html) 