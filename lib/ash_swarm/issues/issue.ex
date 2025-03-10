defmodule AshSwarm.Issues.Issue do
  use Ash.Resource,
    otp_app: :ash_swarm,
    domain: AshSwarm.Issues,
    data_layer: AshPostgres.DataLayer

  postgres do
    table "issues"
    repo AshSwarm.Repo
  end

  actions do
    defaults [
      :read,
      :destroy,
      create: [:issue_title, :issue_body, :repo_id],
      update: [:issue_title, :issue_body, :repo_id]
    ]
  end

  attributes do
    uuid_primary_key :id

    attribute :issue_title, :string do
      allow_nil? false
      public? true
    end

    attribute :issue_body, :string do
      allow_nil? false
      public? true
    end

    attribute :repo_id, :string do
      allow_nil? false
      public? true
    end

    timestamps()
  end
end
