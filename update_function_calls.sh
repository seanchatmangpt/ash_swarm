#!/bin/bash

# Script to update function calls from evaluate_ai_experiment to evaluate_experiment
echo "Updating function calls in the AshSwarm codebase..."

cd /Users/speed/ash_swarm

# Update the calls in demo.ex
echo "Updating calls in demo.ex..."
sed -i '' 's/evaluate_ai_experiment/evaluate_experiment/g' lib/ash_swarm/demo.ex

# Update the calls in ai_adaptive_evolution_example.ex
echo "Updating calls in ai_adaptive_evolution_example.ex..."
sed -i '' 's/evaluate_ai_experiment/evaluate_experiment/g' lib/ash_swarm/examples/ai_adaptive_evolution_example.ex

echo "Function calls updated. Compiling to verify changes..."
mix compile

echo "Fix complete. If no errors were shown, all function calls have been updated successfully." 