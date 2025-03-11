defmodule AshSwarmWeb.GitHubWebhookController do
  use AshSwarmWeb, :controller
  require Logger

  @github_secret Application.compile_env(:ash_swarm, :github_webhook_secret, "default_secret")

  def handle(conn, %{"action" => "opened"} = params) do
    # Extract relevant issue data from params
    # issue_data = %{
    #   issue_title: params["issue"]["title"],
    #   issue_body: params["issue"]["body"],
    #   repo_id: params["repository"]["full_name"]
    # }

    AshSwarm.PubSub.broadcast("issues", "created", params)

    # # Use the reactor to create the issue, which will trigger the notification
    # case MyApp.GitHub.IssueCreatedReactor.run(issue_data) do
    #   {:ok, _result} ->
    #     send_resp(conn, 200, "Issue created event processed")

    #   {:error, error} ->
    #     Logger.error("Failed to process issue: #{inspect(error)}")
    #     send_resp(conn, 500, "Failed to process issue")
    # end

    send_resp(conn, 200, "Issue created")
  end

  def handle(conn, params) do
    signature = get_req_header(conn, "x-hub-signature-256") |> List.first()
    event = get_req_header(conn, "x-github-event") |> List.first()

    raw_body =
      case conn.assigns[:raw_body] do
        nil -> ""
        list when is_list(list) -> List.first(list)
      end

    if verify_signature?(signature, raw_body) do
      case {event, params["action"]} do
        {"issues", "opened"} ->
          Logger.info("New issue created: #{inspect(params)}")

          # Extract relevant issue data from params
          issue_data = %{
            issue_title: params["issue"]["title"],
            issue_body: params["issue"]["body"],
            repo_id: params["repository"]["full_name"]
          }

          # Use the reactor to create the issue, which will trigger the notification
          case MyApp.GitHub.IssueCreatedReactor.run(issue_data) do
            {:ok, _result} ->
              send_resp(conn, 200, "Issue created event processed")

            {:error, error} ->
              Logger.error("Failed to process issue: #{inspect(error)}")
              send_resp(conn, 500, "Failed to process issue")
          end

        _ ->
          Logger.info("Ignoring event: #{event} with action #{params["action"]}")
          send_resp(conn, 200, "Event ignored")
      end
    else
      Logger.warning("Invalid GitHub Webhook Signature", [])
      send_resp(conn, 403, "Invalid signature")
    end
  end

  defp verify_signature?(nil, _), do: false

  defp verify_signature?(signature, payload) do
    computed_signature =
      "sha256=" <>
        (:crypto.mac(:hmac, :sha256, @github_secret, payload)
         |> Base.encode16(case: :lower))

    Plug.Crypto.secure_compare(computed_signature, signature)
  end
end
