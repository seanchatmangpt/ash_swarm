# Script to manually trigger adaptive code evolution
require Logger
Logger.configure(level: :info)

IO.puts("====================================================")
IO.puts("    ADAPTIVE CODE EVOLUTION - MANUAL EXECUTION      ")
IO.puts("====================================================")

# Parse command line arguments if provided
args = System.argv()
verbose = "--verbose" in args
if verbose, do: Logger.configure(level: :debug)

# Additional modules can be specified as command-line args
specified_modules = args 
  |> Enum.filter(&(not String.starts_with?(&1, "--")))
  |> Enum.map(&String.to_atom/1)

# Default modules to check if none specified
default_modules = [
  AshSwarm.Accounts.User,
  AshSwarm.Accounts.Organization
]

# We'll use the QueryEvolution module that's already implemented
modules_to_check = if Enum.empty?(specified_modules), do: default_modules, else: specified_modules

IO.puts("\nModules selected for adaptive evolution:")
IO.inspect(modules_to_check, pretty: true)

# Attempt to evolve each module's queries
IO.puts("\nStarting evolution process:")
IO.puts("====================================================")

evolution_results = Enum.map(modules_to_check, fn module ->
  IO.puts("\n→ Processing: #{inspect(module)}")
  
  # First, simulate some usage to have data to work with
  usage_result = try do
    AshSwarm.Foundations.UsageStats.update_stats(
      module, 
      "query/2", 
      %{execution_time: 150, memory_usage: 2048}
    )
    IO.puts("✓ Usage statistics recorded for #{inspect(module)}.query/2")
    {:ok, :usage_recorded}
  rescue
    error -> 
      IO.puts("✗ Error recording usage stats: #{inspect(error)}")
      {:error, :usage_stats, error}
  end
  
  # Then try to evolve the queries
  evolution_result = try do
    result = AshSwarm.Foundations.QueryEvolution.evolve_queries(module)
    IO.puts("✓ Evolution completed with result: #{inspect(result)}")
    {:ok, :evolved, result}
  rescue
    error -> 
      IO.puts("✗ Error evolving queries: #{inspect(error)}")
      {:error, :evolution, error}
  end
  
  {module, usage_result, evolution_result}
end)

# Print summary
IO.puts("\n====================================================")
IO.puts("             EVOLUTION PROCESS SUMMARY              ")
IO.puts("====================================================")

success_count = evolution_results
  |> Enum.count(fn {_, _, evolution_result} -> 
    case evolution_result do
      {:ok, :evolved, _} -> true
      _ -> false
    end
  end)

IO.puts("\n✓ Successfully evolved #{success_count} out of #{length(modules_to_check)} modules")

if verbose do
  IO.puts("\nDetailed results:")
  
  Enum.each(evolution_results, fn {module, usage_result, evolution_result} ->
    IO.puts("\n→ #{inspect(module)}:")
    IO.puts("  Usage stats: #{inspect(usage_result)}")
    IO.puts("  Evolution: #{inspect(evolution_result)}")
  end)
end

IO.puts("\nEvolution process completed. Check logs for more details.")
