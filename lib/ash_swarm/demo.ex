defmodule AshSwarm.Demo do
  @moduledoc """
  Demo module showcasing the AI functionality of AshSwarm.
  This module provides example demonstrations of the various AI capabilities.
  """
  require Logger
  alias AshSwarm.Foundations.AIExperimentEvaluation

  @doc """
  Run the Adaptive Code Evolution demo using Groq API.
  Evaluates original and optimized code to demonstrate AI evaluation capabilities.
  """
  @spec run_groq() :: any()
  def run_groq do
    IO.puts("Running Adaptive Code Evolution demo with Groq API...")
    run_demo("llama3-8b-8192")
  end

  @doc """
  Run the Adaptive Code Evolution demo using OpenAI API.
  Evaluates original and optimized code to demonstrate AI evaluation capabilities.
  """
  @spec run_openai() :: any()
  def run_openai do
    IO.puts("Running Adaptive Code Evolution demo with OpenAI API...")
    run_demo("gpt-3.5-turbo")
  end

  @doc """
  Run the demo with a specific model.
  """
  @spec run_demo(String.t()) :: any()
  def run_demo(model) do
    original_code = """
    defmodule MathOperations do
      def factorial(0), do: 1
      def factorial(n) when n > 0 do
        n * factorial(n - 1)
      end
      
      def sum_of_first_n(n) when n > 0 do
        Enum.reduce(1..n, 0, fn x, acc -> x + acc end)
      end
    end
    """

    optimized_code = """
    defmodule MathOperations do
      def factorial(n) when n >= 0, do: do_factorial(n, 1)
      
      defp do_factorial(0, acc), do: acc
      defp do_factorial(n, acc) when n > 0, do: do_factorial(n - 1, n * acc)
      
      def sum_of_first_n(n) when n > 0 do
        # Using the formula n * (n + 1) / 2
        div(n * (n + 1), 2)
      end
    end
    """

    metrics = %{
      performance: "95% faster",
      memory_usage: "80% less memory used",
      test_results: "All tests passing",
      static_analysis: "No warnings or issues detected"
    }

    # Call evaluate_experiment function
    case AIExperimentEvaluation.evaluate_experiment(
           original_code,
           optimized_code,
           metrics,
           model: model
         ) do
      {:ok, result} ->
        IO.puts("\n🟢 Experiment Evaluation Successful!\n")
        IO.puts("Explanation:")
        IO.puts(result.explanation)
        IO.puts("Evaluation:")
        IO.puts("- Success Rating: #{result.evaluation.success_rating}")
        IO.puts("- Recommendation: ** #{result.evaluation.recommendation}")
        IO.puts("\nKey Risks:")
        Enum.each(result.evaluation.risks, fn risk -> IO.puts("  • #{risk}") end)
        IO.puts("\nImprovement Areas:")
        Enum.each(result.evaluation.improvement_areas, fn area -> IO.puts("  • #{area}") end)
        IO.puts("\nDemo completed successfully!")

      {:error, reason} ->
        IO.puts("\n🔴 Experiment Evaluation Failed!")
        IO.puts("[error] #{reason}")
        IO.inspect(reason, label: "Error")
    end
  end

  @doc """
  Demonstrates the generation of optimized code for a slow Fibonacci and prime number implementation.
  Uses AI to generate optimized implementations and evaluates the results.

  Parameters:
  - model - The AI model to use for code generation and evaluation
  """
  @spec generate_optimized_code(String.t()) :: any()
  def generate_optimized_code(model \\ "gpt-4o") do
    IO.puts("Running code optimization with #{model}...")

    # Original slow code
    original_code = """
    defmodule SlowOperations do
      @doc "Calculates fibonacci numbers using naive recursion"
      def fibonacci(0), do: 0
      def fibonacci(1), do: 1
      def fibonacci(n) when n > 1 do
        fibonacci(n - 1) + fibonacci(n - 2)
      end
      
      @doc "Checks if a number is prime using trial division"
      def is_prime?(n) when n <= 1, do: false
      def is_prime?(2), do: true
      def is_prime?(n) do
        Enum.all?(2..(n - 1), fn x -> rem(n, x) != 0 end)
      end
    end
    """

    # Generate optimized implementation
    case AshSwarm.Foundations.AIAdaptationStrategies.generate_optimized_implementation(
           original_code,
           %{usage_pattern: "high_volume_computation"},
           model: model
         ) do
      {:ok, response} ->
        # Output original and optimized code
        IO.puts("\n🟢 Optimization Generation Successful!\n")
        IO.puts("Original Code:")
        IO.puts("```elixir")
        IO.puts(original_code)
        IO.puts("```\n")
        IO.puts("Optimized Code:")
        IO.puts("```elixir")
        IO.puts(response.optimized_code)
        IO.puts("```\n")
        IO.puts("Explanation of Changes:")
        IO.puts(response.explanation)

        # Display generated documentation if available
        if response.documentation != nil && response.documentation != "" do
          IO.puts("\n📚 Generated Documentation:")
          IO.puts(response.documentation)
        end

        # Display expected improvements
        IO.puts("\nExpected Improvements:")

        if response.expected_improvements.performance != nil &&
             response.expected_improvements.performance != "" do
          IO.puts("- Performance: #{response.expected_improvements.performance}")
        end

        if response.expected_improvements.maintainability != nil &&
             response.expected_improvements.maintainability != "" do
          IO.puts("- Maintainability: #{response.expected_improvements.maintainability}")
        end

        if response.expected_improvements.safety != nil &&
             response.expected_improvements.safety != "" do
          IO.puts("- Safety: #{response.expected_improvements.safety}")
        end

        # Evaluate the optimization
        IO.puts("\nEvaluating the generated optimization...\n")

        case AshSwarm.Foundations.AIExperimentEvaluation.evaluate_code_adaptation(
               original_code,
               response.optimized_code,
               %{},
               model: model
             ) do
          {:ok, evaluation} ->
            IO.puts("\n🟢 Optimization Evaluation Successful!\n")
            IO.puts("Evaluation Summary:")

            # Extract success rating
            success_rating =
              if is_map(evaluation) && Map.has_key?(evaluation, :evaluation) &&
                   is_map(evaluation.evaluation) &&
                   Map.has_key?(evaluation.evaluation, :success_rating) do
                evaluation.evaluation.success_rating
              else
                0.0
              end

            IO.puts("- Success Rating: #{success_rating}")

            # Extract recommendation
            recommendation =
              if is_map(evaluation) && Map.has_key?(evaluation, :evaluation) &&
                   is_map(evaluation.evaluation) &&
                   Map.has_key?(evaluation.evaluation, :recommendation) do
                evaluation.evaluation.recommendation
              else
                "No specific recommendation provided"
              end

            IO.puts("- Recommendation: #{recommendation}")

            # Extract key risks
            risks =
              if is_map(evaluation) && Map.has_key?(evaluation, :evaluation) &&
                   is_map(evaluation.evaluation) &&
                   Map.has_key?(evaluation.evaluation, :key_risks) do
                evaluation.evaluation.key_risks
              else
                []
              end

            if is_list(risks) && length(risks) > 0 do
              IO.puts("\nKey Risks:")

              Enum.each(risks, fn risk ->
                IO.puts("  • #{risk}")
              end)
            end

            {:ok, response}

          {:error, reason} ->
            IO.puts("\n🔴 Optimization Evaluation Failed!")
            IO.puts("Reason: #{inspect(reason)}")
            {:error, reason}
        end

      {:error, reason} ->
        IO.puts("\n🔴 Optimization Generation Failed!")
        IO.puts("Reason: #{inspect(reason)}")
        {:error, reason}
    end
  end

  @doc """
  Get available API information to check which APIs can be used.
  This is helpful for understanding which demos can be run.
  """
  @spec api_info() :: map()
  def api_info do
    # Get API keys environment variables
    api_keys = %{
      openai: System.get_env("OPENAI_API_KEY"),
      groq: System.get_env("GROQ_API_KEY"),
      gemini: System.get_env("GEMINI_API_KEY")
    }

    # Map to show availability
    %{
      openai: api_keys.openai != nil,
      groq: api_keys.groq != nil,
      gemini: api_keys.gemini != nil,
      available_apis:
        Enum.filter([:openai, :groq, :gemini], fn api ->
          Map.get(api_keys, api) != nil
        end)
    }
  end
end
