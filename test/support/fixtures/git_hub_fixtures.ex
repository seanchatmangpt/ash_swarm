defmodule AshSwarm.GitHubFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `AshSwarm.GitHub` context.
  """

  @doc """
  Generate a issue.
  """
  def issue_fixture(attrs \\ %{}) do
    {:ok, issue} =
      attrs
      |> Enum.into(%{
        issue_body: "some issue_body",
        issue_title: "some issue_title",
        repo_id: "some repo_id"
      })
      |> AshSwarm.GitHub.create_issue()

    issue
  end
end
