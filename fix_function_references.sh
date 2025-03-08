#!/bin/bash

# Script to fix the references to evaluate_experiment vs evaluate_ai_experiment
echo "Fixing function references in the AshSwarm codebase..."

cd /Users/speed/ash_swarm

# Check which approach should be used
echo "Do you want to:"
echo "1) Change evaluate_ai_experiment back to evaluate_experiment (easier fix)"
echo "2) Update all references to use evaluate_ai_experiment (more involved)"
read -p "Enter your choice (1 or 2): " choice

if [ "$choice" = "1" ]; then
    echo "Changing function name back to evaluate_experiment..."
    
    # Replace evaluate_ai_experiment with evaluate_experiment in ai_experiment_evaluation.ex
    sed -i '' 's/evaluate_ai_experiment/evaluate_experiment/g' lib/ash_swarm/foundations/ai_experiment_evaluation.ex
    
    echo "Function renamed back to original name."
    
elif [ "$choice" = "2" ]; then
    echo "Updating all references to use evaluate_ai_experiment..."
    
    # Find and update references in ai_adaptive_evolution_example.ex
    sed -i '' 's/evaluator_function: :evaluate_experiment/evaluator_function: :evaluate_ai_experiment/g' lib/ash_swarm/examples/ai_adaptive_evolution_example.ex
    
    echo "References updated to use new function name."
    
else
    echo "Invalid choice. Please run the script again and enter 1 or 2."
    exit 1
fi

echo "Compiling to verify changes..."
mix compile --no-warnings-as-errors

echo "Fix complete. If no errors were shown, function references have been addressed."
echo "Note: You may still see some unused function warnings, but these should not block compilation now." 