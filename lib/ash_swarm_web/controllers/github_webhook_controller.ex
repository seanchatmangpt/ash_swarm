defmodule AshSwarmWeb.GitHubWebhookController do
  use AshSwarmWeb, :controller
  require Logger

  alias AshSwarm.Issues

  @github_secret Application.compile_env(:ash_swarm, :github_webhook_secret, "default_secret")

  def handle(conn, %{"action" => "opened"} = params) do
    # Extract relevant issue data from params, providing defaults for missing fields
    issue_data = %{
      issue_title: get_in(params, ["issue", "title"]) || "Untitled Issue",
      issue_body: get_in(params, ["issue", "body"]) || "No description provided",
      repo_id: get_in(params, ["repository", "full_name"]) || "unknown/repo"
    }

    # Log what we received
    Logger.info("Processing issue: #{inspect(issue_data)}")

    # Broadcast to PubSub for any subscribers (like RepoListener)
    AshSwarm.PubSub.broadcast("issues", "created", params)

    # Create the issue directly
    case Issues.create_issue(issue_data) do
      {:ok, issue} ->
        Logger.info("Issue created successfully: #{issue.issue_title}")
        send_resp(conn, 200, "Issue created event processed")

      {:error, error} ->
        Logger.error("Failed to create issue: #{inspect(error)}")
        send_resp(conn, 500, "Failed to process issue: #{inspect(error)}")
    end
  end

  def handle(conn, params) do
    Logger.info("Received webhook: #{inspect(params)}")
    
    signature = get_req_header(conn, "x-hub-signature-256") |> List.first()
    event = get_req_header(conn, "x-github-event") |> List.first()

    raw_body =
      case conn.assigns[:raw_body] do
        nil -> 
          Logger.warning("No raw body found in conn.assigns")
          ""
        list when is_list(list) -> 
          body = List.first(list)
          Logger.debug("Raw body: #{inspect(body)}")
          body
      end

    Logger.info("Event: #{event}, Action: #{params["action"]}, Signature: #{signature != nil}")

    if verify_signature?(signature, raw_body) do
      case {event, params["action"]} do
        {"issues", "opened"} ->
          Logger.info("New issue created: #{inspect(get_in(params, ["issue", "title"]))}")

          # Extract relevant issue data from params
          issue_data = %{
            issue_title: get_in(params, ["issue", "title"]) || "Untitled Issue",
            issue_body: get_in(params, ["issue", "body"]) || "No description provided",
            repo_id: get_in(params, ["repository", "full_name"]) || "unknown/repo"
          }

          # Use our Issues API directly
          case Issues.create_issue(issue_data) do
            {:ok, issue} ->
              Logger.info("Issue created successfully: #{issue.issue_title}")
              send_resp(conn, 200, "Issue created event processed")

            {:error, error} ->
              Logger.error("Failed to create issue: #{inspect(error)}")
              send_resp(conn, 500, "Failed to process issue: #{inspect(error)}")
          end

        _ ->
          Logger.info("Ignoring event: #{event} with action #{params["action"]}")
          send_resp(conn, 200, "Event ignored")
      end
    else
      Logger.warning("Invalid GitHub Webhook Signature. Raw body length: #{byte_size(raw_body)}")
      # For debugging only, accept requests without valid signatures
      if Application.get_env(:ash_swarm, :bypass_webhook_verification, false) do
        Logger.warning("Bypassing signature verification for debugging")
        send_resp(conn, 200, "Signature verification bypassed for debugging")
      else
        send_resp(conn, 403, "Invalid signature")
      end
    end
  end

  defp verify_signature?(nil, _), do: false

  defp verify_signature?(signature, payload) do
    computed_signature =
      "sha256=" <>
        (:crypto.mac(:hmac, :sha256, @github_secret, payload)
         |> Base.encode16(case: :lower))

    Logger.debug("Comparing signatures: #{computed_signature} vs #{signature}")
    Plug.Crypto.secure_compare(computed_signature, signature)
  end
end
