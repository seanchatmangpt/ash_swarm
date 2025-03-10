defmodule AshSwarm.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      AshSwarmWeb.Telemetry,
      AshSwarm.Repo,
      {Oban,
       AshOban.config(
         Application.fetch_env!(:ash_swarm, :ash_domains),
         Application.fetch_env!(:ash_swarm, Oban)
       )},
      {DNSCluster, query: Application.get_env(:ash_swarm, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: AshSwarm.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: AshSwarm.Finch},
      # Start adaptive code evolution services
      AshSwarm.Foundations.UsageStats,
      AshSwarm.Foundations.AdaptiveScheduler,
      # Start a worker by calling: AshSwarm.Worker.start_link(arg)
      # {AshSwarm.Worker, arg},
      # Start to serve requests, typically the last entry
      AshSwarmWeb.Endpoint,
      {AshSwarm.RepoListener, name: AshSwarm.RepoListener},
      {AshAuthentication.Supervisor, [otp_app: :ash_swarm]}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: AshSwarm.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    AshSwarmWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
