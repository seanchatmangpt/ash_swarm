defmodule Mix.Tasks.Start.Services do
  @moduledoc """
  Mix task to start both Phoenix server and Livebook.

  This provides an alternative to shell scripts for starting the AshSwarm services.

  ## Examples

      # Start both Phoenix and Livebook
      mix start.services

      # Start only Phoenix
      mix start.services --no-livebook

      # Start only Livebook
      mix start.services --no-phoenix

      # Use custom Livebook password
      mix start.services --livebook-password=mypassword
  """

  use Mix.Task
  require Logger

  @shortdoc "Start AshSwarm services (Phoenix and Livebook)"
  
  @impl Mix.Task
  @spec run(list(String.t())) :: no_return()
  def run(args) do
    {opts, _, _} = OptionParser.parse(args, 
      switches: [
        no_phoenix: :boolean,
        no_livebook: :boolean,
        livebook_password: :string,
        port: :integer,
        livebook_port: :integer,
        startup_delay: :integer
      ]
    )
    
    # Default configuration
    livebook_password = opts[:livebook_password] || "livebooksecretpassword"
    phoenix_port = opts[:port] || 4000
    livebook_port = opts[:livebook_port] || 8092
    startup_delay = opts[:startup_delay] || 5000  # Default 5 second delay
    
    # Check for existing processes and kill them
    if System.find_executable("pkill") do
      System.cmd("pkill", ["-f", "phx.server"], stderr_to_stdout: true)
      System.cmd("pkill", ["-f", "livebook server"], stderr_to_stdout: true)
      # Give processes time to terminate
      Process.sleep(1000)
    end
    
    # Start Phoenix unless --no-phoenix flag is provided
    unless opts[:no_phoenix] do
      start_phoenix(phoenix_port)
      
      # Give Phoenix time to fully initialize before starting Livebook
      Logger.info("Waiting #{startup_delay}ms for Phoenix to initialize...")
      Process.sleep(startup_delay)
    end
    
    # Start Livebook unless --no-livebook flag is provided
    unless opts[:no_livebook] do
      start_livebook(livebook_port, livebook_password)
    end
    
    # Keep the process alive
    Process.sleep(:infinity)
  end
  
  @spec start_phoenix(integer()) :: :ok
  defp start_phoenix(port) do
    Logger.info("Starting Phoenix server at http://localhost:#{port}")
    System.put_env("PORT", to_string(port))
    
    # Starting the Phoenix server
    Mix.Task.run("phx.server")
    :ok
  end
  
  @spec start_livebook(integer(), String.t()) :: {:ok, pid()}
  defp start_livebook(port, password) do
    Logger.info("Starting Livebook server at http://localhost:#{port}")
    System.put_env("LIVEBOOK_PASSWORD", password)
    
    # Set DISABLE_OBAN environment variable to prevent Oban errors in Livebook
    System.put_env("DISABLE_OBAN", "true")
    
    # Check if livebook is available as a Mix task
    livebook_available? = Mix.Task.task?("livebook.server")
    
    if livebook_available? do
      # Use mix task if available
      Task.start(fn ->
        # Run in a separate process to avoid conflicts with Phoenix
        env = [
          {"LIVEBOOK_PASSWORD", password},
          {"DISABLE_OBAN", "true"}
        ]
        System.cmd("mix", ["livebook.server", "--port", to_string(port)], 
          env: env,
          into: IO.stream(:stdio, :line))
      end)
    else
      # Otherwise, try to use the escript
      Task.start(fn ->
        env = [
          {"LIVEBOOK_PASSWORD", password},
          {"DISABLE_OBAN", "true"}
        ]
        System.cmd("livebook", ["server", "--port", to_string(port)], 
          env: env,
          into: IO.stream(:stdio, :line))
      end)
    end
  end
end 
