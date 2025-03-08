defmodule AshSwarm.Test.Mocks do
  @moduledoc """
  Defines mocks for external services and modules used in tests.

  This module provides mock implementations to avoid making real API calls during tests.
  """

  # Make sure Mox is required
  require Mox

  # Define behavior modules for our mocks
  defmodule AshSwarm.Test.AICodeAnalysisBehaviour do
    @moduledoc false
    @callback analyze_code(module() | map(), keyword()) :: {:ok, map()} | {:error, any()}
  end

  defmodule AshSwarm.Test.AIAdaptationStrategiesBehaviour do
    @moduledoc false
    @callback generate_optimized_implementation(String.t(), map(), keyword()) ::
                {:ok, map()} | {:error, any()}
    @callback generate_incremental_improvements(String.t(), map(), keyword()) ::
                {:ok, map()} | {:error, any()}
  end

  defmodule AshSwarm.Test.AIExperimentEvaluationBehaviour do
    @moduledoc false
    @callback evaluate_experiment(String.t(), String.t(), map(), keyword()) ::
                {:ok, map()} | {:error, any()}
  end

  # Direct implementations - using the exact module names expected in the code

  defmodule MockInstructorHelper do
    @moduledoc """
    Mock implementation of AshSwarm.InstructorHelper.

    Provides fake responses for gen/4 function to avoid real API calls during tests.
    """
    require Logger

    @doc """
    Mock implementation of gen/4 that returns predefined responses based on input.

    ## Parameters

    * `response_model` - The model/struct to cast the response into
    * `sys_msg` - The system message for the AI
    * `user_msg` - The user message/prompt
    * `model` - Optional model to use

    ## Returns

    * `{:ok, result}` - A mock result based on the response_model
    """
    @spec gen(map() | struct(), String.t(), String.t(), String.t() | nil) ::
            {:ok, any()} | {:error, any()}
    def gen(response_model, _sys_msg, _user_msg, _model \\ nil) do
      Logger.debug("MOCK: Using MockInstructorHelper.gen instead of real API call")
      Logger.debug("MOCK: Using response_model: #{inspect(response_model)}")

      # Generate a mock response based on the response_model type
      mock_response = generate_mock_response(response_model)
      {:ok, mock_response}
    end

    # Helper to generate appropriate mock responses based on the response model type
    defp generate_mock_response(response_model) do
      # Use fully qualified paths to the structs
      _evaluation_response_module = AshSwarm.Foundations.AIExperimentEvaluation.EvaluationResponse
      _evaluation_module = AshSwarm.Foundations.AIExperimentEvaluation.Evaluation
      _analysis_response_module = AshSwarm.Foundations.AICodeAnalysis.AnalysisResponse

      cond do
        # Check if it's an EvaluationResponse by module name (avoid using match?)
        is_struct(response_model) &&
            to_string(response_model.__struct__) =~ "EvaluationResponse" ->
          %{
            explanation: "This is a mock explanation for evaluation",
            evaluation: %{
              success_rating: 0.85,
              recommendation: "apply",
              risks: ["Mock risk 1", "Mock risk 2"],
              improvement_areas: ["Mock improvement area 1", "Mock improvement area 2"]
            }
          }

        # Handle optimization result (a map with specific keys)
        is_map(response_model) && Map.has_key?(response_model, :optimized_code) ->
          %{
            optimized_code: """
            defmodule Optimized do
              def optimized_function(a, b) do
                # This is a mock optimized implementation
                a * b * 2
              end
            end
            """,
            explanation: "This is a mock explanation for optimized code"
          }

        # Handle analysis response
        (is_struct(response_model) &&
           to_string(response_model.__struct__) =~ "AnalysisResponse") ||
            (is_map(response_model) && Map.has_key?(response_model, :opportunities)) ->
          %{
            opportunities: [
              %{
                description: "Mock optimization opportunity",
                type: "performance",
                location: "some_function/2",
                severity: "medium",
                rationale: "This is a mock rationale",
                suggested_change: "# Mock suggested change",
                timestamp: DateTime.utc_now(),
                id: "mock-id-123"
              }
            ],
            summary: "Mock analysis summary"
          }

        # Default response for any other type
        true ->
          Logger.warning("MOCK: Unknown response model type: #{inspect(response_model)}")

          %{
            result: "Mock response",
            details: "Generated mock response for unknown model type"
          }
      end
    end
  end
end

# Define the EXACT module names that the application is expecting
defmodule AshSwarm.MockAICodeAnalysis do
  @moduledoc """
  Mock implementation for AICodeAnalysis.
  """

  def analyze_code(_module, _options) do
    {:ok,
     %{
       opportunities: [
         %{
           description: "Replace recursive function with memoized version",
           type: "performance",
           location: "fibonacci/1",
           severity: "medium",
           rationale: "Recursive implementation causes redundant calculations",
           suggested_change: "Use memoization to store previously calculated values"
         },
         %{
           description: "Simplify nested conditionals",
           type: "readability",
           location: "complex_function/2",
           severity: "high",
           rationale: "Nested conditionals make code hard to follow",
           suggested_change: "Extract each case into a separate helper function"
         }
       ],
       summary: "Code contains optimization opportunities in complexity and performance"
     }}
  end
end

defmodule AshSwarm.MockAIAdaptationStrategies do
  @moduledoc """
  Mock implementation for AIAdaptationStrategies.
  """

  def generate_optimized_implementation(_code, _usage_data, _options) do
    {:ok,
     %{
       optimized_code: """
       defmodule OptimizedModule do
         def optimized_function(a, b) do
           # Pre-calculate the sum once, then multiply by 1000
           (a + b) * 1000
         end
       end
       """,
       explanation: "Optimized by using mathematical identity instead of iteration"
     }}
  end

  def generate_incremental_improvements(_code, _usage_data, _options) do
    {:ok,
     %{
       optimized_code: """
       defmodule ImprovedModule do
         def improved_function(a, b) do
           # Added caching for better performance
           result = (a + b) * 1000
           result
         end
       end
       """,
       explanation: "Made incremental improvements for readability and performance"
     }}
  end
end

defmodule AshSwarm.MockAIExperimentEvaluation do
  @moduledoc """
  Mock implementation for AIExperimentEvaluation.
  """

  def evaluate_experiment(_original_code, _adapted_code, _metrics, _options) do
    {:ok,
     %{
       evaluation: %{
         success_rating: 0.85,
         recommendation: "apply",
         risks: ["Might behave differently for very large numbers"],
         improvement_areas: ["Add documentation explaining the optimization"]
       },
       explanation: "The optimization provides significant performance improvements"
     }}
  end
end

# Default implementation for testing
defmodule AshSwarm.Test.MockImplementations do
  @moduledoc """
  Default implementations for the mock modules.
  Use these in tests to provide standard behavior.
  """

  # Set up config to use mocks
  def setup_direct_mocks do
    Application.put_env(:ash_swarm, :ai_code_analysis_module, AshSwarm.MockAICodeAnalysis)

    Application.put_env(
      :ash_swarm,
      :ai_adaptation_strategies_module,
      AshSwarm.MockAIAdaptationStrategies
    )

    Application.put_env(
      :ash_swarm,
      :ai_experiment_evaluation_module,
      AshSwarm.MockAIExperimentEvaluation
    )
  end

  # Setup all mocks
  def setup_all_mocks do
    # Direct mocks are more reliable
    setup_direct_mocks()
  end
end
