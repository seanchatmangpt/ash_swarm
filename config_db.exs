# Script to set up database configuration
# Run with: mix run config_db.exs

# Get all the repos configured for the current app
repos = Application.get_env(:ash_swarm, :ecto_repos, [])
IO.puts("Configuring repos: #{inspect(repos)}")

# Update the database configuration
for repo <- repos do
  IO.puts("Updating configuration for #{inspect(repo)}")

  # Update the repo configuration
  repo_config = Application.get_env(:ash_swarm, repo, [])
  repo_config = Keyword.merge(repo_config, [
    username: "ash_user",
    password: "ash_password",
    hostname: "localhost",
    database: "ash_swarm_dev"
  ])
  
  # Apply the updated configuration
  Application.put_env(:ash_swarm, repo, repo_config)
  
  IO.puts("Configuration updated: #{inspect(Application.get_env(:ash_swarm, repo))}")
end

IO.puts("Database configuration updated successfully.")
