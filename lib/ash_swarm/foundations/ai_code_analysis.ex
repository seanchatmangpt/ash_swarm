defmodule AshSwarm.Foundations.AICodeAnalysis do
  @moduledoc """
  Uses language models via Instructor Ex to analyze code and suggest optimizations.
  
  This module provides capabilities to extract code from modules using Igniter,
  analyze it with language models, and return structured optimization suggestions.
  """
  
  alias AshSwarm.InstructorHelper
  alias AshSwarm.Foundations.AICodeAnalysis.{OptimizationOpportunity, AnalysisResponse}
  require Logger
  
  # Define response models using Ecto schemas
  defmodule OptimizationOpportunity do
    @moduledoc """
    Schema representing a code optimization opportunity.
    """
    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset

    @primary_key false
    embedded_schema do
      field :description, :string
      field :type, :string
      field :location, :string
      field :severity, :string
      field :rationale, :string
      field :suggested_change, :string
    end

    @type t :: %__MODULE__{
      description: String.t(),
      type: String.t(),
      location: String.t(),
      severity: String.t(),
      rationale: String.t(),
      suggested_change: String.t()
    }
    
    def changeset(opportunity, attrs) do
      opportunity
      |> cast(attrs, [:description, :type, :location, :severity, :rationale, :suggested_change])
      |> validate_required([:description, :type, :location, :severity])
    end
    
    @doc """
    Converts the schema to a JSON schema for Instructor integration.
    """
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "description" => %{
            "type" => "string",
            "description" => "A brief description of the optimization opportunity"
          },
          "type" => %{
            "type" => "string",
            "description" => "The type of optimization (e.g., performance, memory, readability)"
          },
          "location" => %{
            "type" => "string",
            "description" => "Where in the code the optimization can be applied (function/method/line)"
          },
          "severity" => %{
            "type" => "string",
            "description" => "How important this optimization is (high, medium, low)",
            "enum" => ["high", "medium", "low"]
          },
          "rationale" => %{
            "type" => "string",
            "description" => "Reasoning behind why this optimization is beneficial"
          },
          "suggested_change" => %{
            "type" => "string",
            "description" => "Suggested code change"
          }
        },
        "required" => ["description", "type", "location", "severity"],
        "additionalProperties" => false
      }
    end
  end
  
  defmodule AnalysisResponse do
    @moduledoc """
    Schema for the overall response from code analysis.
    """
    use Ecto.Schema
    use Instructor.EctoType
    import Ecto.Changeset
    
    alias AshSwarm.Foundations.AICodeAnalysis.OptimizationOpportunity
    
    @primary_key false
    embedded_schema do
      embeds_many :opportunities, OptimizationOpportunity
      field :summary, :string
    end
    
    @doc """
    Creates a changeset for validating analysis response data.
    """
    def changeset(response, attrs) do
      response
      |> cast(attrs, [:summary])
      |> cast_embed(:opportunities)
      |> validate_required([:opportunities])
    end
    
    @doc """
    Converts the schema to a JSON schema for Instructor integration.
    """
    def to_json_schema do
      %{
        "type" => "object",
        "properties" => %{
          "opportunities" => %{
            "type" => "array",
            "items" => OptimizationOpportunity.to_json_schema(),
            "description" => "List of optimization opportunities identified in the code"
          },
          "summary" => %{
            "type" => "string",
            "description" => "A summary of the analysis findings"
          }
        },
        "required" => ["opportunities"],
        "additionalProperties" => false
      }
    end
  end
  
  defimpl Enumerable, for: AnalysisResponse do
    def count(%{opportunities: opportunities}), do: {:ok, length(opportunities)}
    
    def member?(%{opportunities: opportunities}, element) do
      {:ok, Enum.member?(opportunities, element)}
    end
    
    def reduce(%{opportunities: opportunities}, acc, fun) do
      Enumerable.reduce(opportunities, acc, fun)
    end
    
    def slice(%{opportunities: opportunities}) do
      size = length(opportunities)
      {:ok, size, &Enum.slice(opportunities, &1, &2)}
    end
  end
  
  @doc """
  Analyzes code to find optimization opportunities using language models.
  
  ## Parameters
  
    * `module` - The module to analyze
    * `options` - Additional options for customization
    
  ## Options
  
    * `:model` - The language model to use (defaults to system configuration)
    * `:focus_areas` - List of areas to focus on (e.g., [:performance, :readability])
    * `:max_suggestions` - Maximum number of suggestions to return
    
  ## Returns
  
    * `{:ok, opportunities}` - List of optimization opportunities
    * `{:error, reason}` - Error information if analysis fails
  """
  @spec analyze_code(module(), keyword()) :: {:ok, list(map())} | {:error, any()}
  def analyze_code(module_info, options \\ []) do
    try do
      # Handle both module (atom) and map with module and source
      {_module, source_code} = case module_info do
        %{module: mod, source: src} when is_atom(mod) and is_binary(src) -> 
          {mod, src}
        mod when is_atom(mod) -> 
          # Fallback for when only module is passed without source
          {mod, get_module_source(mod)} 
      end
      
      # Analyze the source code
      analyze_source_code(source_code, %{}, options)
    rescue
      e ->
        Logger.error("Failed to analyze module #{inspect(module_info)}: #{inspect(e)}")
        {:error, "Failed to analyze module: #{inspect(e)}"}
    end
  end
  
  # Helper to get module source for testing
  defp get_module_source(module) do
    # This is just a stub for testing - in production this would use proper code extraction
    "defmodule #{inspect(module)} do\n  # Module source would be here\nend"
  end
  
  @doc """
  Analyzes a specific function within a module for optimization opportunities.
  
  ## Parameters
  
    * `module` - The module containing the function
    * `function_name` - The name of the function as an atom
    * `arity` - The arity of the function
    * `options` - Additional options for analysis customization
    
  ## Returns
  
    * `{:ok, optimization_opportunities}` - List of structured optimization suggestions
    * `{:error, reason}` - Error information if analysis fails
  """
  @spec analyze_function(module(), atom(), non_neg_integer(), keyword()) :: 
    {:ok, list(map())} | {:error, any()}
  def analyze_function(module, function_name, arity, options \\ []) do
    igniter = Igniter.new()
    
    try do
      # First try to find the module
      case Igniter.Project.Module.find_module(igniter, module) do
        {:ok, {_igniter, _source, zipper}} ->
          # Get the function source by extracting it from the module AST
          function_source = extract_function_source(zipper, function_name, arity) || 
                           get_function_source(module, function_name, arity)
          
          # Create context description
          _function_context = "Function #{function_name}/#{arity} in module #{inspect(module)}"
          
          # Analyze the function source
          analyze_source_code(function_source, %{}, options)
        
        {:error, reason} ->
          # Fallback to simulated function source
          Logger.warning("Could not find module #{inspect(module)}: #{inspect(reason)}. Using simulated function source.")
          function_source = get_function_source(module, function_name, arity)
          _function_context = "Function #{function_name}/#{arity} in module #{inspect(module)}"
          analyze_source_code(function_source, %{}, options)
      end
    rescue
      e ->
        Logger.error("Failed to analyze function #{function_name}/#{arity} in module #{inspect(module)}: #{inspect(e)}")
        {:error, "Failed to analyze function: #{inspect(e)}"}
    end
  end
  
  # Extract function source from AST
  defp extract_function_source(zipper, function_name, arity) do
    # Try to find the function in the AST
    # This is a simplified approach - in production this would be more robust
    try do
      # First locate the module's do block
      case find_module_do_block(zipper) do
        {:ok, do_block} ->
          # Now traverse to find the function
          case find_function(do_block, function_name, arity) do
            {:ok, func_zipper} ->
              # Convert the function AST to string
              Sourceror.to_string(Sourceror.Zipper.node(func_zipper))
            _ ->
              nil
          end
        _ ->
          nil
      end
    rescue
      _ -> nil
    end
  end
  
  # Find module's do block
  defp find_module_do_block(zipper) do
    try do
      case Sourceror.Zipper.down(zipper) do
        %Sourceror.Zipper{} = z ->
          case find_do_block_in_children(z) do
            {:ok, block} -> {:ok, block}
            _ -> {:error, "Do block not found"}
          end
        _ ->
          {:error, "Could not traverse AST"}
      end
    rescue
      _ -> {:error, "Error finding do block"}
    end
  end
  
  # Find do block in children
  defp find_do_block_in_children(zipper) do
    case Sourceror.Zipper.node(zipper) do
      [do: block] when is_tuple(block) or is_list(block) ->
        {:ok, Sourceror.Zipper.down(zipper)}
      _ ->
        case Sourceror.Zipper.right(zipper) do
          %Sourceror.Zipper{} = right -> find_do_block_in_children(right)
          _ -> {:error, "No do block"}
        end
    end
  end
  
  # Find a function definition
  defp find_function(block_zipper, function_name, arity) do
    # Traverse the children of the block to find the function
    find_function_in_children(Sourceror.Zipper.down(block_zipper), function_name, arity)
  end
  
  # Helper to look for function in children
  defp find_function_in_children(nil, _, _), do: {:error, "Not found"}
  defp find_function_in_children(zipper, function_name, arity) do
    case Sourceror.Zipper.node(zipper) do
      {:def, _, [{:when, _, [{^function_name, _, args} | _]} | _]} when length(args) == arity ->
        {:ok, zipper}
      {:def, _, [{^function_name, _, args} | _]} when length(args) == arity ->
        {:ok, zipper}
      _ ->
        # Try next sibling
        case Sourceror.Zipper.right(zipper) do
          %Sourceror.Zipper{} = right -> find_function_in_children(right, function_name, arity)
          _ -> {:error, "Function not found"}
        end
    end
  end
  
  # Helper to get function source for testing/fallback
  defp get_function_source(_module, function_name, arity) do
    # This is just a stub for testing - in production this would use proper code extraction
    """
    def #{function_name}(#{make_args(arity)}) do
      # Function body would be here
    end
    """
  end
  
  defp make_args(0), do: ""
  defp make_args(arity), do: Enum.map_join(1..arity, ", ", &"arg#{&1}")
  
  @doc """
  Analyzes source code to identify optimization opportunities.
  
  Parameters:
  - source_code - The source code to analyze
  - _context - Additional context for the analysis (currently unused)
  - options - Options for the analysis
  
  Returns:
  - A tuple with the result of the analysis
  """
  @spec analyze_source_code(String.t(), map(), keyword()) :: {:ok, map()} | {:error, any()}
  def analyze_source_code(source_code, _context, options \\ []) do
    # Extract options
    max_suggestions = Keyword.get(options, :max_suggestions, 5)
    focus_areas = Keyword.get(options, :focus_areas, [:performance, :readability, :maintainability])
    
    # Use a simple map for the response model
    response_model = %{
      opportunities: [],
      summary: ""
    }
    
    # Convert focus areas to string for prompt
    focus_str = Enum.map_join(focus_areas, ", ", &to_string/1)
    
    # Prepare system message
    sys_msg = """
    You are an expert Elixir code analyzer. Your task is to analyze the provided source code
    and identify optimization opportunities with a focus on #{focus_str}.
    For each opportunity, provide a clear description, location, severity, and rationale.
    """
    
    # Prepare user message
    user_msg = """
    Please analyze this Elixir code:
    
    ```elixir
    #{source_code}
    ```
    
    Find up to #{max_suggestions} optimization opportunities, focusing on #{focus_str}.
    
    For each opportunity, provide:
    1. description: A clear description of the opportunity
    2. type: The type of optimization (performance, readability, maintainability)
    3. location: Where in the code the optimization applies
    4. severity: The importance (high, medium, low)
    5. rationale: Why this optimization matters
    6. suggested_change: A code snippet showing the potential improvement
    """
    
    # Get analysis from LLM
    analysis_result = try do
      case InstructorHelper.gen(response_model, sys_msg, user_msg) do
        {:ok, result} -> 
          # Convert the map result to a proper structure
          opportunities = (result.opportunities || [])
            |> Enum.take(max_suggestions)
            |> Enum.map(fn opp ->
              # Create a map with default values for any missing fields
              %{
                description: Map.get(opp, :description, ""),
                type: Map.get(opp, :type, ""),
                location: Map.get(opp, :location, ""),
                severity: Map.get(opp, :severity, "medium"),
                rationale: Map.get(opp, :rationale, ""),
                suggested_change: Map.get(opp, :suggested_change, ""),
                timestamp: DateTime.utc_now(),
                id: generate_opportunity_id()
              }
            end)
            
          {:ok, opportunities}
        {:error, reason} ->
          Logger.error("Failed to analyze code with LLM: #{inspect(reason)}")
          {:error, reason}
      end
    rescue
      e ->
        Logger.error("Error during code analysis: #{inspect(e)}")
        {:error, inspect(e)}
    end
    
    analysis_result
  end
  
  @doc false
  # Reserved for future use to enrich opportunities with additional metadata
  defp enrich_opportunities(opportunities) do
    Enum.map(opportunities, fn opportunity ->
      opportunity
      |> Map.from_struct()
      |> Map.put(:timestamp, DateTime.utc_now())
      |> Map.put(:id, generate_opportunity_id())
    end)
  end
  
  # Generate a unique ID for each opportunity
  defp generate_opportunity_id do
    Base.encode16(:crypto.strong_rand_bytes(8), case: :lower)
  end
end
