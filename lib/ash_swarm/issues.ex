defmodule AshSwarm.Issues do
  use Ash.Domain,
    otp_app: :ash_swarm

  resources do
    resource AshSwarm.Issues.Issue
  end

  @doc """
  Read issues from the database.
  
  Returns a list of all issues.
  
  ## Examples
      iex> AshSwarm.Issues.read!(AshSwarm.Issues.Issue)
      {:ok, [%AshSwarm.Issues.Issue{}, ...]}
  """
  def read!(queryable) do
    issues = Ash.read!(queryable)
    {:ok, issues}
  end

  @doc """
  Creates a new issue.
  
  ## Parameters
    - params: Map containing issue_title, issue_body, and repo_id
  
  ## Returns
    - {:ok, issue} on success
    - {:error, changeset} on failure
  
  ## Examples
      iex> AshSwarm.Issues.create_issue(%{issue_title: "Title", issue_body: "Body", repo_id: "owner/repo"})
      {:ok, %AshSwarm.Issues.Issue{}}
  """
  def create_issue(params) do
    AshSwarm.Issues.Issue
    |> Ash.Changeset.for_create(:create, params)
    |> Ash.create()
  end
end
