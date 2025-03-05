defmodule AshSwarm.Workflows do
  use Ash.Domain, otp_app: :ash_swarm, extensions: [AshJsonApi.Domain, AshAdmin.Domain]

  admin do
    show? true
  end

  resources do
    resource AshSwarm.Workflows.Workflow do
      define :read_workflows, action: :read
    end
  end
end
