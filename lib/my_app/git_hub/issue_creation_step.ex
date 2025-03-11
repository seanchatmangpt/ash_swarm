# This step is commented out since we're handling issue creation
# directly in the webhook controller for simplicity.
#
# defmodule MyApp.GitHub.IssueCreationStep do
#   @moduledoc """
#   A reactor step that creates an issue in the database.
#   
#   This step is used by the IssueCreatedReactor to store GitHub issues
#   received from webhooks.
#   """
#   use Ash.Reactor.Step,
#     impl: {Ash.Reactor.AshStep,
#       actor: :system,
#       resource: AshSwarm.Issues.Issue,
#       action: :create}
#   
#   # Define the arguments this step accepts
#   arg :issue_title
#   arg :issue_body
#   arg :repo_id
# end
