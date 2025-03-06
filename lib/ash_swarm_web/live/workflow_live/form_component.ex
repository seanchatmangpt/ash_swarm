defmodule AshSwarmWeb.WorkflowLive.FormComponent do
  use AshSwarmWeb, :live_component

  @impl true
  def render(assigns) do
    ~H"""
    <div>
      <.header>
        {@title}
        <:subtitle>Use this form to manage workflow records in your database.</:subtitle>
      </.header>

      <.simple_form
        for={@form}
        id="workflow-form"
        phx-target={@myself}
        phx-change="validate"
        phx-submit="save"
      >
        <:actions>
          <.button phx-disable-with="Saving...">Save Workflow</.button>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  @impl true
  def update(assigns, socket) do
    {:ok,
     socket
     |> assign(assigns)
     |> assign_form()}
  end

  @impl true
  def handle_event("validate", %{"workflow" => workflow_params}, socket) do
    {:noreply,
     assign(socket, form: AshPhoenix.Form.validate(socket.assigns.form, workflow_params))}
  end

  def handle_event("save", %{"workflow" => workflow_params}, socket) do
    case AshPhoenix.Form.submit(socket.assigns.form, params: workflow_params) do
      {:ok, workflow} ->
        notify_parent({:saved, workflow})

        socket =
          socket
          |> put_flash(:info, "Workflow #{socket.assigns.form.source.type}d successfully")
          |> push_patch(to: socket.assigns.patch)

        {:noreply, socket}

      {:error, form} ->
        {:noreply, assign(socket, form: form)}
    end
  end

  defp notify_parent(msg), do: send(self(), {__MODULE__, msg})

  defp assign_form(%{assigns: %{workflow: workflow}} = socket) do
    form =
      if workflow do
        AshPhoenix.Form.for_update(workflow, :update,
          as: "workflow",
          actor: socket.assigns.current_user
        )
      else
        AshPhoenix.Form.for_create(AshSwarm.Workflows.Workflow, :create,
          as: "workflow",
          actor: socket.assigns.current_user
        )
      end

    assign(socket, form: to_form(form))
  end
end
