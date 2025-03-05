import Config

# Database configuration for our test run
config :ash_swarm, AshSwarm.Repo,
  username: "ash_user",
  password: "ash_password",
  hostname: "localhost",
  database: "ash_swarm_dev",
  stacktrace: true,
  show_sensitive_data_on_connection_error: true,
  pool_size: 10
