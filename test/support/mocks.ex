defmodule AshSwarm.Test.Mocks do
  @moduledoc """
  Defines mocks for AI-powered modules used in testing.
  """
  
  # Import the behaviour modules
  require AshSwarm.Test.MockAICodeAnalysis.Behaviour
  require AshSwarm.Test.MockAIAdaptationStrategies.Behaviour
  require AshSwarm.Test.MockAIExperimentEvaluation.Behaviour
  
  # Make sure Mox is required
  require Mox
  
  # Define mocks for the AI modules
  Mox.defmock(AshSwarm.MockAICodeAnalysis, for: AshSwarm.Test.MockAICodeAnalysis.Behaviour)
  Mox.defmock(AshSwarm.MockAIAdaptationStrategies, for: AshSwarm.Test.MockAIAdaptationStrategies.Behaviour)
  Mox.defmock(AshSwarm.MockAIExperimentEvaluation, for: AshSwarm.Test.MockAIExperimentEvaluation.Behaviour)
end

# Default implementation for testing
defmodule AshSwarm.Test.MockImplementations do
  @moduledoc """
  Default implementations for the mock modules.
  Use these in tests to provide standard behavior.
  """
  
  # Default implementation for MockAICodeAnalysis
  def setup_mock_code_analysis do
    Mox.stub(AshSwarm.MockAICodeAnalysis, :analyze_code, fn _module, _options ->
      {:ok, %{
        optimization_opportunities: [
          %{
            description: "Replace Enum.reduce with mathematical formula",
            suggested_implementation: "def optimized_function(a, b), do: a * b * 500500", 
            impact: "High",
            type: "Performance"
          }
        ]
      }}
    end)
  end
  
  # Default implementation for MockAIAdaptationStrategies
  def setup_mock_adaptation_strategies do
    Mox.stub(AshSwarm.MockAIAdaptationStrategies, :generate_optimized_implementation, fn _code, _usage_data, _options ->
      {:ok, %{
        optimized_code: "def optimized_function(a, b), do: a * b * 500500",
        explanation: "Used mathematical identity for sum(1..1000) = 500500",
        expected_improvements: %{
          performance: "Constant time instead of linear time",
          maintainability: "Simpler code is easier to maintain",
          safety: "No iteration, fewer potential issues"
        }
      }}
    end)
  end
  
  # Default implementation for MockAIExperimentEvaluation
  def setup_mock_experiment_evaluation do
    Mox.stub(AshSwarm.MockAIExperimentEvaluation, :evaluate_experiment, fn _original_code, _adapted_code, _metrics, _options ->
      {:ok, %{
        evaluation: %{
          success_rating: 0.85,
          recommendation: "Accept the adaptation",
          risks: ["Might behave differently for very large numbers"],
          improvement_areas: []
        },
        explanation: "The optimization provides significant performance improvements"
      }}
    end)
  end
  
  # Setup all mocks at once
  def setup_all_mocks do
    setup_mock_code_analysis()
    setup_mock_adaptation_strategies()
    setup_mock_experiment_evaluation()
  end
end
