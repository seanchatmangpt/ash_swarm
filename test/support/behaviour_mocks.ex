defmodule AshSwarm.Test.MockAICodeAnalysis.Behaviour do
  @moduledoc """
  Behaviour for mocking AICodeAnalysis.
  """
  
  @callback analyze_code(module(), keyword()) :: {:ok, map()} | {:error, any()}
end

defmodule AshSwarm.Test.MockAIAdaptationStrategies.Behaviour do
  @moduledoc """
  Behaviour for mocking AIAdaptationStrategies.
  """
  
  @callback generate_optimized_implementation(String.t(), map(), keyword()) :: {:ok, map()} | {:error, any()}
end

defmodule AshSwarm.Test.MockAIExperimentEvaluation.Behaviour do
  @moduledoc """
  Behaviour for mocking AIExperimentEvaluation.
  """
  
  @callback evaluate_experiment(String.t(), String.t(), map(), keyword()) :: {:ok, map()} | {:error, any()}
end
