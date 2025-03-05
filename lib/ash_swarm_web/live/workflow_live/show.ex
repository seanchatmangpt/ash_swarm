defmodule AshSwarmWeb.WorkflowLive.Show do
  use AshSwarmWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <.header>
      Workflow {@workflow.id}
      <:subtitle>This is a workflow record from your database.</:subtitle>

      <:actions>
        <.link patch={~p"/workflows/#{@workflow}/show/edit"} phx-click={JS.push_focus()}>
          <.button>Edit workflow</.button>
        </.link>
      </:actions>
    </.header>

    <.list>
      <:item title="Id">{@workflow.id}</:item>

      <:item title="Name">{@workflow.name}</:item>

      <:item title="Description">{@workflow.description}</:item>

      <:item title="Status">{@workflow.status}</:item>

      <:item title="Last run">{@workflow.last_run}</:item>

      <:item title="Success rate">{@workflow.success_rate}</:item>

      <:item title="Processed jobs">{@workflow.processed_jobs}</:item>

      <:item title="Failed jobs">{@workflow.failed_jobs}</:item>

      <:item title="Pending jobs">{@workflow.pending_jobs}</:item>
    </.list>

    <.back navigate={~p"/workflows"}>Back to workflows</.back>

    <.modal
      :if={@live_action == :edit}
      id="workflow-modal"
      show
      on_cancel={JS.patch(~p"/workflows/#{@workflow}")}
    >
      <.live_component
        module={AshSwarmWeb.WorkflowLive.FormComponent}
        id={@workflow.id}
        title={@page_title}
        action={@live_action}
        current_user={@current_user}
        workflow={@workflow}
        patch={~p"/workflows/#{@workflow}"}
      />
    </.modal>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(%{"id" => id}, _, socket) do
    {:noreply,
     socket
     |> assign(:page_title, page_title(socket.assigns.live_action))
     |> assign(
       :workflow,
       Ash.get!(AshSwarm.Workflows.Workflow, id, actor: socket.assigns.current_user)
     )}
  end

  defp page_title(:show), do: "Show Workflow"
  defp page_title(:edit), do: "Edit Workflow"
end
