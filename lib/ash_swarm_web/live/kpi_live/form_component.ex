defmodule AshSwarmWeb.KpiLive.FormComponent do
  use AshSwarmWeb, :live_component

  @impl true
  def render(assigns) do
    ~H"""
    <div>
      <.header>
        {@title}
        <:subtitle>Use this form to manage kpi records in your database.</:subtitle>
      </.header>

      <.simple_form
        for={@form}
        id="kpi-form"
        phx-target={@myself}
        phx-change="validate"
        phx-submit="save"
      >
        <.input field={@form[:label]} type="text" label="Label" /><.input
          field={@form[:value]}
          type="text"
          label="Value"
        /><.input field={@form[:trend]} type="text" label="Trend" />

        <:actions>
          <.button phx-disable-with="Saving...">Save Kpi</.button>
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
  def handle_event("validate", %{"kpi" => kpi_params}, socket) do
    {:noreply, assign(socket, form: AshPhoenix.Form.validate(socket.assigns.form, kpi_params))}
  end

  def handle_event("save", %{"kpi" => kpi_params}, socket) do
    case AshPhoenix.Form.submit(socket.assigns.form, params: kpi_params) do
      {:ok, kpi} ->
        notify_parent({:saved, kpi})

        socket =
          socket
          |> put_flash(:info, "Kpi #{socket.assigns.form.source.type}d successfully")
          |> push_patch(to: socket.assigns.patch)

        {:noreply, socket}

      {:error, form} ->
        {:noreply, assign(socket, form: form)}
    end
  end

  defp notify_parent(msg), do: send(self(), {__MODULE__, msg})

  defp assign_form(%{assigns: %{kpi: kpi}} = socket) do
    form =
      if kpi do
        AshPhoenix.Form.for_update(kpi, :update, as: "kpi", actor: socket.assigns.current_user)
      else
        AshPhoenix.Form.for_create(AshSwarm.Kpis.Kpi, :create,
          as: "kpi",
          actor: socket.assigns.current_user
        )
      end

    assign(socket, form: to_form(form))
  end
end
