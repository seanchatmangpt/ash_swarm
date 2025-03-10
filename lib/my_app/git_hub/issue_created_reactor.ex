# defmodule MyApp.GitHub.IssueCreatedReactor do
#   use Ash.Reactor

#   input :issue_title
#   input :issue_body
#   input :repo_id

#   step :create_issue, MyApp.GitHub.IssueCreationStep do
#     arg :issue_title, input(:issue_title)
#     arg :issue_body, input(:issue_body)
#     arg :repo_id, input(:repo_id)
#   end

#   return :create_issue
# end
