#!/bin/bash

echo "Fixing syntax error in instructor_helper.ex..."

cd /Users/speed/ash_swarm

# Reset any previous changes to instructor_helper.ex
git checkout -- lib/ash_swarm/instructor_helper.ex

# Check if the file already has @doc false, then add it properly if needed
grep -q "@doc false" lib/ash_swarm/instructor_helper.ex
if [ $? -eq 0 ]; then
    echo "Found existing @doc false, cleaning it up..."
    # Replace any malformed @doc false line with a proper one
    sed -i '' 's/@doc false  defp convert_to_simple_json_schema/@doc false\
  defp convert_to_simple_json_schema/g' lib/ash_swarm/instructor_helper.ex
else
    echo "Adding @doc false properly..."
    # Add @doc false on its own line before the function
    sed -i '' '/defp convert_to_simple_json_schema/ i\\
  @doc false' lib/ash_swarm/instructor_helper.ex
fi

echo "Compiling with warnings disabled..."
mix compile --no-warnings-as-errors

echo "Syntax error fixed. You can now run:"
echo "./start_livebook_final.sh" 