defmodule AshSwarmWeb.WorkflowLive.Index do
  use AshSwarmWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <.header>
      Listing Workflows
      <:actions>
        <.link patch={~p"/workflows/new"}>
          <.button>New Workflow</.button>
        </.link>
      </:actions>
    </.header>

    <.table
      id="workflows"
      rows={@streams.workflows}
      row_click={fn {_id, workflow} -> JS.navigate(~p"/workflows/#{workflow}") end}
    >
      <:col :let={{_id, workflow}} label="Id">{workflow.id}</:col>

      <:col :let={{_id, workflow}} label="Name">{workflow.name}</:col>

      <:col :let={{_id, workflow}} label="Description">{workflow.description}</:col>

      <:col :let={{_id, workflow}} label="Status">{workflow.status}</:col>

      <:col :let={{_id, workflow}} label="Last run">{workflow.last_run}</:col>

      <:col :let={{_id, workflow}} label="Success rate">{workflow.success_rate}</:col>

      <:col :let={{_id, workflow}} label="Processed jobs">{workflow.processed_jobs}</:col>

      <:col :let={{_id, workflow}} label="Failed jobs">{workflow.failed_jobs}</:col>

      <:col :let={{_id, workflow}} label="Pending jobs">{workflow.pending_jobs}</:col>

      <:action :let={{_id, workflow}}>
        <div class="sr-only">
          <.link navigate={~p"/workflows/#{workflow}"}>Show</.link>
        </div>

        <.link patch={~p"/workflows/#{workflow}/edit"}>Edit</.link>
      </:action>

      <:action :let={{id, workflow}}>
        <.link
          phx-click={JS.push("delete", value: %{id: workflow.id}) |> hide("##{id}")}
          data-confirm="Are you sure?"
        >
          Delete
        </.link>
      </:action>
    </.table>

    <.modal
      :if={@live_action in [:new, :edit]}
      id="workflow-modal"
      show
      on_cancel={JS.patch(~p"/workflows")}
    >
      <.live_component
        module={AshSwarmWeb.WorkflowLive.FormComponent}
        id={(@workflow && @workflow.id) || :new}
        title={@page_title}
        current_user={@current_user}
        action={@live_action}
        workflow={@workflow}
        patch={~p"/workflows"}
      />
    </.modal>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> stream(
       :workflows,
       Ash.read!(AshSwarm.Workflows.Workflow, actor: socket.assigns[:current_user])
     )
     |> assign_new(:current_user, fn -> nil end)}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Workflow")
    |> assign(
      :workflow,
      Ash.get!(AshSwarm.Workflows.Workflow, id, actor: socket.assigns.current_user)
    )
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Workflow")
    |> assign(:workflow, nil)
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Workflows")
    |> assign(:workflow, nil)
  end

  @impl true
  def handle_info({AshSwarmWeb.WorkflowLive.FormComponent, {:saved, workflow}}, socket) do
    {:noreply, stream_insert(socket, :workflows, workflow)}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    workflow = Ash.get!(AshSwarm.Workflows.Workflow, id, actor: socket.assigns.current_user)
    Ash.destroy!(workflow, actor: socket.assigns.current_user)

    {:noreply, stream_delete(socket, :workflows, workflow)}
  end
end
