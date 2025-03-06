# Adaptive Code Evolution

## Overview

Adaptive Code Evolution is a powerful feature of AshSwarm that automatically optimizes code and generates comprehensive documentation using AI. This pattern leverages modern AI models to analyze code, identify optimization opportunities, and implement them while maintaining the original functionality.

## Features

- **Automatic Code Optimization**: Transforms inefficient code into optimized implementations
- **Documentation Generation**: Creates detailed documentation for the optimized code
- **Evaluation System**: Provides success ratings and recommendations for the optimizations
- **CLI Integration**: Access the functionality through a convenient mix task

## Usage

### Using the CLI Tool

The simplest way to use Adaptive Code Evolution is through the `ash_swarm.adaptive.evolve` mix task:

```bash
# Optimize a file using the default model (llama3-8b-8192)
mix ash_swarm.adaptive.evolve lib/my_app/slow_code.ex

# Optimize with a specific model and custom output path
mix ash_swarm.adaptive.evolve --model gpt-4o --output lib/my_app/fast_code.ex lib/my_app/slow_code.ex

# Optimize with focus on maintainability
mix ash_swarm.adaptive.evolve --focus maintainability lib/my_app/complex_code.ex
```

### Using in Your Code

You can also use the Adaptive Code Evolution functionality directly in your code:

```elixir
# Set your API key (typically done in environment variables)
System.put_env("GROQ_API_KEY", "your_groq_api_key")

# Get the original code
original_code = """
defmodule SlowOperations do
  def fibonacci(0), do: 0
  def fibonacci(1), do: 1
  def fibonacci(n) when n > 1 do
    fibonacci(n - 1) + fibonacci(n - 2)
  end
end
"""

# Define usage patterns to guide optimization
usage_pattern = %{
  usage_pattern: "high_volume_computation"
}

# Generate optimized implementation
{:ok, response} = AshSwarm.Foundations.AIAdaptationStrategies.generate_optimized_implementation(
  original_code,
  usage_pattern,
  model: "llama3-8b-8192"
)

# Use the optimized code and documentation
IO.puts("Optimized Code:")
IO.puts(response.optimized_code)

IO.puts("\nDocumentation:")
IO.puts(response.documentation)

# Evaluate the optimization
{:ok, evaluation} = AshSwarm.Foundations.AIExperimentEvaluation.evaluate_code_adaptation(
  original_code,
  response.optimized_code,
  %{},
  model: "llama3-8b-8192"
)

IO.puts("\nSuccess Rating: #{evaluation.evaluation.success_rating}")
```

## Examples

### Basic Example: Fibonacci and Prime Number Optimization

```elixir
AshSwarm.Demo.generate_optimized_code("llama3-8b-8192")
```

This will run a demo that optimizes a slow implementation of Fibonacci and prime number functions using memoization.

### Advanced Example: Complex Operations

See the `AshSwarm.Examples.ComplexOperations` module for more complex optimization examples, including:

- Bubble sort algorithm
- Palindrome checking
- Levenshtein distance calculation
- Sieve of Eratosthenes implementation

## Requirements

- Groq API key (set as `GROQ_API_KEY` environment variable)
- Elixir 1.14 or later

## Notes on Implementation

The current implementation uses memoization as its primary optimization technique. In the AI-generated code, the memoization cache is often recreated on each function call rather than persisting between calls. In a production environment, this would be better implemented using module attributes or an ETS table for persistent caching.

## Future Enhancements

- Implement persistent memoization caching using module attributes or ETS tables
- Add more optimization strategies beyond memoization
- Enhance the documentation extraction for more complex code patterns
- Add support for more AI models and providers
