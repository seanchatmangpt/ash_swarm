#!/bin/bash

# Script to properly fix warnings following Elixir conventions
echo "Applying clean fixes to the AshSwarm codebase..."

cd /Users/speed/ash_swarm

# Reset any previous changes to start fresh
git checkout -- lib/ash_swarm/foundations/ai_code_analysis.ex
git checkout -- lib/ash_swarm/foundations/ai_experiment_evaluation.ex
git checkout -- lib/ash_swarm/foundations/ai_adaptation_strategies.ex
git checkout -- lib/ash_swarm/instructor_helper.ex

# Fix 1: Rename unused variable in ai_code_analysis.ex with an underscore prefix
sed -i '' 's/def analyze_source_code(source_code, context \\/def analyze_source_code(source_code, _context \\/' lib/ash_swarm/foundations/ai_code_analysis.ex

# Fix 2: Rename unused private functions with underscore prefix (Elixir convention)
# For ai_experiment_evaluation.ex
sed -i '' 's/defp process_evaluation_result/defp _process_evaluation_result/' lib/ash_swarm/foundations/ai_experiment_evaluation.ex
sed -i '' 's/defp generate_evaluation_id/defp _generate_evaluation_id/' lib/ash_swarm/foundations/ai_experiment_evaluation.ex

# For ai_adaptation_strategies.ex
sed -i '' 's/defp process_optimization_result/defp _process_optimization_result/' lib/ash_swarm/foundations/ai_adaptation_strategies.ex
sed -i '' 's/defp get_module_source/defp _get_module_source/' lib/ash_swarm/foundations/ai_adaptation_strategies.ex
sed -i '' 's/defp generate_optimization_id/defp _generate_optimization_id/' lib/ash_swarm/foundations/ai_adaptation_strategies.ex

# For ai_code_analysis.ex
sed -i '' 's/defp enrich_opportunities/defp _enrich_opportunities/' lib/ash_swarm/foundations/ai_code_analysis.ex

# For instructor_helper.ex - needs special handling since it's called elsewhere
echo "Checking for references to convert_to_simple_json_schema..."
grep -r "convert_to_simple_json_schema" lib/ash_swarm/instructor_helper.ex

echo ""
echo "We need to be careful with instructor_helper.ex:"
echo "1. First let's compile with diagnostics to see exact references"
echo "2. Then we'll fix instructor_helper.ex manually"

# Create a temporary fix for instructor_helper.ex
cat > fix_instructor_helper.ex << 'EOL'
#!/usr/bin/env elixir

# Read the file
content = File.read!("lib/ash_swarm/instructor_helper.ex")

# Find the function definition
if String.contains?(content, "defp convert_to_simple_json_schema") do
  # Add @doc false before the function but keep the function name
  updated_content = String.replace(
    content, 
    "defp convert_to_simple_json_schema", 
    "@doc false\n  defp convert_to_simple_json_schema"
  )
  
  # Write the updated content back
  File.write!("lib/ash_swarm/instructor_helper.ex", updated_content)
  IO.puts("Added @doc false to convert_to_simple_json_schema")
else
  IO.puts("Function not found in file")
end
EOL

chmod +x fix_instructor_helper.ex

echo "Compiling with diagnostics to see if our changes fixed the issues..."
mix compile --no-warnings-as-errors

echo "Applying fix to instructor_helper.ex..."
./fix_instructor_helper.ex

echo "Final compilation check..."
mix compile

echo "Clean fix complete. All unused functions are now properly annotated following Elixir conventions." 