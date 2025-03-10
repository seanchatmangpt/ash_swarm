defmodule MyApp.GitHub.IssueCreatedReactor do
  use Reactor

  input :issue_title
  input :issue_body
  input :repo_id

  step :create_issue, MyApp.GitHub.IssueCreationStep do
    # Implement the step here
  end

  return :create_issue
end
