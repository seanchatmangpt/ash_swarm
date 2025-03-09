# Test script using InstructorHelper from AshSwarm
# Run with: elixir -r lib/ash_swarm/instructor_helper.ex debug/test_instructor.exs

# Load required modules
Code.require_file("/Users/speed/ash_swarm/lib/ash_swarm/instructor_helper.ex")
Code.require_file("/Users/speed/ash_swarm/lib/ash_swarm/foundations/ai_code_analysis.ex")

# Get API key from environment
api_key = System.get_env("GROQ_API_KEY")

if is_nil(api_key) or api_key == "" do
  IO.puts("No GROQ_API_KEY found in environment.")
  System.halt(1)
end

IO.puts("Making test request to Groq API using InstructorHelper...")

# Sample code to analyze
sample_code = """
defmodule SlowOperations do
  @moduledoc \"\"\"
  Contains deliberately inefficient implementations for demonstration purposes.
  \"\"\"

  @doc \"\"\"
  Calculates the nth Fibonacci number using naive recursion.
  This implementation has exponential time complexity O(2^n).
  
  ## Examples
  
      iex> SlowOperations.fibonacci(10)
      55
  
  \"\"\"
  def fibonacci(0), do: 0
  def fibonacci(1), do: 1
  def fibonacci(n) when n > 1, do: fibonacci(n - 1) + fibonacci(n - 2)
end
"""

# Set up the response model like in AICodeAnalysis.analyze_source_code
response_model = %{
  opportunities: [],
  summary: ""
}

# Prepare system and user messages
sys_msg = """
You are an expert Elixir code analyzer. Your task is to analyze the provided source code
and identify optimization opportunities with a focus on performance, readability, maintainability.
For each opportunity, provide a clear description, location, severity, and rationale.
"""

user_msg = """
Please analyze this Elixir code:

```elixir
#{sample_code}
```

Find up to 5 optimization opportunities, focusing on performance, readability, maintainability.

For each opportunity, provide:
1. description: A clear description of the opportunity
2. type: The type of optimization (performance, readability, maintainability)
3. location: Where in the code the optimization applies
4. severity: The importance (high, medium, low)
5. rationale: Why this optimization matters
6. suggested_change: A code snippet showing the potential improvement
"""

IO.puts("===== Testing with response_model: text =====")
# First, try the default format used in the repo
res1 = AshSwarm.InstructorHelper.gen(response_model, sys_msg, user_msg)
IO.puts("Result: #{inspect(res1, pretty: true)}")

IO.puts("\n===== Testing with modified prompt to ensure JSON =====")
# Now try a modified prompt
sys_msg_json = sys_msg <> "\nIMPORTANT: You MUST return a JSON object with an 'opportunities' array containing all the optimization opportunities you find."
user_msg_json = user_msg <> "\n\nReturn your response as a JSON object with an 'opportunities' array containing these details."

res2 = AshSwarm.InstructorHelper.gen(response_model, sys_msg_json, user_msg_json)
IO.puts("Result: #{inspect(res2, pretty: true)}")

IO.puts("\n===== Testing with explicit response format =====")
# Now try forcing JSON response format at the API level
# This is done by modifying the InstructorHelper's try_groq_direct_call function dynamically
original_fun = :erlang.fun_info(AshSwarm.InstructorHelper, :try_groq_direct_call)
:code.purge(AshSwarm.InstructorHelper)
:code.delete(AshSwarm.InstructorHelper)

defmodule AshSwarm.InstructorHelper.Modified do
  def gen(response_model, sys_msg, user_msg, model \\ nil) do
    # Get the appropriate client and model
    {client, model_to_use} = AshSwarm.InstructorHelper.get_client_and_model(model)

    if client do
      IO.puts("[DEBUG] Using model: #{model_to_use}")
      IO.puts("[DEBUG] Client type: #{client.type}")
      IO.puts("[DEBUG] Response model: #{inspect(response_model)}")

      case client.type do
        :groq ->
          try_groq_direct_call(client, model_to_use, sys_msg, user_msg, response_model)
        _ ->
          {:error, "Only Groq testing is implemented"}
      end
    else
      {:error, "No suitable API client available"}
    end
  end

  def try_groq_direct_call(client, model, sys_msg, user_msg, response_model) do
    # Create messages array
    messages = [
      %{role: "system", content: sys_msg},
      %{role: "user", content: user_msg}
    ]

    # Prepare request body WITH JSON response format
    body =
      Jason.encode!(%{
        model: model,
        messages: messages,
        temperature: 0.2,
        response_format: %{type: "json_object"} # Explicitly request JSON
      })

    # Make HTTP request
    IO.puts("[DEBUG] Groq Request URL: #{client.api_url}")
    IO.puts("[DEBUG] Request body: #{body}")

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
      IO.puts("[DEBUG] Response status: #{response.status_code}")
      IO.puts("[DEBUG] Response body: #{response.body}")
      
      case response.status_code do
        200 ->
          # Try to parse JSON response
          case Jason.decode(response.body) do
            {:ok, json_response} ->
              content = get_in(json_response, ["choices", Access.at(0), "message", "content"])

              if content do
                IO.puts("[DEBUG] Content: #{String.slice(content, 0, 100)}")
                
                try do
                  # Try to parse content as JSON
                  case Jason.decode(content) do
                    {:ok, json_content} ->
                      # Convert keys to atoms and map to response model
                      result = map_to_struct(response_model, json_content)
                      {:ok, result}

                    {:error, decode_error} ->
                      IO.puts("[DEBUG] Content is not valid JSON: #{inspect(decode_error)}")
                      {:error, "Failed to decode content as JSON: #{inspect(decode_error)}"}
                  end
                rescue
                  e ->
                    IO.puts("[DEBUG] Error processing response content: #{inspect(e)}")
                    {:error, "Error processing response content: #{inspect(e)}"}
                end
              else
                IO.puts("[DEBUG] No content found in API response")
                {:error, "No content found in API response"}
              end

            {:error, decode_error} ->
              IO.puts("[DEBUG] Failed to decode JSON response: #{inspect(decode_error)}")
              {:error, "Failed to decode JSON response: #{inspect(decode_error)}"}
          end

        error_code ->
          IO.puts("[DEBUG] API request failed with status #{error_code}: #{response.body}")
          {:error, "API request failed with status #{error_code}: #{response.body}"}
      end
    rescue
      e ->
        IO.puts("[DEBUG] HTTP request error: #{inspect(e)}")
        {:error, "HTTP request error: #{inspect(e)}"}
    end
  end

  # Helper function to map JSON keys to struct keys
  defp map_to_struct(struct, json) when is_map(struct) and is_map(json) do
    # Convert JSON string keys to atoms and match with struct keys
    atomized = Map.new(json, fn
      {k, v} when is_binary(k) -> {String.to_atom(k), v}
      pair -> pair
    end)

    # Merge with struct, only keeping keys that exist in struct
    Map.merge(struct, Map.take(atomized, Map.keys(struct)))
  end
end

res3 = AshSwarm.InstructorHelper.Modified.gen(response_model, sys_msg, user_msg)
IO.puts("Result: #{inspect(res3, pretty: true)}")

IO.puts("\nTest complete.") 