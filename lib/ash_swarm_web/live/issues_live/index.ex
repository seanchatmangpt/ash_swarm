defmodule AshSwarmWeb.IssuesLive.Index do
  use AshSwarmWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    # Subscribe to the issues pub/sub topic
    AshSwarm.PubSub.subscribe("issues")

    # Load all issues
    {:ok, issues} = AshSwarm.Issues.Issue |> AshSwarm.Issues.read!()

    {:ok,
     socket
     |> assign(:issues, issues)
     |> assign(:page_title, "Listing Issues")}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Issues")
  end

  @impl true
  def handle_info(%{event: "created", message: message}, socket) do
    # Reload all issues when a new one is created
    {:ok, issues} = AshSwarm.Issues.Issue |> AshSwarm.Issues.read!()

    {:noreply,
     socket
     |> assign(:issues, issues)
     |> put_flash(:info, "New issue created: #{message.issue_title}")}
  end

  @impl true
  def handle_info(%{event: "updated", message: message}, socket) do
    # Reload all issues when one is updated
    {:ok, issues} = AshSwarm.Issues.Issue |> AshSwarm.Issues.read!()

    {:noreply,
     socket
     |> assign(:issues, issues)
     |> put_flash(:info, "Issue updated: #{message.issue_title}")}
  end

  @impl true
  def handle_info(%{event: "deleted", message: _message}, socket) do
    # Reload all issues when one is deleted
    {:ok, issues} = AshSwarm.Issues.Issue |> AshSwarm.Issues.read!()

    {:noreply,
     socket
     |> assign(:issues, issues)
     |> put_flash(:info, "Issue deleted")}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">GitHub Issues</h1>

      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          <%= for issue <- @issues do %>
            <li class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-indigo-600 truncate">{issue.issue_title}</p>
                <div class="ml-2 flex-shrink-0 flex">
                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {issue.repo_id}
                  </p>
                </div>
              </div>
              <div class="mt-2 sm:flex sm:justify-between">
                <div class="sm:flex">
                  <p class="flex items-center text-sm text-gray-500">
                    {issue.issue_body}
                  </p>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    Created at {issue.inserted_at}
                  </p>
                </div>
              </div>
            </li>
          <% end %>
        </ul>
      </div>
    </div>
    """
  end
end
