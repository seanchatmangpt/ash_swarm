defmodule AshSwarm.Issues do
  use Ash.Domain,
    otp_app: :ash_swarm

  resources do
    resource AshSwarm.Issues.Issue do

    end
  end
end
