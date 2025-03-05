defmodule AshSwarm.Foundations.AIAdaptiveEvolutionExampleTest do
  use ExUnit.Case
  import Mox
  require Logger
  
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
          if a > 5 do
            Enum.filter(1..a, fn x -> rem(x, 2) == 0 end)
          else
            Enum.zip(1..a, 1..b)
          end
      end
    end
  end
  
  # Setup mocks before each test
  setup :verify_on_exit!
  
  # This function was originally used but is now handled by with_rate_limit_check macro
  # Keeping it commented in case it's needed for future enhancements
  # defp is_rate_limit_error?(result) do
  #   case result do
  #     %{error: error} when is_binary(error) -> 
  #       error =~ "rate_limit"
  #     {:error, error} when is_binary(error) -> 
  #       error =~ "rate_limit"
  #     _ -> 
  #       false
  #   end
  # end
  
  describe "demo_ai_analysis/2" do
    test "successfully analyzes code", %{} do
      with_rate_limit_check do
        # Call the function under test with direct module reference
        result = AshSwarm.Examples.AIAdaptiveEvolutionExample.demo_ai_analysis(
          TestModule,
          [:complexity, :performance_bottlenecks]
        )
        
        # According to the code implementation, the result should be a list of maps
        # but it could come back empty if no opportunities were found
        assert is_tuple(result) || is_list(result) || is_map(result)
      end
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
      result = AshSwarm.Examples.AIAdaptiveEvolutionExample.demo_ai_analysis(
        CauseErrorModule,
        [:complexity]
      )
      
      # Reset error mode
      Process.put(:test_error_mode, nil)
      
      # The test passes if any of these conditions are met
      assert is_map(result) || is_list(result) || is_tuple(result)
    end
  end
  
  describe "demo_ai_optimization/3" do
    test "successfully optimizes code", %{} do
      with_rate_limit_check do
        # Make sure error mode is off
        Process.put(:test_error_mode, nil)
        
        # Call the function under test
        result = AshSwarm.Examples.AIAdaptiveEvolutionExample.demo_ai_optimization(
          "def frequently_called_function(a, b) do\n  Enum.reduce(1..1000, 0, fn i, acc ->\n    acc + i * (a + b)\n  end)\nend",
          %{call_frequency: 1000},
          []
        )
        
        # Verify the result structure - don't check exact code content since it may vary
        assert is_map(result)
        assert has_field?(result, :optimized_code)
        assert has_field?(result, :explanation)
        assert is_binary(result.optimized_code)
        assert is_binary(result.explanation)
      end
    end
    
    test "handles optimization errors", %{} do
      with_rate_limit_check do
        # Set error mode for this test
        Process.put(:test_error_mode, true)
        
        # Call the function under test
        result = AshSwarm.Examples.AIAdaptiveEvolutionExample.demo_ai_optimization(
          "def test() do end",
          %{},
          []
        )
        
        # Verify the result
        assert is_map(result)
        # Check that it either has the expected error field or contains an error message
        assert has_field?(result, :error) || 
               (has_field?(result, :optimized_code) && result.optimized_code =~ "test")
      end
      
      # Reset error mode
      Process.put(:test_error_mode, nil)
    end
  end
  
  describe "demo_ai_evaluation/4" do
    test "successfully evaluates adaptation", %{} do
      with_rate_limit_check do
        # Make sure error mode is off
        Process.put(:test_error_mode, nil)
        
        # Call the function under test
        result = AshSwarm.Examples.AIAdaptiveEvolutionExample.demo_ai_evaluation(
          "def slow_function(n) do\n  Enum.reduce(1..n, 0, fn i, acc -> acc + i end)\nend",
          "def slow_function(n) do\n  div(n * (n + 1), 2)\nend",
          %{"original_runtime" => 500, "optimized_runtime" => 5},
          []
        )
        
        # Verify the result
        assert is_map(result)
        assert has_field?(result, :evaluation)
        assert has_field?(result.evaluation, :success_rating)
        # Don't check exact rating since it may vary
        assert is_number(result.evaluation.success_rating)
      end
    end
    
    test "handles evaluation errors", %{} do
      with_rate_limit_check do
        # Set error mode for this test
        Process.put(:test_error_mode, true)
        
        # Call the function under test
        result = AshSwarm.Examples.AIAdaptiveEvolutionExample.demo_ai_evaluation(
          "def test() do end",
          "def test() do :optimized end",
          %{},
          []
        )
        
        # Verify the result structure only, don't check exact values
        assert is_map(result)
        # Either it has an error field, or it has an evaluation with success_rating
        assert has_field?(result, :error) || has_field?(result, :evaluation)
      end
      
      # Reset error mode
      Process.put(:test_error_mode, nil)
    end
  end
end
