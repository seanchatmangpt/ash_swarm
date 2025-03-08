defmodule Mix.Tasks.Start.LivebookOnly do
  @moduledoc """
  Mix task to start only the Livebook server with minimal dependencies.
  
  This task is designed to run Livebook without starting the full Phoenix application
  and disabling Oban to prevent job processing errors.

  ## Examples

      # Start Livebook with default settings
      mix start.livebook_only

      # Use custom password
      mix start.livebook_only --password=mysecretpassword

      # Use custom port
      mix start.livebook_only --port=8093
  """

  use Mix.Task
  require Logger

  @shortdoc "Start only Livebook server with minimal dependencies"
  
  @impl Mix.Task
  @spec run(list(String.t())) :: no_return()
  def run(args) do
    {opts, _, _} = OptionParser.parse(args, 
      switches: [
        password: :string,
        port: :integer
      ]
    )
    
    # Default configuration
    password = opts[:password] || "livebooksecretpassword"
    port = opts[:port] || 8092
    
    # Kill any existing Livebook processes
    if System.find_executable("pkill") do
      System.cmd("pkill", ["-f", "livebook server"], stderr_to_stdout: true)
      # Give processes time to terminate
      Process.sleep(1000)
    end
    
    # Set environment variables to disable Oban
    System.put_env("DISABLE_OBAN", "true")
    
    start_livebook(port, password)
    
    # Keep the process alive
    Process.sleep(:infinity)
  end
  
  @spec start_livebook(integer(), String.t()) :: {:ok, pid()}
  defp start_livebook(port, password) do
    Logger.info("Starting Livebook server at http://localhost:#{port}")
    System.put_env("LIVEBOOK_PASSWORD", password)
    
    # Check if livebook is available as a Mix task
    livebook_available? = Mix.Task.task?("livebook.server")
    
    if livebook_available? do
      # Use mix task if available
      Task.start(fn ->
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