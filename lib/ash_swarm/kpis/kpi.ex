defmodule AshSwarm.Kpis.Kpi do
  use Ash.Resource,
    otp_app: :ash_swarm,
    domain: AshSwarm.Kpis,
    extensions: [AshJsonApi.Resource, AshAdmin.Resource, Ash.Reactor, AshOban, AshPhoenix],
    data_layer: AshPostgres.DataLayer

  postgres do
    table "kpis"
    repo AshSwarm.Repo
  end

  json_api do
    type "kpi"
  end

  actions do
    defaults [:read, :destroy, create: [:label, :value, :trend], update: [:label, :value, :trend]]
  end

  attributes do
    uuid_primary_key :id

    attribute :label, :string do
      allow_nil? false
      public? true
    end

    attribute :value, :string do
      allow_nil? false
      public? true
    end

    attribute :trend, :string do
      allow_nil? false
      public? true
    end

    timestamps()
  end
end
