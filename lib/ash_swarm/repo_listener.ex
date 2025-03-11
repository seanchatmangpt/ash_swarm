defmodule AshSwarm.RepoListener do
  @moduledoc """
  A GenServer that listens for repository events and processes them.
  
  This module listens for GitHub webhook events published to PubSub
  and processes them accordingly.
  """
  use GenServer
  require Logger
  
  alias AshSwarm.PubSub
  alias AshSwarm.Issues

  @doc """
  Returns a child specification for starting this GenServer under a supervisor.
  
  ## Parameters
    - opts: Keyword list of options
  
  ## Returns
    - A child spec map
  """
  def child_spec(opts) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [opts]},
      type: :worker,
      restart: :permanent,
      shutdown: 500
    }
  end

  @doc """
  Starts the repo listener.
  """
  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  @doc """
  Initialize the GenServer state and subscribe to the issues channel.
  """
  @impl true
  def init(_opts) do
    Logger.info("Starting RepoListener...")
    # Subscribe to the issues topic
    :ok = PubSub.subscribe("issues")
    {:ok, %{}}
  end

  @doc """
  Handle PubSub messages for issue creation.
  """
  @impl true
  def handle_info({:issues, "created", payload}, state) do
    Logger.info("Received issue created event: #{inspect(payload["issue"]["title"])}")
    
    # Extract issue data from the payload
    issue_data = %{
      issue_title: payload["issue"]["title"],
      issue_body: payload["issue"]["body"], 
      repo_id: payload["repository"]["full_name"]
    }
    
    # Create the issue in our database
    case Issues.create_issue(issue_data) do
      {:ok, issue} ->
        Logger.info("Issue created successfully: #{issue.issue_title}")
      {:error, error} ->
        Logger.error("Failed to create issue: #{inspect(error)}")
    end
    
    {:noreply, state}
  end
  
  # Handle other issue events
  @impl true
  def handle_info({:issues, event_type, _payload}, state) do
    Logger.info("Received unhandled issue event: #{event_type}")
    {:noreply, state}
  end
  
  # Catch-all for other messages
  @impl true
  def handle_info(message, state) do
    Logger.debug("Received unknown message: #{inspect(message)}")
    {:noreply, state}
  end
end
