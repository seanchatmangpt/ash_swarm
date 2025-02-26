defmodule AshSwarm.Reactors do
  use Ash.Domain,
    otp_app: :ash_swarm

  resources do
    resource AshSwarm.Reactors.Question
  end
end
