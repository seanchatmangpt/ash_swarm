#!/usr/bin/env elixir

# List of files to fix
files = [
  "lib/ash_swarm/foundations/ai_code_analysis.ex",
  "lib/ash_swarm/foundations/ai_experiment_evaluation.ex",
  "lib/ash_swarm/foundations/ai_adaptation_strategies.ex",
  "lib/ash_swarm/instructor_helper.ex"
]

# Fix unused variable in ai_code_analysis.ex
ai_code_analysis = File.read!("lib/ash_swarm/foundations/ai_code_analysis.ex")
ai_code_analysis = String.replace(
  ai_code_analysis,
  "def analyze_source_code(source_code, context \\\\",
  "def analyze_source_code(source_code, _context \\\\"
)
File.write!("lib/ash_swarm/foundations/ai_code_analysis.ex", ai_code_analysis)
IO.puts("Fixed unused variable in ai_code_analysis.ex")

# Function to add @doc false properly
add_doc_false = fn file, function_name ->
  content = File.read!(file)
  
  # Check if the function exists
  if String.contains?(content, "defp #{function_name}") do
    # Add @doc false on its own line before the function
    regex = ~r/([ \t]*)defp #{function_name}/
    
    case Regex.run(regex, content, return: :index) do
      [{start_pos, _}] ->
        # Get the indentation
        {pre, _} = String.split_at(content, start_pos)
        indentation = String.slice(pre, -2, 2)
        
        # Insert @doc false with proper indentation
        {before, after_match} = String.split_at(content, start_pos)
        updated = before <> "#{indentation}@doc false\n#{indentation}defp #{function_name}"
        
        # Replace the first occurrence only
        {_, rest} = String.split_at(after_match, String.length("defp #{function_name}"))
        updated = updated <> rest
        
        File.write!(file, updated)
        IO.puts("Added @doc false to #{function_name} in #{file}")
        
      _ ->
        IO.puts("Could not find exact position for #{function_name} in #{file}")
    end
  else
    IO.puts("Function #{function_name} not found in #{file}")
  end
end

# Add @doc false to unused functions
add_doc_false.("lib/ash_swarm/foundations/ai_experiment_evaluation.ex", "process_evaluation_result")
add_doc_false.("lib/ash_swarm/foundations/ai_experiment_evaluation.ex", "generate_evaluation_id")
add_doc_false.("lib/ash_swarm/foundations/ai_adaptation_strategies.ex", "process_optimization_result")
add_doc_false.("lib/ash_swarm/foundations/ai_adaptation_strategies.ex", "get_module_source")
add_doc_false.("lib/ash_swarm/foundations/ai_adaptation_strategies.ex", "generate_optimization_id")
add_doc_false.("lib/ash_swarm/foundations/ai_code_analysis.ex", "enrich_opportunities")
add_doc_false.("lib/ash_swarm/instructor_helper.ex", "convert_to_simple_json_schema")

IO.puts("All files fixed")
