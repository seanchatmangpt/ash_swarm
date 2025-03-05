defmodule AshSwarm.Foundations.AIExperimentEvaluation do
  @moduledoc """
  Uses language models to evaluate the outcomes of code adaptation experiments.
  
  This module provides capabilities to analyze original code, adapted code, and
  performance metrics to determine the success and impact of code adaptations.
  """
  
  alias AshSwarm.InstructorHelper
  alias AshSwarm.Foundations.AIExperimentEvaluation.{EvaluationResponse, Evaluation, AnalysisResponse, Analysis, RankingResponse, RankingItem}
  require Logger
  
  # Define response models using Ecto schemas
  defmodule Evaluation do
    @moduledoc """
    Schema representing an evaluation of code optimization.
    """
    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset

    @primary_key false
    embedded_schema do
      field :success_rating, :float, default: 0.0
      field :recommendation, :string, default: ""
      field :risks, {:array, :string}, default: []
      field :improvement_areas, {:array, :string}, default: []
    end
    
    @type t :: %__MODULE__{
      success_rating: float(),
      recommendation: String.t(),
      risks: [String.t()],
      improvement_areas: [String.t()]
    }
    
    def changeset(evaluation, attrs) do
      evaluation
      |> cast(attrs, [:success_rating, :recommendation, :risks, :improvement_areas])
      |> validate_required([:success_rating, :recommendation])
    end
    
    @doc """
    Converts the schema to a JSON schema for Instructor integration.
    """
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "success_rating" => %{
            "type" => "number",
            "description" => "Rating from 0.0 to 1.0 of how successful the optimization is",
            "minimum" => 0.0,
            "maximum" => 1.0
          },
          "recommendation" => %{
            "type" => "string",
            "description" => "Clear recommendation on whether to apply the optimization",
            "enum" => ["apply", "reject", "further testing"]
          },
          "risks" => %{
            "type" => "array",
            "items" => %{
              "type" => "string"
            },
            "description" => "Potential risks or drawbacks of the optimization"
          },
          "improvement_areas" => %{
            "type" => "array",
            "items" => %{
              "type" => "string"
            },
            "description" => "Areas where the optimization could be further improved"
          }
        },
        "required" => ["success_rating", "recommendation"],
        "additionalProperties" => false
      }
    end
  end
  
  defmodule EvaluationResponse do
    @moduledoc """
    Schema representing the full response from experiment evaluation.
    """

    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset

    alias AshSwarm.Foundations.AIExperimentEvaluation.Evaluation

    @primary_key false
    embedded_schema do
      embeds_one :evaluation, Evaluation, on_replace: :update
      field :explanation, :string, default: ""
    end
    
    @type t :: %__MODULE__{
      evaluation: Evaluation.t(),
      explanation: String.t()
    }
    
    def changeset(response, attrs) do
      response
      |> cast(attrs, [:explanation])
      |> validate_required([:explanation])
      |> cast_embed(:evaluation, required: true)
    end
    
    @doc """
    Converts the schema to a JSON schema for Instructor integration.
    """
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "evaluation" => Evaluation.to_json_schema(),
          "explanation" => %{
            "type" => "string",
            "description" => "A detailed explanation of the evaluation result"
          }
        },
        "required" => ["evaluation", "explanation"],
        "additionalProperties" => false
      }
    end

    # Initialize with default values to avoid nil
    def __struct__ do
      %__MODULE__{
        evaluation: %Evaluation{
          success_rating: 0.0,
          recommendation: "",
          risks: [],
          improvement_areas: []
        },
        explanation: ""
      }
    end
  end
  
  defmodule Analysis do
    @moduledoc """
    Schema representing the analysis of code differences.
    """

    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset
    import Ecto.Changeset

    @primary_key false
    embedded_schema do
      field :architectural_changes, :string
      field :algorithm_improvements, :string
      field :readability_impact, :string
      field :maintainability_impact, :string
      field :potential_issues, {:array, :string}
    end

    @doc """
    Creates a changeset for validating analysis data.
    """
    def changeset(analysis, attrs) do
      analysis
      |> cast(attrs, [:architectural_changes, :algorithm_improvements, :readability_impact, 
                     :maintainability_impact, :potential_issues])
      |> validate_required([:architectural_changes, :algorithm_improvements, 
                           :readability_impact, :maintainability_impact])
    end
    
    @doc """
    Converts the schema to a JSON schema for Instructor integration.
    """
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "architectural_changes" => %{
            "type" => "string",
            "description" => "Description of architectural changes between code versions"
          },
          "algorithm_improvements" => %{
            "type" => "string",
            "description" => "Analysis of algorithm improvements or regressions"
          },
          "readability_impact" => %{
            "type" => "string",
            "description" => "Impact on code readability"
          },
          "maintainability_impact" => %{
            "type" => "string",
            "description" => "Impact on code maintainability"
          },
          "potential_issues" => %{
            "type" => "array",
            "items" => %{
              "type" => "string"
            },
            "description" => "List of potential issues or concerns with the adapted code"
          }
        },
        "required" => [
          "architectural_changes", 
          "algorithm_improvements", 
          "readability_impact", 
          "maintainability_impact"
        ],
        "additionalProperties" => false
      }
    end
  end
  
  defmodule AnalysisResponse do
    @moduledoc """
    Schema representing the full response from code analysis.
    """

    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset
    import Ecto.Changeset

    @primary_key false
    embedded_schema do
      embeds_one :analysis, Analysis
      field :summary, :string
    end
    
    @type t :: %__MODULE__{
      analysis: Analysis.t(),
      summary: String.t()
    }

    def changeset(response, attrs) do
      response
      |> cast(attrs, [:summary])
      |> validate_required([:summary])
      |> cast_embed(:analysis, required: true)
    end
    
    @doc """
    Converts the schema to a JSON schema for Instructor integration.
    """
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "analysis" => Analysis.to_json_schema(),
          "summary" => %{
            "type" => "string",
            "description" => "A summary of the analysis result"
          }
        },
        "required" => ["analysis", "summary"],
        "additionalProperties" => false
      }
    end
  end
  
  defmodule RankingItem do
    @moduledoc """
    Schema representing a ranked adaptation.
    """
    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset

    @primary_key false
    embedded_schema do
      field :adaptation_name, :string
      field :score, :float
      field :strengths, {:array, :string}
      field :weaknesses, {:array, :string}
      field :recommendation, :string
    end

    @doc """
    Creates a changeset for validating ranking item data.
    """
    def changeset(ranking_item, attrs) do
      ranking_item
      |> cast(attrs, [:adaptation_name, :score, :strengths, :weaknesses, :recommendation])
      |> validate_required([:adaptation_name, :score, :recommendation])
      |> validate_number(:score, greater_than_or_equal_to: 0.0, less_than_or_equal_to: 1.0)
      |> validate_inclusion(:recommendation, ["adopt", "consider", "reject"])
    end
    
    @doc """
    Converts the schema to a JSON schema for Instructor integration.
    """
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "adaptation_name" => %{
            "type" => "string",
            "description" => "Name of the adaptation being ranked"
          },
          "score" => %{
            "type" => "number",
            "description" => "Score between 0.0 and 1.0 indicating the quality of the adaptation",
            "minimum" => 0.0,
            "maximum" => 1.0
          },
          "strengths" => %{
            "type" => "array",
            "items" => %{
              "type" => "string"
            },
            "description" => "List of key strengths of this adaptation"
          },
          "weaknesses" => %{
            "type" => "array",
            "items" => %{
              "type" => "string"
            },
            "description" => "List of key weaknesses of this adaptation"
          },
          "recommendation" => %{
            "type" => "string",
            "description" => "Recommendation for this adaptation: adopt, consider, or reject",
            "enum" => ["adopt", "consider", "reject"]
          }
        },
        "required" => ["adaptation_name", "score", "recommendation"],
        "additionalProperties" => false
      }
    end
  end
  
  defmodule RankingResponse do
    @moduledoc """
    Schema representing the full response from adaptation ranking.
    """

    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset
    
    alias AshSwarm.Foundations.AIExperimentEvaluation.RankingItem, as: Ranking
    
    @primary_key false
    embedded_schema do
      embeds_many :rankings, Ranking
      field :best_adaptation, :string
      field :explanation, :string
    end
    
    @type t :: %__MODULE__{
      best_adaptation: String.t(),
      explanation: String.t(),
      rankings: [Ranking.t()]
    }

    def changeset(response, attrs) do
      response
      |> cast(attrs, [:best_adaptation, :explanation])
      |> validate_required([:best_adaptation, :explanation])
      |> cast_embed(:rankings, required: true)
    end
    
    @doc """
    Converts the schema to a JSON schema for Instructor integration.
    """
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "rankings" => %{
            "type" => "array",
            "items" => RankingItem.to_json_schema(),
            "description" => "Ranked list of adaptations"
          },
          "best_adaptation" => %{
            "type" => "string",
            "description" => "Name of the best adaptation"
          },
          "explanation" => %{
            "type" => "string",
            "description" => "Explanation of the ranking criteria and decision process"
          }
        },
        "required" => ["rankings", "best_adaptation", "explanation"],
        "additionalProperties" => false
      }
    end
  end
  
  defimpl Enumerable, for: Evaluation do
    def count(_evaluation), do: {:ok, 4}  # Number of fields
    
    def member?(_evaluation, {:success_rating, _}), do: {:ok, true}
    def member?(_evaluation, {:recommendation, _}), do: {:ok, true}
    def member?(_evaluation, {:risks, _}), do: {:ok, true}
    def member?(_evaluation, {:improvement_areas, _}), do: {:ok, true}
    def member?(_evaluation, _), do: {:ok, false}
    
    def slice(_evaluation), do: {:error, __MODULE__}
    
    def reduce(evaluation, acc, fun) do
      # Convert struct to a list of {key, value} pairs
      # This will let the struct be used in Enum functions
      fields = [
        {:success_rating, evaluation.success_rating},
        {:recommendation, evaluation.recommendation},
        {:risks, evaluation.risks},
        {:improvement_areas, evaluation.improvement_areas}
      ]
      
      Enumerable.List.reduce(fields, acc, fun)
    end
  end
  
  defimpl Enumerable, for: EvaluationResponse do
    def count(_response), do: {:error, __MODULE__}
    
    def member?(_response, _element), do: {:error, __MODULE__}
    
    def reduce(_response, {:halt, acc}, _fun), do: {:halted, acc}
    def reduce(response, {:suspend, acc}, fun), do: {:suspended, acc, &reduce(response, &1, fun)}
    def reduce(%EvaluationResponse{evaluation: evaluation, explanation: explanation}, {:cont, acc}, fun) do
      # Create a list of key-value pairs from the struct fields
      elements = [
        {:evaluation, evaluation},
        {:explanation, explanation}
      ]
      
      # Then reduce over this list
      Enumerable.reduce(elements, {:cont, acc}, fun)
    end
    
    def slice(_response), do: {:error, __MODULE__}
  end
  
  @doc """
  Evaluates an optimization experiment, comparing original code, optimized code, and metrics.

  ## Options
  * `:evaluation_focus` - :performance, :reliability, or :balanced (default)
  * `:model` - The LLM model to use for evaluation
  """
  @spec evaluate_experiment(String.t(), String.t(), map(), keyword()) :: {:ok, map()} | {:error, term()}
  def evaluate_experiment(original_code, optimized_code, metrics, options \\ []) do
    alias AshSwarm.Foundations.AIExperimentEvaluation.{EvaluationResponse, Evaluation}
    
    focus = Keyword.get(options, :evaluation_focus, :balanced)
    model = Keyword.get(options, :model, nil)
    
    # Create prompt for evaluation
    sys_msg = """
    You are an AI code evaluation assistant. Your task is to evaluate the results of a code optimization experiment.
    
    Please analyze the original code, the optimized code implementation, and the metrics provided.
    Make a determination about whether the optimization was successful and should be applied.
    
    Provide a comprehensive evaluation with:
    1. Success rating (0.0 to 1.0)
    2. Recommendation (whether to apply or not)
    3. Key risks
    4. Improvement areas
    """
    
    user_msg = """
    # Original Code
    ```elixir
    #{original_code}
    ```
    
    # Optimized Code
    ```elixir
    #{optimized_code}
    ```
    
    # Metrics
    - Performance: #{metrics[:performance] || "No performance metrics available"}
    - Memory Usage: #{metrics[:memory_usage] || "No memory usage metrics available"}
    - Test Results: #{metrics[:test_results] || "No test results available"}
    - Static Analysis: #{metrics[:static_analysis] || "No static analysis results available"}
    
    Please evaluate this optimization experiment with a focus on #{focus}.
    """
    
    # Call InstructorHelper for evaluation
    try do
      Logger.debug("Calling InstructorHelper for evaluation")
      
      # Call the gen function
      case InstructorHelper.gen(
        %EvaluationResponse{},
        sys_msg,
        user_msg,
        model
      ) do
        {:ok, result} ->
          # Create full evaluation result with the successful result
          evaluation_result = %{
            id: UUID.uuid4(),
            timestamp: DateTime.utc_now(),
            original_code: original_code,
            adapted_code: optimized_code,
            metrics: metrics,
            explanation: result.explanation || "",
            evaluation: result.evaluation || %Evaluation{
              success_rating: 0.0,
              recommendation: "Failed to evaluate",
              risks: ["Evaluation failure"],
              improvement_areas: ["Fix evaluation process"]
            }
          }
          
          # Return as successful result
          {:ok, evaluation_result}
          
        {:error, reason} ->
          # Handle error case
          Logger.error("Error from InstructorHelper.gen: #{inspect(reason)}")
          {:error, "Failed to evaluate experiment: #{inspect(reason)}"}
          
        result when is_map(result) ->
          # Direct result was returned without being wrapped in a tuple
          evaluation_result = %{
            id: UUID.uuid4(),
            timestamp: DateTime.utc_now(),
            original_code: original_code,
            adapted_code: optimized_code,
            metrics: metrics,
            explanation: Map.get(result, :explanation, ""),
            evaluation: Map.get(result, :evaluation, %Evaluation{
              success_rating: 0.0,
              recommendation: "Failed to evaluate",
              risks: ["Evaluation failure"],
              improvement_areas: ["Fix evaluation process"]
            })
          }
          
          # Return as successful result
          {:ok, evaluation_result}
          
        other ->
          # Unknown result format
          Logger.error("Unexpected result format from InstructorHelper.gen: #{inspect(other)}")
          {:error, "Unexpected result format: #{inspect(other)}"}
      end
    rescue
      e ->
        # Log and return error
        Logger.error("Error during evaluate_experiment: #{inspect(e)}")
        {:error, "Failed to evaluate experiment: #{inspect(e)}"}
    end
  end
  
  @doc """
  Evaluates a code adaptation by comparing the original code to the adapted code.
  
  Parameters:
  - original_code - The original code
  - adapted_code - The adapted code
  - metrics - Optional metrics to include in the evaluation
  - options - Additional options for the evaluation
  
  Returns:
  - A tuple with the result of the evaluation
  """
  @spec evaluate_code_adaptation(String.t(), String.t(), map(), keyword()) :: {:ok, map()} | {:error, any()}
  def evaluate_code_adaptation(original_code, adapted_code, metrics \\ %{}, options \\ []) do
    evaluate_experiment(original_code, adapted_code, metrics, options)
  end
  
  @doc """
  Provides a detailed comparative analysis between original and adapted code.
  
  This function goes beyond simple metrics comparison to analyze the qualitative
  differences between code versions, highlighting improvements, regressions,
  and architectural changes.
  
  ## Parameters
  
    * `original_code` - The original code before adaptation
    * `adapted_code` - The code after adaptation
    * `options` - Additional options for analysis customization
    
  ## Returns
  
    * `{:ok, analysis}` - Detailed analysis of the differences
    * `{:error, reason}` - Error information if analysis fails
  """
  @spec analyze_code_differences(String.t(), String.t(), keyword()) :: 
    {:ok, map()} | {:error, any()}
  def analyze_code_differences(original_code, adapted_code, options \\ []) do
    # Prepare prompt for the language model
    sys_msg = """
    You are an expert Elixir code architect with deep knowledge of code quality,
    performance optimization, and software design patterns. Your task is to analyze
    the differences between two code versions and provide a detailed, qualitative
    assessment of the changes.
    """
    
    user_msg = """
    Original code:
    ```elixir
    #{original_code}
    ```
    
    Adapted code:
    ```elixir
    #{adapted_code}
    ```
    
    Please provide a detailed analysis of the differences between these two code versions.
    Focus on:
    1. Architectural changes (patterns, structure, organization)
    2. Algorithm improvements or regressions
    3. Readability changes
    4. Maintainability impact
    5. Potential issues or concerns with the adapted code
    
    Your analysis should go beyond simple line-by-line comparison and consider the broader
    implications of the changes for code quality, performance, and maintainability.
    """
    
    # Use Instructor Ex to get structured analysis
    model = Keyword.get(options, :model, nil)
    
    case InstructorHelper.gen(%AnalysisResponse{}, sys_msg, user_msg, model) do
      {:ok, result} ->
        # Process the result and add metadata
        processed_result = process_analysis_result(result, original_code, adapted_code)
        {:ok, processed_result}
        
      {:error, reason} ->
        Logger.error("Failed to analyze code differences: #{inspect(reason)}")
        {:error, reason}
    end
  end
  
  @doc """
  Evaluates a series of adaptations to determine the best candidate.
  
  When multiple adaptation strategies are applied to the same code,
  this function helps determine which one provides the best overall improvement.
  
  ## Parameters
  
    * `original_code` - The original code before adaptation
    * `adaptations` - Map of adaptation name to adapted code
    * `metrics` - Map of adaptation name to performance metrics
    * `options` - Additional options for evaluation
    
  ## Returns
  
    * `{:ok, ranking}` - Ranked list of adaptations with scores and explanations
    * `{:error, reason}` - Error information if evaluation fails
  """
  @spec rank_adaptations(String.t(), map(), map(), keyword()) :: 
    {:ok, list(map())} | {:error, any()}
  def rank_adaptations(original_code, adaptations, metrics, options \\ []) do
    # Prepare prompt for the language model
    sys_msg = """
    You are an expert Elixir code evaluator specializing in comparing multiple code adaptations
    to determine which provides the best overall improvement. Your evaluation should consider
    performance metrics, code quality, and maintainability.
    """
    
    # Format adaptations and metrics for the prompt
    adaptations_text = adaptations
      |> Enum.map(fn {name, code} ->
        """
        === Adaptation: #{name} ===
        ```elixir
        #{code}
        ```
        
        Metrics:
        #{format_metrics(Map.get(metrics, name, %{}))}
        
        """
      end)
      |> Enum.join("\n\n")
    
    user_msg = """
    Original code:
    ```elixir
    #{original_code}
    ```
    
    === Adaptations and their metrics ===
    
    #{adaptations_text}
    
    Please rank these adaptations from best to worst based on their overall quality,
    performance improvements, and maintainability. For each adaptation, provide:
    1. A score between 0.0 and 1.0
    2. Key strengths
    3. Key weaknesses
    4. A recommendation (adopt, consider, or reject)
    
    Then, identify the best adaptation and explain your reasoning.
    """
    
    # Use Instructor Ex to get structured ranking
    model = Keyword.get(options, :model, nil)
    
    case InstructorHelper.gen(%RankingResponse{}, sys_msg, user_msg, model) do
      {:ok, result} ->
        # Process the result and add metadata
        processed_result = process_ranking_result(result, original_code, adaptations, metrics)
        {:ok, processed_result}
        
      {:error, reason} ->
        Logger.error("Failed to rank adaptations: #{inspect(reason)}")
        {:error, reason}
    end
  end
  
  # Format metrics for the prompt
  defp format_metrics(metrics) do
    case metrics do
      %{} ->
        metrics
        |> Enum.map(fn {key, value} -> "- #{key}: #{inspect(value)}" end)
        |> Enum.join("\n")
        
      _ when is_binary(metrics) ->
        metrics
        
      _ ->
        inspect(metrics, pretty: true)
    end
  end
  
  @doc false
  # Reserved for future use when processing evaluation results with additional context
  defp process_evaluation_result(result, original_code, adapted_code, metrics) do
    # Create a map with evaluation data and metadata
    %{
      evaluation: Map.from_struct(result.evaluation),
      explanation: result.explanation,
      original_code: original_code,
      adapted_code: adapted_code,
      metrics: metrics,
      timestamp: DateTime.utc_now(),
      id: generate_evaluation_id()
    }
  end
  
  @doc """
  Process the analysis result and add metadata
  """
  defp process_analysis_result(result, original_code, adapted_code) do
    # Create a map with analysis data and metadata
    %{
      analysis: Map.from_struct(result.analysis),
      summary: result.summary,
      original_code: original_code,
      adapted_code: adapted_code,
      timestamp: DateTime.utc_now(),
      id: generate_analysis_id()
    }
  end
  
  @doc """
  Process the ranking result and add metadata
  """
  defp process_ranking_result(result, original_code, adaptations, metrics) do
    # Create a map with ranking data and metadata
    %{
      rankings: Enum.map(result.rankings, &Map.from_struct/1),
      best_adaptation: result.best_adaptation,
      explanation: result.explanation,
      original_code: original_code,
      adaptations: adaptations,
      metrics: metrics,
      timestamp: DateTime.utc_now(),
      id: generate_ranking_id()
    }
  end
  
  @doc false
  # Reserved for future use to generate unique evaluation IDs
  defp generate_evaluation_id do
    Base.encode16(:crypto.strong_rand_bytes(8), case: :lower)
  end
  
  @doc """
  Generate a unique ID for each analysis
  """
  defp generate_analysis_id do
    Base.encode16(:crypto.strong_rand_bytes(8), case: :lower)
  end
  
  @doc """
  Generate a unique ID for each ranking
  """
  defp generate_ranking_id do
    Base.encode16(:crypto.strong_rand_bytes(8), case: :lower)
  end
end
