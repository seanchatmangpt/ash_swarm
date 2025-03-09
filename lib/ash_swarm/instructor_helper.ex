defmodule AshSwarm.InstructorHelper do
  @moduledoc """
  A helper module for interacting with Instructor.

  Provides a function `gen/4` which wraps the call to Instructor.chat_completion.
  """
  require Logger

  # Get the instructor helper module to use (allows for mocking in tests)
  @instructor_helper_module Application.compile_env(
                              :ash_swarm,
                              :instructor_helper_module,
                              __MODULE__
                            )

  @doc """
  Generates a completion using Instructor.

  ## Parameters

  * `response_model` - The model/struct to cast the response into
  * `sys_msg` - The system message for the AI
  * `user_msg` - The user message/prompt
  * `model` - Optional model to use

  ## Returns

  * `{:ok, result}` - The parsed result on success
  * `{:error, reason}` - Error information
  """
  @spec gen(map() | struct(), String.t(), String.t(), String.t() | nil) ::
          {:ok, any()} | {:error, any()}
  def gen(response_model, sys_msg, user_msg, model \\ nil) do
    # If we're not using this module directly (i.e., we're using a mock),
    # delegate to the appropriate module
    if @instructor_helper_module != __MODULE__ do
      apply(@instructor_helper_module, :gen, [response_model, sys_msg, user_msg, model])
    else
      # Use the original implementation
      do_gen(response_model, sys_msg, user_msg, model)
    end
  end

  # The original implementation
  @spec do_gen(map() | struct(), String.t(), String.t(), String.t() | nil) ::
          {:ok, any()} | {:error, any()}
  defp do_gen(response_model, sys_msg, user_msg, model) do
    # Get the appropriate client and model
    {client, model_to_use} = get_client_and_model(model)

    if client do
      Logger.debug("[DEBUG] Using model: #{model_to_use}")
      Logger.debug("[DEBUG] Client type: #{client.type}")
      Logger.debug("[DEBUG] Response model: #{inspect(response_model)}")

      case client.type do
        :groq ->
          try_groq_direct_call(client, model_to_use, sys_msg, user_msg, response_model)

        :openai ->
          try_openai_direct_call(client, model_to_use, sys_msg, user_msg, response_model)

        :gemini ->
          Logger.error("Gemini API not yet implemented")
          {:error, "Gemini API not implemented"}

        _ ->
          Logger.error("Unsupported client type: #{client.type}")
          {:error, "Unsupported client type: #{client.type}"}
      end
    else
      Logger.error("No suitable API client available - check your API key environment variables")
      {:error, "No suitable API client available - check your API key environment variables"}
    end
  end

  # Helper for calling Groq API directly
  defp try_groq_direct_call(client, model, sys_msg, user_msg, response_model) do
    # Create messages array
    messages = [
      %{role: "system", content: sys_msg},
      %{role: "user", content: user_msg}
    ]

    # Prepare request body
    body =
      Jason.encode!(%{
        model: model,
        messages: messages,
        temperature: 0.2,
        response_format: %{type: "text"}
      })

    # Make HTTP request
    Logger.debug("Groq Request URL: #{client.api_url}")

    try do
      response =
        HTTPoison.post!(
          client.api_url,
          body,
          [
            {"Content-Type", "application/json"},
            {"Authorization", "Bearer #{client.api_key}"}
          ]
        )

      # Parse response
      case response.status_code do
        200 ->
          # Try to parse JSON response
          case Jason.decode(response.body) do
            {:ok, json_response} ->
              content = get_in(json_response, ["choices", Access.at(0), "message", "content"])

              if content do
                try do
                  # Try to parse content as JSON first
                  case Jason.decode(content) do
                    {:ok, json_content} ->
                      # Convert keys to atoms and map to response model
                      result = map_to_struct(response_model, json_content)
                      {:ok, result}

                    {:error, _} ->
                      # If content is not JSON, extract data using regex for structured responses
                      result = process_non_json_content(content, response_model)
                      {:ok, result}
                  end
                rescue
                  e ->
                    Logger.error("Error processing response content: #{inspect(e)}")

                    # Fallback to regex extraction for EvaluationResponse
                    result = process_non_json_content(content, response_model)
                    {:ok, result}
                end
              else
                Logger.error("No content found in API response")
                {:error, "No content found in API response"}
              end

            {:error, decode_error} ->
              Logger.debug("Failed to decode JSON response: #{inspect(decode_error)}")

              # Try to extract useful data from the string response
              result = process_non_json_content(response.body, response_model)
              {:ok, result}
          end

        error_code ->
          Logger.error("API request failed with status #{error_code}: #{response.body}")
          {:error, "API request failed with status #{error_code}: #{response.body}"}
      end
    rescue
      e ->
        Logger.error("HTTP request error: #{inspect(e)}")
        {:error, "HTTP request error: #{inspect(e)}"}
    end
  end

  # Helper for calling OpenAI API directly
  defp try_openai_direct_call(client, model, sys_msg, user_msg, response_model) do
    # Create messages array
    messages = [
      %{role: "system", content: sys_msg},
      %{role: "user", content: user_msg}
    ]

    # Prepare request body
    body =
      Jason.encode!(%{
        model: model,
        messages: messages,
        temperature: 0.2,
        response_format: %{type: "json_object"}
      })

    # Make HTTP request
    Logger.debug(
      "OpenAI Request URL: #{client.api_url || "https://api.openai.com/v1/chat/completions"}"
    )

    try do
      response =
        HTTPoison.post!(
          client.api_url || "https://api.openai.com/v1/chat/completions",
          body,
          [
            {"Content-Type", "application/json"},
            {"Authorization", "Bearer #{client.api_key}"}
          ]
        )

      # Parse response
      case response.status_code do
        200 ->
          # Try to parse JSON response
          case Jason.decode(response.body) do
            {:ok, json_response} ->
              content = get_in(json_response, ["choices", Access.at(0), "message", "content"])

              if content do
                try do
                  # Try to parse content as JSON
                  case Jason.decode(content) do
                    {:ok, json_content} ->
                      # Convert keys to atoms and map to response model
                      result = map_to_struct(response_model, json_content)
                      {:ok, result}

                    {:error, decode_error} ->
                      Logger.error("Failed to decode JSON content: #{inspect(decode_error)}")
                      {:error, "Failed to decode JSON content: #{inspect(decode_error)}"}
                  end
                rescue
                  e ->
                    Logger.error("Error processing response content: #{inspect(e)}")
                    {:error, "Error processing response content: #{inspect(e)}"}
                end
              else
                Logger.error("No content found in API response")
                {:error, "No content found in API response"}
              end

            {:error, decode_error} ->
              Logger.error("Failed to decode JSON response: #{inspect(decode_error)}")
              {:error, "Failed to decode JSON response: #{inspect(decode_error)}"}
          end

        error_code ->
          Logger.error("API request failed with status #{error_code}: #{response.body}")
          {:error, "API request failed with status #{error_code}: #{response.body}"}
      end
    rescue
      e ->
        Logger.error("HTTP request error: #{inspect(e)}")
        {:error, "HTTP request error: #{inspect(e)}"}
    end
  end

  # Process non-JSON content to extract structured data
  defp process_non_json_content(content, response_model) do
    alias AshSwarm.Foundations.AIExperimentEvaluation.{EvaluationResponse, Evaluation}

    case response_model do
      %EvaluationResponse{} ->
        # Extract success rating (look for numbers between 0-1 following success rating pattern)
        success_rating =
          case Regex.run(~r/Success Rating:\s*(0\.[0-9]+|[01])/i, content) do
            [_, rating] ->
              {float_val, _} = Float.parse(String.trim(rating))
              float_val

            _ ->
              # Try alternative format with ** markdown
              case Regex.run(~r/\*\*Success Rating:\*\*\s*(0\.[0-9]+|[01])/i, content) do
                [_, rating] ->
                  {float_val, _} = Float.parse(String.trim(rating))
                  float_val

                # Default value
                _ ->
                  0.5
              end
          end

        # Extract recommendation
        recommendation =
          case Regex.run(~r/Recommendation:\s*([^\n\.]+)/i, content) do
            [_, rec] ->
              String.trim(rec)

            _ ->
              # Try with ** markdown
              case Regex.run(~r/\*\*Recommendation:\*\*\s*([^\n\.]+)/i, content) do
                [_, rec] -> String.trim(rec)
                _ -> "Needs further evaluation"
              end
          end

        # Extract risks (look for numbered lists after Key Risks section)
        risks_text =
          case Regex.run(~r/Key Risks:(.+?)(?=Improvement Areas:|$)/si, content) do
            [_, risks_section] ->
              risks_section

            _ ->
              case Regex.run(~r/\*\*Key Risks:\*\*(.+?)(?=\*\*Improvement Areas:|$)/si, content) do
                [_, risks_section] -> risks_section
                _ -> ""
              end
          end

        risks = extract_numbered_items(risks_text)

        # Extract improvement areas
        areas_text =
          case Regex.run(~r/Improvement Areas:(.+?)(?=\n\n|$)/si, content) do
            [_, areas_section] ->
              areas_section

            _ ->
              case Regex.run(~r/\*\*Improvement Areas:\*\*(.+?)(?=\n\n|$)/si, content) do
                [_, areas_section] -> areas_section
                _ -> ""
              end
          end

        improvement_areas = extract_numbered_items(areas_text)

        # Create evaluation struct
        evaluation = %Evaluation{
          success_rating: success_rating,
          recommendation: recommendation,
          risks: if(Enum.empty?(risks), do: ["No specific risks identified"], else: risks),
          improvement_areas:
            if(Enum.empty?(improvement_areas),
              do: ["No specific improvement areas identified"],
              else: improvement_areas
            )
        }

        # Return evaluation response
        %EvaluationResponse{
          explanation: content,
          evaluation: evaluation
        }

      # Add case for optimization response model (map with keys)
      response_model when is_map(response_model) and map_size(response_model) > 0 ->
        try do
          Logger.debug("Trying to extract optimization data from raw text response")

          # Extract optimized code (look for elixir code blocks)
          optimized_code =
            case Regex.run(~r/```elixir\s*\n([\s\S]*?)\n```/m, content) do
              [_, code] ->
                String.trim(code)

              _ ->
                # Try without language specified
                case Regex.run(~r/```\s*\n([\s\S]*?)\n```/m, content) do
                  [_, code] -> String.trim(code)
                  _ -> "# Failed to extract optimized code"
                end
            end

          # Extract explanation - use everything that isn't in code blocks
          explanation_text =
            content
            |> String.replace(~r/```[\s\S]*?```/m, "")
            |> String.trim()

          # Try to find the documentation section (if it exists)
          documentation =
            case Regex.run(
                   ~r/Documentation:\s*\n\n([\s\S]*?)(?=\n\nExpected improvements:|Expected Improvements:|$)/im,
                   explanation_text
                 ) do
              [_, docs] ->
                String.trim(docs)

              _ ->
                # Try another pattern that looks for "Documentation for the optimized code:"
                case Regex.run(
                       ~r/Documentation for the optimized code:\s*\n\n([\s\S]*?)(?=\n\nExpected Improvements|\n\nExpected benefits|\n\n\*\*Expected|\n\nEvaluating|$)/im,
                       explanation_text
                     ) do
                  [_, docs] ->
                    String.trim(docs)

                  _ ->
                    # Look for a documentation section starting with a heading
                    case Regex.run(
                           ~r/Documentation:?\s*\n\n([\s\S]*?)(?=\n\nUsage instructions:?|Expected improvements:|$)/im,
                           explanation_text
                         ) do
                      [_, docs] ->
                        # Check if we also have usage instructions to append
                        usage =
                          case Regex.run(
                                 ~r/Usage instructions:?\s*\n\n([\s\S]*?)(?=\n\nNote:|Expected Improvements:|Expected improvements:|$)/im,
                                 explanation_text
                               ) do
                            [_, usage_text] ->
                              "\n\nUsage Instructions:\n\n" <> String.trim(usage_text)

                            _ ->
                              ""
                          end

                        String.trim(docs) <> usage

                      _ ->
                        # Enhanced documentation extraction for complex code patterns
                        extract_documentation_from_complex_code(explanation_text)
                    end
                end
            end

          # Try to extract performance improvement
          performance =
            case Regex.run(~r/[Pp]erformance(?:[^:]*):([^.\n]+)/, content) do
              [_, perf] -> String.trim(perf)
              _ -> "No specific performance improvement metrics provided"
            end

          # Try to extract maintainability
          maintainability =
            case Regex.run(~r/[Mm]aintainability(?:[^:]*):([^.\n]+)/, content) do
              [_, maint] -> String.trim(maint)
              _ -> "No specific maintainability assessment provided"
            end

          # Try to extract safety
          safety =
            case Regex.run(~r/[Ss]afety(?:[^:]*):([^.\n]+)/, content) do
              [_, safe] -> String.trim(safe)
              _ -> "No specific safety assessment provided"
            end

          # Create the map with the same structure as the response model
          Map.merge(response_model, %{
            optimized_code: optimized_code,
            explanation: explanation_text,
            documentation: documentation,
            expected_improvements: %{
              performance: performance,
              maintainability: maintainability,
              safety: safety
            }
          })
        rescue
          e ->
            Logger.error("Error extracting optimization data from raw text: #{inspect(e)}")
            # Return the error in the same structure as the input model
            # This allows us to check for the error key in the caller
            %{error: "Failed to parse optimization response: #{inspect(e)}"}
        end

      # Default case for unsupported response models
      _ ->
        Logger.error(
          "Unsupported response model for non-JSON content: #{inspect(response_model)}"
        )

        %{error: "Failed to parse non-JSON response for the specified model"}
    end
  end

  # Helper function to extract numbered items from text
  defp extract_numbered_items(text) do
    # Look for numbered list items (both 1. and 1) formats)
    items = Regex.scan(~r/\d+[\.\)]\s*([^\n]+)/, text)

    case items do
      [] -> []
      _ -> Enum.map(items, fn [_, item] -> String.trim(item) end)
    end
  end

  # Enhanced documentation extraction for complex code patterns
  defp extract_documentation_from_complex_code(text) do
    # Try to extract documentation from a variety of patterns

    # Pattern 1: Function-specific documentation (e.g., "@doc" style comments)
    function_docs = extract_function_documentation(text)

    # Pattern 2: Module-level documentation
    module_doc = extract_module_documentation(text)

    # Pattern 3: API usage examples
    examples = extract_usage_examples(text)

    # Pattern 4: Look for any explanation of algorithms or data structures
    algorithm_explanations = extract_algorithm_explanations(text)

    # Combine all extracted documentation
    [
      if(function_docs != "",
        do: "Function Documentation:\n\n" <> function_docs <> "\n\n",
        else: ""
      ),
      if(module_doc != "", do: "Module Documentation:\n\n" <> module_doc <> "\n\n", else: ""),
      if(examples != "", do: "Usage Examples:\n\n" <> examples <> "\n\n", else: ""),
      if(algorithm_explanations != "",
        do: "Algorithm Explanations:\n\n" <> algorithm_explanations,
        else: ""
      )
    ]
    |> Enum.join()
    |> String.trim()
  end

  # Extract function-specific documentation from text
  defp extract_function_documentation(text) do
    # Pattern 1: Look for function doc comments
    initial_docs =
      Regex.scan(~r/Function: `([^`]+)`[\s\n]*[\-\*] Description: (.*?)(?=\n\n|\Z)/s, text)

    # Pattern 2: Look for function annotations
    docs =
      if initial_docs == [] do
        Regex.scan(~r/@doc\s*"""([\s\S]*?)"""[\s\S]*?def (\w+)/m, text)
        |> Enum.map(fn [match, doc, func_name] -> [match, func_name, String.trim(doc)] end)
      else
        initial_docs
      end

    # Pattern 3: Look for markdown style function documentation
    final_docs =
      if docs == [] do
        Regex.scan(~r/## `(\w+)(?:\(.*?\))?`[\s\n]+(.*?)(?=\n##|\Z)/s, text)
      else
        docs
      end

    # Format the extracted documentation
    final_docs
    |> Enum.map(fn [_match, func, desc] -> "- `#{func}`: #{String.trim(desc)}" end)
    |> Enum.join("\n")
  end

  # Extract module-level documentation from text
  defp extract_module_documentation(text) do
    # Look for module documentation
    case Regex.run(~r/Module Documentation:[\s\n]+(.*?)(?=\n\n|\Z)/s, text) do
      [_, doc] ->
        String.trim(doc)

      _ ->
        # Try another pattern
        case Regex.run(~r/@moduledoc\s*"""([\s\S]*?)"""/m, text) do
          [_, doc] ->
            String.trim(doc)

          _ ->
            # Try another pattern
            case Regex.run(~r/## Module Overview[\s\n]+(.*?)(?=\n##|\Z)/s, text) do
              [_, doc] -> String.trim(doc)
              _ -> ""
            end
        end
    end
  end

  # Extract usage examples from text
  defp extract_usage_examples(text) do
    # Look for code examples
    initial_examples = Regex.scan(~r/Example [Uu]sage:[\s\n]*```(?:elixir)?([\s\S]*?)```/m, text)

    # If not found, try another pattern
    interim_examples =
      if initial_examples == [] do
        Regex.scan(~r/## Examples?[\s\n]*```(?:elixir)?([\s\S]*?)```/m, text)
      else
        initial_examples
      end

    # If still not found, try another pattern
    final_examples =
      if interim_examples == [] do
        Regex.scan(~r/```elixir([\s\S]*?)```/m, text)
      else
        interim_examples
      end

    final_examples
    |> Enum.map(fn [_match, code] -> "```elixir\n#{String.trim(code)}\n```" end)
    |> Enum.join("\n\n")
  end

  # Extract algorithm explanations from text
  defp extract_algorithm_explanations(text) do
    # Look for algorithm explanations
    case Regex.run(~r/Algorithm (?:Details|Explanation):[\s\n]+(.*?)(?=\n\n|\Z)/s, text) do
      [_, explanation] ->
        String.trim(explanation)

      _ ->
        # Try another pattern
        case Regex.run(~r/## (?:Implementation|Algorithm) Details[\s\n]+(.*?)(?=\n##|\Z)/s, text) do
          [_, explanation] ->
            String.trim(explanation)

          _ ->
            # Try to find paragraphs that mention algorithms
            case Regex.scan(
                   ~r/\b(?:algorithm|implementation|approach|method|technique|strategy)\b.*?(?:\.|$)/i,
                   text
                 ) do
              [] ->
                ""

              matches ->
                matches
                |> Enum.map(fn [match] -> "- " <> String.trim(match) end)
                |> Enum.join("\n")
            end
        end
    end
  end

  # Helper function to get the appropriate client and model based on available API keys
  defp get_client_and_model(requested_model) do
    # Default models
    default_groq_model = "llama3-70b-8192"
    default_openai_model = "gpt-3.5-turbo"
    default_gemini_model = "gemini-1.0-pro"

    # Try to get a client in order of preference
    groq_key = System.get_env("GROQ_API_KEY")
    openai_key = System.get_env("OPENAI_API_KEY")
    gemini_key = System.get_env("GEMINI_API_KEY")

    cond do
      # If a specific model was requested, try to determine which client to use
      requested_model != nil ->
        client =
          cond do
            String.starts_with?(requested_model, "llama") ||
                String.starts_with?(requested_model, "mixtral") ->
              if groq_key && groq_key != "",
                do: %{
                  type: :groq,
                  api_key: groq_key,
                  api_url: "https://api.groq.com/openai/v1/chat/completions"
                },
                else: nil

            String.starts_with?(requested_model, "gpt") ->
              if openai_key && openai_key != "",
                do: %{
                  type: :openai,
                  api_key: openai_key,
                  api_url: "https://api.openai.com/v1/chat/completions"
                },
                else: nil

            String.starts_with?(requested_model, "gemini") ->
              if gemini_key && gemini_key != "",
                do: %{
                  type: :gemini,
                  api_key: gemini_key,
                  api_url:
                    "https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent"
                },
                else: nil

            true ->
              Logger.warning(
                "Unknown model prefix: #{requested_model}, trying to find any available client"
              )

              # Fall back to any available client
              cond do
                groq_key && groq_key != "" ->
                  %{
                    type: :groq,
                    api_key: groq_key,
                    api_url: "https://api.groq.com/openai/v1/chat/completions"
                  }

                openai_key && openai_key != "" ->
                  %{
                    type: :openai,
                    api_key: openai_key,
                    api_url: "https://api.openai.com/v1/chat/completions"
                  }

                gemini_key && gemini_key != "" ->
                  %{
                    type: :gemini,
                    api_key: gemini_key,
                    api_url:
                      "https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent"
                  }

                true ->
                  nil
              end
          end

        {client, requested_model}

      # Otherwise, use available clients in order of preference with their default models
      groq_key && groq_key != "" ->
        {%{
           type: :groq,
           api_key: groq_key,
           api_url: "https://api.groq.com/openai/v1/chat/completions"
         }, default_groq_model}

      openai_key && openai_key != "" ->
        {%{
           type: :openai,
           api_key: openai_key,
           api_url: "https://api.openai.com/v1/chat/completions"
         }, default_openai_model}

      gemini_key && gemini_key != "" ->
        {%{
           type: :gemini,
           api_key: gemini_key,
           api_url:
             "https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent"
         }, default_gemini_model}

      true ->
        {nil, nil}
    end
  end

  @doc false
  # For future use - converts module to simple JSON schema
  # defp convert_to_simple_json_schema(model) do
  #   cond do
  #     is_map(model) ->
  #       # For maps, create a schema for each field
  #       properties =
  #         Enum.map(model, fn {key, value} ->
  #           {to_string(key), convert_to_simple_json_schema(value)}
  #         end)
  #         |> Enum.into(%{})

  #       %{
  #         "type" => "object",
  #         "properties" => properties,
  #         "required" => Enum.map(Map.keys(model), &to_string/1)
  #       }

  #     is_list(model) and length(model) > 0 ->
  #       # For non-empty lists, use the first item as a template
  #       item_schema = convert_to_simple_json_schema(List.first(model))

  #       %{
  #         "type" => "array",
  #         "items" => item_schema
  #       }

  #     is_list(model) ->
  #       # For empty lists, use a generic array
  #       %{
  #         "type" => "array",
  #         "items" => %{"type" => "object"}
  #       }

  #     is_binary(model) ->
  #       %{"type" => "string"}

  #     is_integer(model) ->
  #       %{"type" => "integer"}

  #     is_float(model) ->
  #       %{"type" => "number"}

  #     is_boolean(model) ->
  #       %{"type" => "boolean"}

  #     is_nil(model) ->
  #       %{"type" => "null"}

  #     is_struct(model) ->
  #       # For structs, convert to map first
  #       model
  #       |> Map.from_struct()
  #       |> convert_to_simple_json_schema()

  #     true ->
  #       # Default fallback
  #       %{"type" => "string"}
  #   end
  # end

  def api_keys_present? do
    %{
      groq: System.get_env("GROQ_API_KEY"),
      openai: System.get_env("OPENAI_API_KEY"),
      anthropic: System.get_env("ANTHROPIC_API_KEY")
    }
    |> Enum.any?(fn {_k, v} -> v != nil and v != "" end)
  end

  def groq_api_key_present? do
    key = System.get_env("GROQ_API_KEY")
    key != nil and key != ""
  end

  # Helper to recursively map a JSON map to a struct
  defp map_to_struct(struct_type, map) when is_struct(struct_type) and is_map(map) do
    # Extract the struct module
    module = struct_type.__struct__

    # Get the struct fields
    struct_fields = module.__struct__() |> Map.keys() |> MapSet.new()

    # Filter the map to only include keys that exist in the struct
    filtered_map =
      map
      |> Enum.filter(fn {key, _value} ->
        string_key = if is_atom(key), do: key, else: String.to_existing_atom(key)
        MapSet.member?(struct_fields, string_key)
      end)
      |> Enum.into(%{})

    # Convert string keys to atoms if needed
    atom_map =
      filtered_map
      |> Enum.map(fn {key, value} ->
        atom_key = if is_atom(key), do: key, else: String.to_existing_atom(key)
        {atom_key, value}
      end)
      |> Enum.into(%{})

    # Create a new struct with the filtered values
    struct(module, atom_map)
  end

  # Handle the case when the first argument is not a struct
  defp map_to_struct(_non_struct, map) do
    # Just return the map as is
    map
  end
end
