defmodule Bithub.WorkOnIssue.WorkOnIssueReactor do
  use Reactor

  input :dev_id

  step :fetch_current_issue, Bithub.WorkOnIssue.FetchIssueStep do
    # Implement the step here
  end

  step :generate_code, Bithub.WorkOnIssue.AIWriteCodeStep do
    # Implement the step here
  end

  step :update_progress, Bithub.WorkOnIssue.UpdateIssueProgressStep do
    # Implement the step here
  end

  return :update_progress
end
