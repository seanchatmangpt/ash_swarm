defmodule AshSwarm.Accounts do
  use Ash.Domain,
    otp_app: :ash_swarm

  resources do
    resource AshSwarm.Accounts.Token
    resource AshSwarm.Accounts.User
  end
end
