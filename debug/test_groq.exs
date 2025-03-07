# Test script to debug Groq API response
# Run with: elixir debug/test_groq.exs

# Get API key from environment or extract from Livebook
api_key = System.get_env("GROQ_API_KEY")

if is_nil(api_key) or api_key == "" do
  IO.puts("No GROQ_API_KEY found in environment. Trying to extract from Livebook...")
  
  livebook_path = "/Users/speed/ash_swarm/livebooks/1_introduction_to_adaptive_code_evolution.livemd"
  if File.exists?(livebook_path) do
    livebook_content = File.read!(livebook_path)
    # Find the key in the Livebook
    case Regex.run(~r/GROQ_API_KEY"[^"]*"([^"]+)"/, livebook_content) do
      [_, extracted_key] -> 
        IO.puts("Found API key in Livebook!")
        api_key = extracted_key
      _ ->
        IO.puts("Could not extract API key from Livebook.")
        System.halt(1)
    end
  else
    IO.puts("Livebook file not found.")
    System.halt(1)
  end
end

# Set up HTTP client (HTTPoison should be installed)
Mix.install([:httpoison, :jason])

IO.puts("Making test request to Groq API...")

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

# Create messages array
system_message = "You are an expert Elixir code analyzer. Your task is to analyze the provided source code and identify optimization opportunities with a focus on performance, readability, maintainability. IMPORTANT: You MUST return a JSON object that includes an 'opportunities' array with optimization suggestions."
user_message = """
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

Return your response as a JSON object with an 'opportunities' array containing these details.
"""

messages = [
  %{role: "system", content: system_message},
  %{role: "user", content: user_message}
]

# Test with different response formats
test_formats = [
  {"text (current setting)", %{type: "text"}},
  {"json_object (alternative)", %{type: "json_object"}}
]

for {format_name, format_setting} <- test_formats do
  IO.puts("\n\n==== Testing with response_format: #{format_name} ====\n")
  
  # Prepare request body
  body = Jason.encode!(%{
    model: "llama3-70b-8192",
    messages: messages,
    temperature: 0.2,
    response_format: format_setting
  })

  # Make HTTP request
  try do
    response = HTTPoison.post!(
      "https://api.groq.com/openai/v1/chat/completions",
      body,
      [
        {"Content-Type", "application/json"},
        {"Authorization", "Bearer #{api_key}"}
      ]
    )

    # Save full response to file
    file_path = "debug/groq_response_#{format_name}.json"
    File.write!(file_path, response.body)
    IO.puts("Full response saved to #{file_path}")

    # Parse response
    case Jason.decode(response.body) do
      {:ok, json_response} ->
        content = get_in(json_response, ["choices", Access.at(0), "message", "content"])
        
        if content do
          content_preview = String.slice(content, 0, 200) <> "..."
          IO.puts("Content preview: #{content_preview}")
          
          # Try to parse content as JSON
          case Jason.decode(content) do
            {:ok, parsed_json} ->
              IO.puts("Content is valid JSON. Sample content:")
              IO.inspect(parsed_json, limit: 2)
              
              # Check for opportunities
              opportunities = Map.get(parsed_json, "opportunities", [])
              IO.puts("Number of opportunities found: #{length(opportunities)}")
              
              # Print first opportunity if present
              if length(opportunities) > 0 do
                IO.puts("\nFirst opportunity details:")
                IO.inspect(Enum.at(opportunities, 0), pretty: true)
              end
              
            {:error, decode_error} ->
              IO.puts("Content is not valid JSON: #{inspect(decode_error)}")
              
              # Check for specific text patterns that might suggest opportunities
              if String.contains?(content, "optimization") or String.contains?(content, "opportunity") do
                IO.puts("\nDetected opportunity-related content in non-JSON response. Here's a preview:")
                
                # Try to extract structured data manually using regex
                opportunity_sections = Regex.scan(~r/(?:Optimization|Opportunity) \d+[^\n]*\n\n([\s\S]+?)(?=\n\n(?:Optimization|Opportunity) \d+|\Z)/, content)
                
                if length(opportunity_sections) > 0 do
                  IO.puts("Found #{length(opportunity_sections)} opportunity sections")
                  IO.puts("\nFirst opportunity section:")
                  IO.puts(Enum.at(Enum.at(opportunity_sections, 0), 1))
                end
              end
          end
        else
          IO.puts("No content found in response")
        end

      {:error, decode_error} ->
        IO.puts("Failed to decode response: #{inspect(decode_error)}")
    end
  rescue
    e -> IO.puts("Error making request: #{inspect(e)}")
  end
end

IO.puts("\nTest complete. Check debug directory for full responses.") 