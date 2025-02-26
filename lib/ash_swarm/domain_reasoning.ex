defmodule AshSwarm.DomainReasoning do
  @moduledoc """
  Represents the domain reasoning structure.
  """

  use ToFromDSL

  defstruct [:resources, :steps, :final_answer]

  @impl true
  def model_dump(%__MODULE__{} = struct) do
    Map.from_struct(struct)
  end

  @impl true
  def model_validate(data) when is_map(data) do
    %__MODULE__{
      resources: Map.get(data, "resources") || Map.get(data, :resources, []),
      steps: Map.get(data, "steps") || Map.get(data, :steps, []),
      final_answer: Map.get(data, "final_answer") || Map.get(data, :final_answer)
    }
  end

  @impl true
  def model_dump_json(%__MODULE__{} = struct, opts \\ []) do
    indent = Keyword.get(opts, :indent, 2)
    Jason.encode!(Map.from_struct(struct), pretty: indent > 0)
  end
end
