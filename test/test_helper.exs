Application.put_env(:ash_swarm, :test_mode, true)
ExUnit.start()
Ecto.Adapters.SQL.Sandbox.mode(AshSwarm.Repo, :manual)
