defmodule Mix.Tasks.AshSwarm.Adaptive.Evolve do
  @moduledoc """
  Optimizes code using the Adaptive Code Evolution pattern.

  This Mix task provides a command-line interface to the AshSwarm
  Adaptive Code Evolution functionality, allowing users to optimize
  code files using AI-powered optimization strategies.

  ## Usage

      mix ash_swarm.adaptive.evolve [options] <file_path>

  ## Options

      --model, -m        AI model to use (default: "llama3-8b-8192")
      --output, -o       Output file path (default: optimized_<input_file>)
      --focus, -f        Optimization focus: performance, readability, or maintainability (default: performance)

  ## Examples

      # Optimize a file using the default model
      mix ash_swarm.adaptive.evolve lib/my_app/slow_operations.ex

      # Optimize a file using a specific model and save to a custom path
      mix ash_swarm.adaptive.evolve --model gpt-4o --output lib/my_app/fast_operations.ex lib/my_app/slow_operations.ex

      # Optimize with focus on maintainability
      mix ash_swarm.adaptive.evolve --focus maintainability lib/my_app/complex_operations.ex
  """

  use Mix.Task
  require Logger

  @shortdoc "Optimizes code using the Adaptive Code Evolution pattern"

  @impl true
  def run(args) do
    {options, file_paths} = parse_args(args)
    
    if Enum.empty?(file_paths) do
      Mix.raise("Expected a file path as an argument, got none")
    end

    file_path = List.first(file_paths)
    
    unless File.exists?(file_path) do
      Mix.raise("File not found: #{file_path}")
    end

    # Read the source code
    source_code = File.read!(file_path)
    
    # Get the model from options or use default
    model = options[:model] || "llama3-8b-8192"
    
    # Get output file path
    output_path = options[:output] || generate_output_path(file_path)
    
    # Get optimization focus
    focus = String.to_atom(options[:focus] || "performance")
    
    # Ensure dependencies are started
    Application.ensure_all_started(:ash_swarm)
    
    Mix.shell().info("Optimizing #{file_path} using #{model}...")
    Mix.shell().info("Optimization focus: #{focus}")
    
    # Create a simple usage pattern
    usage_pattern = %{
      usage_pattern: "high_volume_computation"
    }
    
    # Run the optimization
    case AshSwarm.Foundations.AIAdaptationStrategies.generate_optimized_implementation(
      source_code,
      usage_pattern,
      model: model,
      optimization_focus: focus
    ) do
      {:ok, response} ->
        # Write the optimized code to the output file
        File.write!(output_path, response.optimized_code)
        
        # Display success message
        Mix.shell().info(IO.ANSI.green() <> "\n✓ Optimization successful!" <> IO.ANSI.reset())
        Mix.shell().info("Optimized code written to: #{output_path}")
        
        # Display explanation
        Mix.shell().info("\nExplanation of changes:")
        Mix.shell().info(response.explanation)
        
        # Display documentation if available
        if response.documentation && response.documentation != "" do
          Mix.shell().info("\nGenerated documentation:")
          Mix.shell().info(response.documentation)
        end
        
        # Display expected improvements
        Mix.shell().info("\nExpected improvements:")
        
        if response.expected_improvements.performance && response.expected_improvements.performance != "" do
          Mix.shell().info("- Performance: #{response.expected_improvements.performance}")
        end
        
        if response.expected_improvements.maintainability && response.expected_improvements.maintainability != "" do
          Mix.shell().info("- Maintainability: #{response.expected_improvements.maintainability}")
        end
        
        if response.expected_improvements.safety && response.expected_improvements.safety != "" do
          Mix.shell().info("- Safety: #{response.expected_improvements.safety}")
        end
        
      {:error, reason} ->
        Mix.shell().error(IO.ANSI.red() <> "\n✗ Optimization failed!" <> IO.ANSI.reset())
        Mix.shell().error("Reason: #{inspect(reason)}")
    end
  end
  
  defp parse_args(args) do
    {options, file_paths} = OptionParser.parse!(args,
      aliases: [m: :model, o: :output, f: :focus],
      strict: [
        model: :string,
        output: :string,
        focus: :string
      ]
    )
    
    {options, file_paths}
  end
  
  defp generate_output_path(input_path) do
    # Split the path into directory and filename
    dir = Path.dirname(input_path)
    filename = Path.basename(input_path)
    
    # Generate optimized filename
    optimized_filename = "optimized_#{filename}"
    
    # Join back together
    Path.join(dir, optimized_filename)
  end
end
