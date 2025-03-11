defmodule AshSwarm.BitHubFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `AshSwarm.BitHub` context.
  """

  @doc """
  Generate a issues.
  """
  def issues_fixture(attrs \\ %{}) do
    {:ok, issues} =
      attrs
      |> Enum.into(%{})
      |> AshSwarm.BitHub.create_issues()

    issues
  end
end
