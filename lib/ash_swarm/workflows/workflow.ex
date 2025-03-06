defmodule AshSwarm.Workflows.Workflow do
  use Ash.Resource,
    otp_app: :ash_swarm,
    domain: AshSwarm.Workflows,
    extensions: [AshJsonApi.Resource, AshAdmin.Resource, Ash.Reactor, AshOban, AshPhoenix],
    data_layer: AshPostgres.DataLayer

  postgres do
    table "workflows"
    repo AshSwarm.Repo
  end

  json_api do
    type "workflow"
  end

  actions do
    defaults [:read, :update, :destroy, :create]
  end

  attributes do
    uuid_primary_key :id

    attribute :name, :string do
      allow_nil? false
      public? true
    end

    attribute :description, :string do
      public? true
    end

    attribute :status, :string do
      public? true
    end

    attribute :last_run, :utc_datetime do
      public? true
    end

    attribute :success_rate, :integer do
      public? true
    end

    attribute :processed_jobs, :integer do
      public? true
    end

    attribute :failed_jobs, :integer do
      public? true
    end

    attribute :pending_jobs, :integer do
      public? true
    end

    timestamps()
  end

  relationships do
    belongs_to :owner, AshSwarm.Accounts.User
  end
end
