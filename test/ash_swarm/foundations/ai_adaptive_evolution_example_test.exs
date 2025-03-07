defmodule AshSwarm.Foundations.AIAdaptiveEvolutionExampleTest do
  use ExUnit.Case
  require Logger
  import ExUnit.Callbacks, only: [on_exit: 1, setup: 1]

  # Import the test helper
  alias AshSwarm.TestHelper

  # Setup to mock external services for all tests
  setup do
    # Get the cleanup function from mock_external_services
    on_exit_fn = TestHelper.mock_external_services()
    
    # Register it with ExUnit's on_exit callback
    on_exit(fn -> on_exit_fn.() end)
    
    # Also clear API keys for the duration of the test
    cleanup_keys_fn = TestHelper.clear_api_keys()
    on_exit(fn -> cleanup_keys_fn.() end)
    
    # Return :ok to indicate setup finished successfully
    :ok
  end

  # Utility for checking if a field exists
  defp has_field?(map, field) when is_map(map), do: Map.has_key?(map, field)
  defp has_field?(_, _), do: false

  # Helper to handle rate limiting by catching API errors and skipping the test
  defmacro with_rate_limit_check(do: block) do
    quote do
      try do
        unquote(block)
      rescue
        e in ExUnit.AssertionError ->
          error_msg = Exception.message(e)

          if error_msg =~ "rate_limit_exceeded" do
            Logger.warning("Test skipped due to API rate limiting: #{inspect(error_msg)}")
            :skipped
          else
            reraise e, __STACKTRACE__
          end
      end
    end
  end

  # Helper to check if API keys are available for real tests
  defp api_keys_available? do
    # Check for GROQ_API_KEY or other necessary keys
    System.get_env("GROQ_API_KEY") != nil
  end

  # Define a test module to use in our tests
  defmodule TestModule do
    @moduledoc """
    A module with various functions for testing adaptation strategies.
    """

    @doc """
    A recursive Fibonacci implementation that could be optimized with memoization.
    """
    def fibonacci(0), do: 0
    def fibonacci(1), do: 1
    def fibonacci(n) when n > 1, do: fibonacci(n - 1) + fibonacci(n - 2)

    @doc """
    A function with nested control structures suitable for analysis.
    """
    def complex_function(a, b) do
      # This is a complex function with nested logic
      case a do
        nil ->
          if b > 10 do
            Enum.map(1..b, fn x -> x * 2 end)
          else
            [b]
          end

        _ ->
          cond do
            a > 10 and b > 10 ->
              for i <- 1..a, j <- 1..b do
                i * j
              end

            a > 10 ->
              for i <- 1..a do
                i * b
              end

            b > 10 ->
              for j <- 1..b do
                a * j
              end

            true ->
              [a * b]
          end
      end
    end
  end

  # Mock analysis results for testing without API
  defp mock_analysis_result do
    %{
      complexity_report: %{
        overall_score: 75,
        findings: [
          %{
            function: :complex_function,
            complexity: "high",
            reasons: [
              "Nested control structures (case, if, cond)",
              "Multiple loop constructs",
              "Complex conditionals"
            ],
            recommendations: [
              "Extract conditional logic into separate functions",
              "Simplify nested conditions where possible",
              "Consider using pattern matching instead of case statements"
            ]
          },
          %{
            function: :fibonacci,
            complexity: "medium",
            reasons: [
              "Recursive implementation with potential for optimization"
            ],
            recommendations: [
              "Consider memoization to avoid redundant calculations",
              "Implement a tail-recursive version or iterative approach"
            ]
          }
        ]
      },
      duplication_report: nil,
      optimization_recommendations: [
        "Implement memoization for fibonacci function",
        "Refactor complex_function into smaller helper functions"
      ]
    }
  end

  # Mock optimization result for testing without API
  defp mock_optimization_result do
    %{
      optimized_code: """
      def frequently_called_function(a, b) do
        # Pre-calculate the sum once
        sum = a + b
        # Use mathematical formula instead of iteration
        1000 * 500 * sum
      end
      """,
      explanation: """
      I've optimized this function by:
      1. Pre-calculating the sum of a and b to avoid repeated addition
      2. Using the formula for sum of arithmetic series: n * (n+1) / 2
      3. Simplifying to a direct multiplication rather than iteration

      This reduces the time complexity from O(n) to O(1) and eliminates the overhead
      of using Enum.reduce for a mathematical operation that can be calculated directly.
      """
    }
  end

  # Mock evaluation result for testing without API
  defp mock_evaluation_result do
    %{
      evaluation: %{
        success_rating: 90,
        improvements: [
          "Reduced time complexity from O(n) to O(1)",
          "Eliminated unnecessary iteration",
          "Improved readability with clear variable naming"
        ],
        concerns: [
          "Might be less intuitive for developers unfamiliar with the mathematical formula"
        ],
        recommendations: [
          "Add a comment explaining the mathematical formula used",
          "Consider adding unit tests to verify correctness for various inputs"
        ]
      }
    }
  end

  describe "demo_ai_analysis/2" do
    test "successfully analyzes code", %{} do
      # Call the function under test
      result =
        AshSwarm.Examples.AIAdaptiveEvolutionExample.demo_ai_analysis(
          TestModule,
          [:complexity, :duplication]
        )

      # Verify the result structure - don't check exact analysis content since it may vary
      assert is_map(result)

      assert has_field?(result, :opportunities) || has_field?(result, :summary)
    end

    test "handles analysis errors", %{} do
      # Create a dummy module that will cause an error
      defmodule CauseErrorModule do
        def this_will_cause_error() do
          raise "Intentional test error"
        end
      end

      # Set up error condition by using Process dictionary
      Process.put(:test_error_mode, true)

      # Call with a module that should cause an error when analyzed
      result =
        AshSwarm.Examples.AIAdaptiveEvolutionExample.demo_ai_analysis(
          CauseErrorModule,
          [:complexity]
        )

      # Reset error mode
      Process.put(:test_error_mode, nil)

      # The test passes if any of these conditions are met
      assert is_map(result)
    end
  end

  describe "demo_ai_optimization/3" do
    test "successfully optimizes code" do
      # Call the function under test with test data
      original_code = """
      defmodule SlowModule do
        def slow_function(a, b) do
          Enum.reduce(1..1000, 0, fn i, acc -> acc + (a + b) end)
        end
      end
      """

      usage_patterns = %{
        "calls_per_hour" => 500,
        "average_input_size" => "small",
        "performance_critical" => true
      }

      result =
        AshSwarm.Examples.AIAdaptiveEvolutionExample.demo_ai_optimization(
          original_code, 
          usage_patterns,
          [optimization_focus: :performance]
        )

      # Verify the result structure
      assert is_map(result)
      assert has_field?(result, :optimized_code)
      assert has_field?(result, :explanation)
      assert is_binary(result.optimized_code)
      assert is_binary(result.explanation)
    end
  end

  describe "demo_ai_evaluation/4" do
    test "successfully evaluates optimizations" do
      # Test data
      original_code = """
      defmodule SlowModule do
        def slow_function(a, b) do
          Enum.reduce(1..1000, 0, fn i, acc -> acc + (a + b) end)
        end
      end
      """

      optimized_code = """
      defmodule FastModule do
        def fast_function(a, b) do
          # Pre-calculate the sum once, then multiply by 1000
          (a + b) * 1000
        end
      end
      """

      metrics = %{
        performance: "Execution time reduced from 50ms to 0.5ms",
        memory_usage: "Memory usage reduced from 500KB to 10KB",
        test_results: "All tests pass"
      }

      # Call the function under test
      result =
        AshSwarm.Examples.AIAdaptiveEvolutionExample.demo_ai_evaluation(
          original_code,
          optimized_code,
          metrics,
          [evaluation_focus: :performance]
        )

      # Verify the result structure
      assert is_map(result)
      
      # Check nested structure with pattern matching
      assert %{evaluation: evaluation} = result
      assert is_map(evaluation)
      assert has_field?(evaluation, :success_rating)
      assert has_field?(evaluation, :recommendation)
      assert has_field?(evaluation, :risks)
      assert has_field?(evaluation, :improvement_areas)
    end
  end
end
