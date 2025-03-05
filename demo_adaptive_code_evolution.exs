# demo_adaptive_code_evolution.exs
# A demo script showcasing the AI-powered Adaptive Code Evolution pattern in action with real AI calls
#
# Set environment variables:
# export OPENAI_API_KEY=your_openai_api_key_here
# export GROQ_API_KEY=your_groq_api_key_here
#
# To run this script:
#   mix run demo_adaptive_code_evolution.exs

defmodule SimplifiedAICodeAnalysis do
  @doc """
  Analyzes source code and returns optimization opportunities.
  This is a simplified version for the demo.
  """
  def analyze_source_code(_source_code, _module_name) do
    IO.puts("[Using SimplifiedAICodeAnalysis to analyze code]")
    
    # Simulated but structured like the real implementation would be
    {:ok, [
      %{
        description: "Replace Enum.reduce with comprehension for better readability",
        type: "readability",
        location: "calculate_total/1",
        severity: "medium",
        rationale: "List comprehensions are more readable for simple aggregations.",
        suggested_change: "total = Enum.sum(for item <- items, do: item.price * item.quantity)"
      },
      %{
        description: "Add caching for calculate_total with frequently used item lists",
        type: "performance",
        location: "calculate_total/1",
        severity: "high",
        rationale: "Function is called frequently with similar inputs.",
        suggested_change: "Use memoization or a simple cache mechanism"
      },
      %{
        description: "Optimize process_order by combining calculation and discount in one pass",
        type: "performance",
        location: "process_order/2",
        severity: "medium",
        rationale: "Avoids creating an intermediate value when discount is applied.",
        suggested_change: "Single-pass implementation for process_order"
      }
    ]}
  end
end

defmodule SimplifiedAIAdaptationStrategies do
  @doc """
  Generates optimized implementation based on usage patterns.
  This is a simplified version for the demo.
  """
  def generate_optimized_implementation(_code, _usage_data, _options \\ []) do
    IO.puts("[Using SimplifiedAIAdaptationStrategies to generate optimized code]")
    
    optimized_code = """
    defmodule SampleModule do
      # Cache for calculate_total results
      @cache_enabled true
      
      def calculate_total(items) do
        # Using caching based on usage patterns
        if @cache_enabled and cache_hit?(items) do
          get_from_cache(items)
        else
          total = Enum.sum(for item <- items, do: item.price * item.quantity)
          if @cache_enabled, do: store_in_cache(items, total)
          total
        end
      end
      
      def apply_discount(total, discount_rate) do
        # Fast path for common discount rates
        case discount_rate do
          0.1 -> total * 0.9  # Most common case
          0.05 -> total * 0.95
          0.2 -> total * 0.8
          _ -> total * (1 - discount_rate)
        end
      end
      
      def process_order(items, discount \\\\ 0) do
        # Short-circuit for no discount
        if discount == 0 do
          calculate_total(items)
        else
          calculate_total(items) |> apply_discount(discount)
        end
      end
      
      # Cache helper functions
      defp cache_hit?(items), do: false  # Simplified implementation
      defp get_from_cache(items), do: 0  # Simplified implementation
      defp store_in_cache(items, total), do: :ok  # Simplified implementation
    end
    """
    
    explanation = """
    Based on the usage patterns showing frequent calls with similar item lists, I've added 
    caching to calculate_total. I've also optimized apply_discount with fast paths for the 
    most common discount rates, and added a short-circuit for process_order when no discount 
    is applied. The calculate_total function now uses a list comprehension with Enum.sum 
    for better readability and performance.
    """
    
    {:ok, %{
      optimized_code: optimized_code,
      explanation: explanation,
      expected_improvements: %{
        performance: "30-40% faster for repeated calculations",
        maintainability: "Improved with clearer patterns",
        safety: "Equivalent to original"
      }
    }}
  end
end

