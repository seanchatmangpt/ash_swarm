defmodule AshSwarm.Kpis do
  use Ash.Domain, otp_app: :ash_swarm, extensions: [AshJsonApi.Domain, AshAdmin.Domain]

  admin do
    show? true
  end

  resources do
    resource AshSwarm.Kpis.Kpi do
      define :read_kpis, action: :read
    end
  end
end
