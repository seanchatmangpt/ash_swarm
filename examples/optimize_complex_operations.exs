# Script to demonstrate the Adaptive Code Evolution CLI tool
# Run this with:
#   mix run examples/optimize_complex_operations.exs

# Check if GROQ_API_KEY is set in the environment
if System.get_env("GROQ_API_KEY") == nil do
  IO.puts(IO.ANSI.red() <> "Error: GROQ_API_KEY environment variable is not set." <> IO.ANSI.reset())
  IO.puts("Please set it before running this script:")
  IO.puts("  export GROQ_API_KEY=your_groq_api_key")
  System.halt(1)
end

# Define the command
command = "mix ash_swarm.adaptive.evolve --model llama3-8b-8192 --output lib/ash_swarm/examples/optimized_complex_operations.ex lib/ash_swarm/examples/complex_operations.ex"

# Print informational message
IO.puts(IO.ANSI.cyan() <> "Running Adaptive Code Evolution on complex_operations.ex" <> IO.ANSI.reset())
IO.puts("Command: #{command}")

# Execute the command
System.cmd("sh", ["-c", command], into: IO.stream(:stdio, :line))

IO.puts(IO.ANSI.green() <> "\nDone!" <> IO.ANSI.reset())
IO.puts("Check lib/ash_swarm/examples/optimized_complex_operations.ex for the optimized code.")
