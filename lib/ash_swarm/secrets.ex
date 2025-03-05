defmodule AshSwarm.Secrets do
  use AshAuthentication.Secret

  def secret_for([:authentication, :tokens, :signing_secret], AshSwarm.Accounts.User, _opts) do
    Application.fetch_env(:ash_swarm, :token_signing_secret)
  end
end
