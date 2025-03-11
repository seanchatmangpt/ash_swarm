# This reactor is commented out since we're handling issue creation 
# directly in the webhook controller for simplicity.
#
# defmodule MyApp.GitHub.IssueCreatedReactor do
#   @moduledoc """
#   Reactor for processing GitHub issue creation events.
#   
#   This reactor is triggered when a new issue is created via the GitHub webhook.
#   It processes the issue data and performs any required operations.
#   """
#   use Ash.Reactor
# 
#   # Define the inputs required for this reactor
#   input :issue_title
#   input :issue_body
#   input :repo_id
# 
#   # Define steps to be executed when the reactor runs
#   step :create_issue, MyApp.GitHub.IssueCreationStep,
#     args: %{
#       issue_title: input(:issue_title),
#       issue_body: input(:issue_body),
#       repo_id: input(:repo_id)
#     }
# 
#   # Return the result of the create_issue step
#   return :create_issue
# end
