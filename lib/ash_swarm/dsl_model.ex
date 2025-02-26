defmodule AshSwarm.DSLModel do
  @moduledoc """
  A sample model that demonstrates how to implement the ToFromDSL behaviour
  for YAML/JSON/TOML serialization.
  """

  use ToFromDSL

  defstruct [:name, :description, :count]

  @impl true
  def model_dump(%__MODULE__{} = struct) do
    Map.from_struct(struct)
  end

  @impl true
  def model_validate(data) when is_map(data) do
    name = Map.get(data, "name") || Map.get(data, :name)
    if is_nil(name), do: raise("Field 'name' is required")

    %__MODULE__{
      name: name,
      description: Map.get(data, "description") || Map.get(data, :description),
      count: Map.get(data, "count") || Map.get(data, :count)
    }
  end

  @impl true
  def model_dump_json(%__MODULE__{} = struct, opts \\ []) do
    indent = Keyword.get(opts, :indent, 2)
    Jason.encode!(Map.from_struct(struct), pretty: indent > 0)
  end
end
