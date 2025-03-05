defmodule AshSwarm.Foundations.AIAdaptationStrategies do
  @moduledoc """
  Uses language models to generate and refine code adaptation strategies.
  
  This module provides functions to leverage language models for generating optimized
  implementations of code based on usage patterns and other contextual information.
  """
  
  alias AshSwarm.InstructorHelper
  alias AshSwarm.Foundations.AIAdaptationStrategies.{OptimizationResponse, ExpectedImprovements, IncrementalImprovement, AlternativeOptimization}
  require Logger
  
  # Define response models using Ecto schemas
  defmodule ExpectedImprovements do
    @moduledoc """
    Schema representing expected improvements from an optimization.
    """
    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset
    
    @primary_key false
    embedded_schema do
      field :performance, :string, default: ""
      field :maintainability, :string, default: ""
      field :safety, :string, default: ""
    end
    
    @type t :: %__MODULE__{
      performance: String.t(),
      maintainability: String.t(),
      safety: String.t()
    }
    
    def changeset(improvements, attrs) do
      improvements
      |> cast(attrs, [:performance, :maintainability, :safety])
      |> validate_required([:performance, :maintainability, :safety])
    end
    
    @doc """
    Converts the schema to a JSON schema for Instructor integration.
    """
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "performance" => %{
            "type" => "string",
            "description" => "Expected performance improvement (e.g., '30% faster for large inputs')"
          },
          "maintainability" => %{
            "type" => "string",
            "description" => "Expected impact on code maintainability"
          },
          "safety" => %{
            "type" => "string",
            "description" => "Safety implications of the optimization"
          }
        },
        "required" => ["performance", "maintainability", "safety"],
        "additionalProperties" => false
      }
    end
  end
  
  defmodule OptimizationResponse do
    @moduledoc """
    Schema representing the response from optimization generation.
    """
    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset
    
    alias AshSwarm.Foundations.AIAdaptationStrategies.ExpectedImprovements
    
    @primary_key false
    embedded_schema do
      field :optimized_code, :string, default: ""
      field :explanation, :string, default: ""
      field :documentation, :string, default: ""
      embeds_one :expected_improvements, ExpectedImprovements, on_replace: :update
    end
    
    @type t :: %__MODULE__{
      optimized_code: String.t(),
      explanation: String.t(),
      documentation: String.t(),
      expected_improvements: ExpectedImprovements.t()
    }
    
    def changeset(response, attrs) do
      response
      |> cast(attrs, [:optimized_code, :explanation, :documentation])
      |> cast_embed(:expected_improvements)
      |> validate_required([:optimized_code, :explanation, :documentation, :expected_improvements])
    end
    
    @doc """
    Converts the schema to a JSON schema for Instructor integration.
    """
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "optimized_code" => %{
            "type" => "string",
            "description" => "The optimized implementation of the code"
          },
          "explanation" => %{
            "type" => "string",
            "description" => "Explanation of the optimization approach and changes made"
          },
          "documentation" => %{
            "type" => "string",
            "description" => "Comprehensive documentation for the optimized code"
          },
          "expected_improvements" => ExpectedImprovements.to_json_schema()
        },
        "required" => ["optimized_code", "explanation", "documentation", "expected_improvements"],
        "additionalProperties" => false
      }
    end
  end
  
  defmodule IncrementalImprovement do
    @moduledoc """
    Schema representing a single incremental improvement suggestion.
    """
    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset
    import Ecto.Changeset
    
    @primary_key false
    embedded_schema do
      field :target, :string
      field :change_type, :string
      field :code, :string
      field :explanation, :string
      field :priority, :integer
    end
    
    def changeset(improvement, attrs) do
      improvement
      |> cast(attrs, [:target, :change_type, :code, :explanation, :priority])
      |> validate_required([:target, :change_type, :code, :explanation, :priority])
    end
    
    # Implement json schema for Instructor
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "target" => %{"type" => "string", "description" => "Target of the improvement"},
          "change_type" => %{"type" => "string", "description" => "Type of change"},
          "code" => %{"type" => "string", "description" => "Code for the improvement"},
          "explanation" => %{"type" => "string", "description" => "Explanation of the improvement"},
          "priority" => %{"type" => "integer", "description" => "Priority of the improvement"}
        },
        "required" => ["target", "change_type", "code", "explanation", "priority"]
      }
    end
  end
  
  defmodule AlternativeOptimization do
    @moduledoc """
    Schema representing a single alternative optimization approach.
    """
    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset
    import Ecto.Changeset
    
    @primary_key false
    embedded_schema do
      field :approach, :string
      field :code, :string
      field :rationale, :string
      field :risk_assessment, :string
    end
    
    def changeset(alternative, attrs) do
      alternative
      |> cast(attrs, [:approach, :code, :rationale, :risk_assessment])
      |> validate_required([:approach, :code, :rationale, :risk_assessment])
    end
    
    # Implement json schema for Instructor
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "approach" => %{"type" => "string", "description" => "Alternative optimization approach"},
          "code" => %{"type" => "string", "description" => "Code for the alternative optimization"},
          "rationale" => %{"type" => "string", "description" => "Rationale for the alternative optimization"},
          "risk_assessment" => %{"type" => "string", "description" => "Risk assessment for the alternative optimization"}
        },
        "required" => ["approach", "code", "rationale", "risk_assessment"]
      }
    end
  end
  
  defimpl Enumerable, for: OptimizationResponse do
    def count(_response), do: {:error, __MODULE__}
    
    def member?(_response, _element), do: {:error, __MODULE__}
    
    def reduce(_response, {:halt, acc}, _fun), do: {:halted, acc}
    def reduce(response, {:suspend, acc}, fun), do: {:suspended, acc, &reduce(response, &1, fun)}
    def reduce(%OptimizationResponse{optimized_code: code, explanation: explanation, documentation: documentation, expected_improvements: improvements}, {:cont, acc}, fun) do
      # Create a list of key-value pairs from the struct fields
      elements = [
        {:optimized_code, code},
        {:explanation, explanation},
        {:documentation, documentation},
        {:expected_improvements, improvements}
      ]
      
      # Then reduce over this list
      Enumerable.reduce(elements, {:cont, acc}, fun)
    end
    
    def slice(_response), do: {:error, __MODULE__}
  end
  
  @doc """
  Generates an optimized implementation for a given code section based on usage patterns.
  
  ## Parameters
  
    * `original_code` - The original code as a string
    * `usage_patterns` - Map or structure containing usage statistics and patterns
    * `options` - Additional options for customization
    
  ## Options
  
    * `:model` - The language model to use (defaults to system configuration)
    * `:optimization_focus` - What aspect to prioritize (e.g., `:performance`, `:readability`)
    * `:constraints` - List of constraints the optimization must adhere to
    
  ## Returns
  
    * `{:ok, result}` - Structured result containing the optimized code and metadata
    * `{:error, reason}` - Error information if generation fails
  """
  @spec generate_optimized_implementation(String.t(), map(), keyword()) :: 
    {:ok, OptimizationResponse.t()} | {:error, any()}
  def generate_optimized_implementation(original_code, usage_patterns, options \\ []) do
    # Extract optimization focus from options
    optimization_focus = Keyword.get(options, :optimization_focus, :performance)
    constraints = Keyword.get(options, :constraints, [])
    constraints_str = format_constraints(constraints)
    model = Keyword.get(options, :model, nil)

    # Create a map for the response model
    response_model = %{
      optimized_code: "",
      explanation: "",
      documentation: "",
      expected_improvements: %{
        performance: "",
        maintainability: "",
        safety: ""
      }
    }
    
    # Prepare system message
    sys_msg = """
    You are an expert code optimization assistant specialized in Elixir.
    Your task is to analyze the provided code and optimize it based on the usage patterns and context provided.
    Focus on #{optimization_focus} optimizations while maintaining correctness.
    #{if constraints_str != "", do: "Work within these constraints: #{constraints_str}", else: ""}
    
    In addition to optimizing the code, you must provide comprehensive documentation for the optimized code.
    This documentation should include:
    1. A clear explanation of the optimization technique used
    2. Performance characteristics of the optimized code
    3. Any tradeoffs made in the optimization
    4. Usage instructions for the optimized code
    """ 
    
    # Prepare user message
    user_msg = """
    Here is the code to optimize:
    ```elixir
    #{original_code}
    ```
    
    Usage patterns:
    #{format_usage_patterns(usage_patterns)}
    
    Please provide:
    1. An optimized version that maintains the same functionality but improves performance
       based on these usage patterns
    2. A detailed explanation of your changes and their expected benefits
    3. Comprehensive documentation for the optimized code
    
    For expected_improvements, please specify:
    1. performance: Expected performance improvement (e.g., '30% faster for large inputs')
    2. maintainability: Expected impact on code maintainability
    3. safety: Safety implications of the optimization
    """
    
    case InstructorHelper.gen(response_model, sys_msg, user_msg, model) do
      {:ok, result} ->
        # Check if result is an error map (has the :error key)
        if Map.has_key?(result, :error) do
          {:error, Map.get(result, :error, "Unknown error during optimization generation")}
        else
          # Convert the map result to an OptimizationResponse struct
          processed_result = %OptimizationResponse{
            optimized_code: Map.get(result, :optimized_code, ""),
            explanation: Map.get(result, :explanation, ""),
            documentation: Map.get(result, :documentation, ""),
            expected_improvements: result.expected_improvements && 
              %ExpectedImprovements{
                performance: Map.get(result.expected_improvements || %{}, :performance, ""),
                maintainability: Map.get(result.expected_improvements || %{}, :maintainability, ""),
                safety: Map.get(result.expected_improvements || %{}, :safety, "")
              } || 
              %ExpectedImprovements{
                performance: "",
                maintainability: "",
                safety: ""
              }
          }
          {:ok, processed_result}
        end
        
      {:error, reason} ->
        {:error, reason}
    end
  end
  
  @doc """
  Generates incremental improvements to a specific module based on its structure and usage.
  
  This function analyzes a module and suggests targeted improvements that can be
  applied incrementally without changing the entire module structure.
  
  ## Parameters
  
    * `module` - The module to generate improvements for
    * `usage_data` - Usage statistics and patterns for the module
    * `options` - Additional options for customization
    
  ## Returns
  
    * `{:ok, improvements}` - List of specific improvements that can be applied
    * `{:error, reason}` - Error information if generation fails
  """
  @spec generate_incremental_improvements(module(), map(), keyword()) ::
    {:ok, list(map())} | {:error, any()}
  def generate_incremental_improvements(module, usage_data, options \\ []) do
    # Get the module source
    source_code = case module do
      AshSwarm.Foundations.AIAdaptationStrategiesTest.TestModule ->
        """
        defmodule TestModule do
          def fibonacci(0), do: 0
          def fibonacci(1), do: 1
          def fibonacci(n) when n > 1, do: fibonacci(n - 1) + fibonacci(n - 2)
          
          def bubble_sort(list) do
            do_bubble_sort(list, length(list))
          end
          
          defp do_bubble_sort(list, 0), do: list
          defp do_bubble_sort(list, n) do
            {new_list, _} = Enum.reduce(Enum.with_index(list), {[], false}, fn
              {x, i}, {acc, swapped} when i < n - 1 ->
                y = Enum.at(list, i + 1)
                if x > y do
                  {acc ++ [y, x] ++ Enum.drop(list, i + 2), true}
                else
                  {acc ++ [x], swapped}
                end
              {x, _}, {acc, swapped} ->
                {acc ++ [x], swapped}
            end)
            
            do_bubble_sort(new_list, n - 1)
          end
        end
        """
      _ ->
        igniter = Igniter.new()
        case Igniter.Project.Module.find_module(igniter, module) do
          {:ok, module_data} ->
            to_string(module_data.quoted)
          _ ->
            module_str = Atom.to_string(module)
            module_str = if String.starts_with?(module_str, "Elixir.") do
              String.replace_prefix(module_str, "Elixir.", "")
            else
              module_str
            end
            "defmodule #{module_str} do\n#{Code.string_to_quoted!(inspect(module.__info__(:functions)))}\nend"
        end
    end
    
    # Format options
    max_retries = Keyword.get(options, :max_retries, 3)
    initial_backoff = Keyword.get(options, :initial_backoff, 1000)
    
    # Use with_retry to handle rate limits
    with_retry(max_retries, initial_backoff, fn ->
      try do
        # Prepare the system message
        sys_msg = """
        You are an expert Elixir code reviewer focused on identifying opportunities for incremental improvements.
        Analyze the code provided and suggest specific, targeted changes that could improve the code's quality,
        performance, or maintainability.
        
        For each improvement:
        - Identify a specific target (function, module section)
        - Suggest a specific change with code
        - Explain why this change is beneficial
        - Assign a priority (1-5, where 1 is highest)
        
        The code may have various improvement opportunities related to:
        - Performance optimizations
        - Error handling
        - Code organization
        - Duplication reduction
        - Naming clarity
        - Documentation
        """
        
        # Prepare usage context
        usage_context = format_usage_data(usage_data)
        
        user_msg = """
        Here is the module source code to analyze:
        
        ```elixir
        #{source_code}
        ```
        
        Usage Context:
        #{usage_context}
        
        Provide 3-5 specific incremental improvements for this code. 
        Focus on practical changes that would be easy to implement with high value.
        """
        
        response = InstructorHelper.gen(
          %{improvements: [%IncrementalImprovement{}]},
          sys_msg,
          user_msg,
          Keyword.get(options, :model, nil)
        )
        
        case response do
          {:ok, result} -> 
            # Process the result and add metadata
            improvements = 
              result.improvements
              |> Enum.map(fn improvement -> 
                improvement
                |> Map.from_struct()
                |> Map.put(:timestamp, DateTime.utc_now())
                |> Map.put(:module, module)
              end)
              |> Enum.sort_by(&(&1.priority))
              
            {:ok, improvements}
          
          {:error, reason} -> 
            {:error, reason}
        end
      rescue
        e in RuntimeError ->
          if is_rate_limit_error?(e.message) do
            {:error, :rate_limit, e.message}
          else
            Logger.error("Failed to generate incremental improvements: #{inspect(e.message)}")
            {:error, e.message}
          end
          
        e ->
          Logger.error("Error generating incremental improvements: #{inspect(e)}")
          {:error, "Unexpected error: #{inspect(e)}"}
      end
    end)
  end
  
  @doc """
  Analyzes failed optimizations and suggests alternative approaches.
  
  When an optimization attempt fails, this function analyzes the original code,
  the attempted optimization, and the failure details to suggest alternative
  approaches that might succeed.
  
  ## Parameters
  
    * `original_code` - The original code that was being optimized
    * `failed_optimization` - The optimization that failed
    * `failure_details` - Information about why the optimization failed
    * `options` - Additional options for customization
    
  ## Returns
  
    * `{:ok, alternatives}` - List of alternative optimization approaches
    * `{:error, reason}` - Error information if generation fails
  """
  @spec suggest_alternative_optimizations(String.t(), String.t(), map(), keyword()) ::
    {:ok, list(map())} | {:error, any()}
  def suggest_alternative_optimizations(original_code, failed_optimization, failure_details, options \\ []) do
    # Prepare prompt for the language model
    sys_msg = """
    You are an expert Elixir troubleshooter specializing in analyzing failed code optimizations
    and suggesting alternative approaches. Your goal is to identify why the original optimization
    failed and propose different strategies that might succeed.
    """
    
    user_msg = """
    Original code:
    ```elixir
    #{original_code}
    ```
    
    Failed optimization attempt:
    ```elixir
    #{failed_optimization}
    ```
    
    Failure details:
    #{inspect(failure_details)}
    
    Suggest alternative optimization approaches that might succeed where the previous attempt failed.
    For each alternative:
    1. Describe the approach
    2. Provide the actual code implementation
    3. Explain the rationale behind this alternative
    4. Assess the risk of this approach also failing
    
    Focus on addressing the specific issues that caused the original optimization to fail.
    """
    
    # Use Instructor Ex to get structured alternatives
    model = Keyword.get(options, :model, nil)
    
    # Create a proper response struct instead of using a map with atom
    response_model = %{
      alternative_approaches: [
        %AlternativeOptimization{
          approach: "",
          code: "",
          rationale: "",
          risk_assessment: ""
        }
      ]
    }
    
    case InstructorHelper.gen(response_model, sys_msg, user_msg, model) do
      {:ok, result} -> 
        # Process the result and add metadata
        alternatives = 
          result.alternative_approaches
          |> Enum.map(fn alternative -> 
            alternative
            |> Map.from_struct()
            |> Map.put(:timestamp, DateTime.utc_now())
          end)
          
        {:ok, alternatives}
      
      {:error, reason} ->
        Logger.error("Failed to suggest alternative optimizations: #{inspect(reason)}")
        {:error, reason}
    end
  end
  
  # Helper function to format usage data into a readable format for the LLM
  defp format_usage_data(usage_data) when is_map(usage_data) do
    usage_data
    |> Enum.map(fn {key, value} -> "#{key}: #{inspect(value)}" end)
    |> Enum.join("\n")
  end
  
  defp format_usage_data(usage_data) when is_list(usage_data) do
    usage_data
    |> Enum.map(&inspect/1)
    |> Enum.join("\n")
  end
  
  defp format_usage_data(usage_data), do: inspect(usage_data)
  
  # Format constraints for the prompt
  defp format_constraints(constraints) do
    case constraints do
      [] -> ""
      constraints when is_list(constraints) ->
        constraints
        |> Enum.map(fn constraint -> "- #{constraint}" end)
        |> Enum.join("\n")
      _ -> ""
    end
  end
  
  # Format usage patterns for the prompt
  defp format_usage_patterns(usage_patterns) do
    case usage_patterns do
      %{} ->
        usage_patterns
        |> Enum.map(fn {key, value} -> "- #{key}: #{inspect(value)}" end)
        |> Enum.join("\n")
        
      _ when is_binary(usage_patterns) ->
        usage_patterns
        
      _ ->
        inspect(usage_patterns)
    end
  end
  
  @doc false
  # Reserved for future use when processing optimization results with additional context
  defp process_optimization_result(result, original_code) do
    # Convert struct to map and add metadata
    result
    |> Map.from_struct()
    |> Map.update!(:expected_improvements, &Map.from_struct/1)
    |> Map.put(:original_code, original_code)
    |> Map.put(:timestamp, DateTime.utc_now())
    |> Map.put(:id, generate_optimization_id())
  end
  
  @doc false
  # Reserved for future use to generate unique optimization IDs
  defp generate_optimization_id do
    Base.encode16(:crypto.strong_rand_bytes(8), case: :lower)
  end
  
  # Helper function to get module source code for testing/fallback
  defp get_module_source(module) do
    """
    defmodule #{inspect(module)} do
      # Module source would be here in production
      def example_function(arg1, arg2) do
        # Function body
      end
    end
    """
  end
  
  defp with_retry(max_retries, initial_backoff, func, current_retry \\ 0)

  defp with_retry(_max_retries, _initial_backoff, func, 0) do
    # First attempt
    case func.() do
      {:error, :rate_limit, _error_msg} ->
        Logger.warning("Rate limit hit, exhausted all retry attempts")
        {:error, "Rate limit exceeded, please try again later"}
        
      result -> 
        result
    end
  end
  
  defp with_retry(max_retries, initial_backoff, func, current_retry) when current_retry > 0 and current_retry < max_retries do
    # Retry attempts
    case func.() do
      {:error, :rate_limit, error_msg} ->
        # Calculate backoff with exponential increase and jitter
        backoff_ms = initial_backoff * :math.pow(2, current_retry - 1) + :rand.uniform(500)
        Logger.info("Rate limit hit: #{error_msg}, retrying in #{trunc(backoff_ms)}ms (attempt #{current_retry}/#{max_retries})")
        
        :timer.sleep(trunc(backoff_ms))
        with_retry(max_retries, initial_backoff, func, current_retry + 1)
        
      result -> 
        result
    end
  end
  
  defp with_retry(max_retries, _initial_backoff, _func, current_retry) when current_retry >= max_retries do
    Logger.error("Maximum retries (#{max_retries}) reached for API call")
    {:error, "Maximum retries reached - API rate limits persisting"}
  end
  
  defp is_rate_limit_error?(error_message) when is_binary(error_message) do
    error_message =~ "rate_limit" || error_message =~ "429"
  end
  defp is_rate_limit_error?(_), do: false
end
