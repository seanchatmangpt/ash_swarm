defmodule AshSwarm.EctoSchema.DomainStep do
  @moduledoc """
  Represents a single step in the domain reasoning process.

  Each step contains:
    - `explanation`: A textual explanation of the reasoning at that step.
    - `output`: The result or outcome of that step.
  """
  use Ecto.Schema
  import Ecto.Changeset
  # Ensures we can use this schema as an Instructor response model
  use Instructor

  @primary_key false
  embedded_schema do
    field :explanation, :string
    field :output, :string
  end

  @doc """
  Builds a changeset for a single reasoning step.
  """
  def changeset(step, params) do
    step
    |> cast(params, [:explanation, :output])
    |> validate_required([:explanation, :output])
  end
end

defmodule AshSwarm.EctoSchema.DomainResource do
  @moduledoc """
  Represents a single resource within the domain.

  Each resource contains:

    - `name`: A unique identifier for the resource.
    - `attributes`: A list of maps defining its attributes.
    - `relationships`: A list of maps defining its relationships to other resources.
    - `default_actions`: A list of default action types (e.g. ["read", "create"]).
    - `primary_key`: A map with primary key configuration
      (e.g. %{type: "uuidv4", name: "id"}).
    - `domain`: The overarching domain or namespace.
    - `extends`: A list of extensions to augment the resource.
    - `base`: The base Ash module to use for the resource (e.g. "Ash.Resource").
    - `timestamps`: Whether timestamps are included.
  """
  use Ecto.Schema
  import Ecto.Changeset
  use Instructor

  @primary_key false
  embedded_schema do
    field :name, :string
    field :attributes, {:array, :map}, default: []
    field :relationships, {:array, :map}, default: []
    field :default_actions, {:array, :string}, default: []
    field :primary_key, :map
    field :domain, :string
    field :extends, {:array, :string}, default: []
    field :base, :string
    field :timestamps, :boolean, default: false
  end

  def changeset(resource, params) do
    resource
    |> cast(
      params,
      [
        :name,
        :attributes,
        :relationships,
        :default_actions,
        :primary_key,
        :domain,
        :extends,
        :base,
        :timestamps
      ]
    )
    |> validate_required([
      :name,
      :attributes,
      :relationships,
      :default_actions,
      :primary_key,
      :domain,
      :extends,
      :base,
      :timestamps
    ])
  end
end

defmodule AshSwarm.EctoSchema.DomainReasoning do
  @moduledoc """
  Represents the overall domain reasoning process.

  This schema aggregates:
    - A list of domain resources (`DomainResource`).
    - A step-by-step explanation of the reasoning (`Step`).
    - A `final_answer` summarizing the domain model.
  """
  use Ecto.Schema
  import Ecto.Changeset
  use Instructor

  @primary_key false
  embedded_schema do
    embeds_many :resources, AshSwarm.EctoSchema.DomainResource, on_replace: :delete
    embeds_many :steps, AshSwarm.EctoSchema.DomainStep, on_replace: :delete
    field :final_answer, :string
  end

  @doc """
  Builds a changeset for the `DomainReasoning` struct.
  """
  def changeset(domain_reasoning, params) do
    domain_reasoning
    |> cast(params, [:final_answer])
    |> cast_embed(:resources, with: &AshSwarm.EctoSchema.DomainResource.changeset/2)
    |> cast_embed(:steps, with: &AshSwarm.EctoSchema.Step.changeset/2)
    |> validate_required([:resources, :steps, :final_answer])
  end
end
