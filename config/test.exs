import Config
config :ash_swarm, token_signing_secret: "FVOOo171ms1ltWB0FZAK3K8EfOFOvwHM"
config :ash_swarm, Oban, testing: :manual
config :ash, disable_async?: true

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :ash_swarm, AshSwarm.Repo,
  username: System.get_env("POSTGRES_USER", "postgres"),
  password: System.get_env("POSTGRES_PASSWORD", "postgres"),
  hostname: System.get_env("POSTGRES_HOST", "localhost"),
  database: "ash_swarm_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: System.schedulers_online() * 2

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :ash_swarm, AshSwarmWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "+QPZmovZ3oknbS0K+nCgI52o5jOqKAXHapPE06jEB+DSlRnpBDgtf5XCVAXVYzHJ",
  server: false

# In test we don't send emails
config :ash_swarm, AshSwarm.Mailer, adapter: Swoosh.Adapters.Test

# Disable swoosh api client as it is only required for production adapters
config :swoosh, :api_client, false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

# Enable helpful, but potentially expensive runtime checks
config :phoenix_live_view,
  enable_expensive_runtime_checks: true

# Configure AshSwarm to use mock implementations in tests
config :ash_swarm,
  ai_code_analysis_module: AshSwarm.MockAICodeAnalysis,
  ai_adaptation_strategies_module: AshSwarm.MockAIAdaptationStrategies,
  ai_experiment_evaluation_module: AshSwarm.MockAIExperimentEvaluation