defmodule SimplifiedAIExperimentEvaluation do
  @doc """
  Evaluates an optimization experiment.
  This is a simplified version for the demo.
  """
  def evaluate_experiment(_original_code, _optimized_code, _metrics, _options \\ []) do
    IO.puts("[Using SimplifiedAIExperimentEvaluation to evaluate optimization]")
    
    {:ok, %{
      evaluation: %{
        success_rating: 0.85,
        recommendation: "Apply the optimization",
        risks: [
          "Added complexity with caching could introduce bugs if not properly tested",
          "Cache invalidation might be necessary in larger applications"
        ],
        improvement_areas: [
          "Consider adding cache size limits to prevent memory issues",
          "Add telemetry to monitor cache hit rates"
        ]
      },
      explanation: "The optimization offers significant performance improvements based on the usage patterns, with minimal risks that can be mitigated with proper testing."
    }}
  end
end

defmodule AdaptiveCodeDemo do
  # Import Logger for error logging
  require Logger
  
  # Try to use the real modules, but fall back to simplified ones if needed
  def run do
    IO.puts("\n===== AI-Powered Adaptive Code Evolution Demo =====\n")
    IO.puts("Note: This demo will attempt to use the real AI implementation modules")
    IO.puts("but will fall back to simplified versions if there are any errors.\n")
    
    # Define a simple module to analyze
    sample_module = """
    defmodule SampleModule do
      def calculate_total(items) do
        Enum.reduce(items, 0, fn item, acc -> 
          acc + item.price * item.quantity
        end)
      end
      
      def apply_discount(total, discount_rate) do
        total * (1 - discount_rate)
      end
      
      def process_order(items, discount \\\\ 0) do
        items
        |> calculate_total()
        |> apply_discount(discount)
      end
    end
    """
    
    # Step 1: Analyze code using AI
    IO.puts("Step 1: Analyzing code for optimization opportunities...\n")
    
    analysis_result = try do
      # First try to use the real implementation
      case AshSwarm.Foundations.AICodeAnalysis.analyze_source_code(sample_module, "SampleModule") do
        {:ok, result} -> 
          IO.puts("[Using real AICodeAnalysis module]")
          result
        {:error, reason} ->
          IO.puts("[Real AICodeAnalysis failed: #{inspect(reason)}]")
          {:error, reason}
      end
    rescue
      e -> 
        IO.puts("[Error using real AICodeAnalysis: #{inspect(e)}]")
        {:error, e}
    end
    
    # Fall back to simplified implementation if the real one failed
    analysis_result = case analysis_result do
      {:error, _} -> 
        {:ok, opportunities} = SimplifiedAICodeAnalysis.analyze_source_code(sample_module, "SampleModule")
        opportunities
      result when is_list(result) -> 
        result
      _ -> 
        {:ok, opportunities} = SimplifiedAICodeAnalysis.analyze_source_code(sample_module, "SampleModule")
        opportunities
    end
    
    Enum.each(analysis_result, fn suggestion ->
      IO.puts(" - #{suggestion.description}")
      IO.puts("   Type: #{suggestion.type}")
      IO.puts("   Location: #{suggestion.location}")
      IO.puts("   Severity: #{suggestion.severity}")
      if Map.has_key?(suggestion, :rationale) do
        IO.puts("   Rationale: #{suggestion.rationale}")
      end
      IO.puts("")
    end)
    
    # Step 2: Generate optimized implementation
    IO.puts("\nStep 2: Generating optimized implementation...\n")
    
    usage_data = %{
      call_frequencies: %{
        "process_order/2" => 1000,
        "calculate_total/1" => 1200,
        "apply_discount/2" => 1050
      },
      typical_args: %{
        "calculate_total/1" => %{
          "items" => "lists with 5-10 elements on average"
        },
        "apply_discount/2" => %{
          "discount_rate" => "typically between 0.05 and 0.2"
        }
      },
      patterns: [
        "usually processes orders with small item counts",
        "discount is rarely zero"
      ]
    }
    
    # Determine which model to use based on available API keys
    model = if System.get_env("OPENAI_API_KEY") do
      "gpt-3.5-turbo"
    else 
      "llama3-8b-8192"
    end
    
    optimization_result = try do
      # First try to use the real implementation
      case AshSwarm.Foundations.AIAdaptationStrategies.generate_optimized_implementation(
        sample_module, 
        usage_data, 
        [optimization_focus: :balanced, model: model]
      ) do
        {:ok, result} -> 
          IO.puts("[Using real AIAdaptationStrategies module]")
          result
        {:error, reason} ->
          IO.puts("[Error using real AIAdaptationStrategies: #{inspect(reason, pretty: true, limit: :infinity)}]")
          IO.puts("[Using SimplifiedAIAdaptationStrategies to generate optimized code]")
          {:error, reason}
      end
    rescue
      e -> 
        IO.puts("[Error using real AIAdaptationStrategies: #{inspect(e, pretty: true, limit: :infinity)}]")
        IO.puts("[Using SimplifiedAIAdaptationStrategies to generate optimized code]")
        {:error, e}
    end
    
    # Fall back to simplified implementation if the real one failed
    optimization_result = case optimization_result do
      {:error, _} -> 
        {:ok, result} = SimplifiedAIAdaptationStrategies.generate_optimized_implementation(
          sample_module, usage_data, [optimization_focus: :balanced]
        )
        result
      result when is_map(result) -> 
        # Ensure it has the expected keys
        if Map.has_key?(result, :optimized_code) do
          result
        else
          {:ok, result} = SimplifiedAIAdaptationStrategies.generate_optimized_implementation(
            sample_module, usage_data, [optimization_focus: :balanced]
          )
          result
        end
      _ -> 
        {:ok, result} = SimplifiedAIAdaptationStrategies.generate_optimized_implementation(
          sample_module, usage_data, [optimization_focus: :balanced]
        )
        result
    end
    
    IO.puts("Original code:")
    IO.puts("```elixir")
    IO.puts(sample_module)
    IO.puts("```\n")
    
    IO.puts("Optimized code:")
    IO.puts("```elixir")
    IO.puts(optimization_result.optimized_code)
    IO.puts("```\n")
    
    IO.puts("Optimization explanation:")
    IO.puts(optimization_result.explanation)
    IO.puts("")
    
    if Map.has_key?(optimization_result, :expected_improvements) do
      improvements = optimization_result.expected_improvements
      
      IO.puts("Expected improvements:")
      case improvements do
        # Handle the case when expected_improvements is a struct
        %{__struct__: _} = improvements_struct ->
          # Access fields using dot notation for struct
          IO.puts(" - Performance: #{Map.get(improvements_struct, :performance)}")
          IO.puts(" - Maintainability: #{Map.get(improvements_struct, :maintainability)}")
          IO.puts(" - Safety: #{Map.get(improvements_struct, :safety)}")
          
        # Handle the case when expected_improvements is a regular map
        _ when is_map(improvements) ->
          IO.puts(" - Performance: #{improvements.performance}")
          IO.puts(" - Maintainability: #{improvements.maintainability}")
          IO.puts(" - Safety: #{improvements.safety}")
          
        # Handle unexpected format
        _ ->
          IO.puts(" - Improvements information not available in expected format")
      end
      IO.puts("")
    end
    
    # Step 3: Evaluate the optimization
    IO.puts("\nStep 3: Evaluating the optimization...\n")
    
    # Re-determine which model to use based on available API keys
    model = if System.get_env("OPENAI_API_KEY") do
      "gpt-3.5-turbo"
    else 
      "llama3-8b-8192"
    end
    
    metrics = %{
      performance_improvement: "35% faster in benchmarks",
      memory_usage: "10% higher",
      test_results: "All tests passing",
      static_analysis: "No new warnings"
    }
    
    evaluation_result = try do
      # First, try to use the real AI implementation
      case AshSwarm.Foundations.AIExperimentEvaluation.evaluate_experiment(
        sample_module,
        optimization_result.optimized_code,
        metrics,
        [evaluation_focus: :balanced, model: model]
      ) do
        {:ok, result} -> 
          IO.puts("[Using real AIExperimentEvaluation module]")
          result
        {:error, reason} ->
          Logger.error("Failed to evaluate experiment: #{inspect(reason, pretty: true, limit: :infinity)}")
          IO.puts("[Real AIExperimentEvaluation failed: #{inspect(reason, pretty: true, limit: :infinity)}]")
          IO.puts("[Using SimplifiedAIExperimentEvaluation to evaluate optimization]")
          {:error, reason}
      end
    rescue
      e -> 
        Logger.error("Failed to evaluate experiment: #{inspect(e, pretty: true, limit: :infinity)}")
        IO.puts("[Real AIExperimentEvaluation failed: #{inspect(e, pretty: true, limit: :infinity)}]")
        IO.puts("[Using SimplifiedAIExperimentEvaluation to evaluate optimization]")
        {:error, e}
    end
    
    # Fall back to simplified implementation if the real one failed
    evaluation_result = case evaluation_result do
      {:error, _} -> 
        {:ok, result} = SimplifiedAIExperimentEvaluation.evaluate_experiment(
          sample_module, optimization_result.optimized_code, metrics, [success_threshold: 0.7]
        )
        result
      result when is_map(result) -> 
        # Ensure it has the expected keys
        if Map.has_key?(result, :evaluation) do
          result
        else
          {:ok, result} = SimplifiedAIExperimentEvaluation.evaluate_experiment(
            sample_module, optimization_result.optimized_code, metrics, [success_threshold: 0.7]
          )
          result
        end
      _ -> 
        {:ok, result} = SimplifiedAIExperimentEvaluation.evaluate_experiment(
          sample_module, optimization_result.optimized_code, metrics, [success_threshold: 0.7]
        )
        result
    end
    
    IO.puts("Evaluation results:")
    
    # Extract evaluation data, handling both struct and map cases
    evaluation_data = case evaluation_result do
      %{evaluation: %{__struct__: _} = eval_struct} ->
        %{
          success_rating: Map.get(eval_struct, :success_rating),
          recommendation: Map.get(eval_struct, :recommendation),
          risks: Map.get(eval_struct, :risks),
          improvement_areas: Map.get(eval_struct, :improvement_areas)
        }
        
      %{evaluation: eval_map} when is_map(eval_map) ->
        eval_map
        
      _ ->
        %{
          success_rating: 0.0,
          recommendation: "Unable to evaluate",
          risks: ["No data available"],
          improvement_areas: ["No data available"]
        }
    end
    
    IO.puts(" - Success rating: #{evaluation_data.success_rating}")
    IO.puts(" - Recommendation: #{evaluation_data.recommendation}")
    
    IO.puts("\nRisks:")
    case evaluation_data.risks do
      risks when is_list(risks) ->
        Enum.each(risks, fn risk ->
          IO.puts(" - #{risk}")
        end)
      _ ->
        IO.puts(" - No risk data available")
    end
    
    IO.puts("\nImprovement areas:")
    case evaluation_data.improvement_areas do
      areas when is_list(areas) ->
        Enum.each(areas, fn area ->
          IO.puts(" - #{area}")
        end)
      _ ->
        IO.puts(" - No improvement data available")
    end
    
    if Map.has_key?(evaluation_result, :explanation) do
      IO.puts("\nExplanation:")
      IO.puts(evaluation_result.explanation)
    end
    
    IO.puts("\n===== Demo Complete =====\n")
    IO.puts("Note about the AI implementation:")
    IO.puts("The actual implementation in the AshSwarm.Foundations modules uses real API calls")
    IO.puts("to language models via the InstructorHelper when properly configured with API keys.")
    IO.puts("Ensure GROQ_API_KEY or OPENAI_API_KEY environment variables are set to use the real implementation.")
  end
end

# Run the demo
AdaptiveCodeDemo.run()