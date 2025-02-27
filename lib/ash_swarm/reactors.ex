defmodule AshSwarm.Reactors do
  use Ash.Domain, otp_app: :ash_swarm, extensions: [AshAdmin.Domain]

  admin do
    show? true
  end

  resources do
    resource AshSwarm.Reactors.Question
  end
end
