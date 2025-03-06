defmodule AshSwarmWeb.KpiLive.Show do
  use AshSwarmWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <.header>
      Kpi {@kpi.id}
      <:subtitle>This is a kpi record from your database.</:subtitle>

      <:actions>
        <.link patch={~p"/kpis/#{@kpi}/show/edit"} phx-click={JS.push_focus()}>
          <.button>Edit kpi</.button>
        </.link>
      </:actions>
    </.header>

    <.list>
      <:item title="Id">{@kpi.id}</:item>

      <:item title="Label">{@kpi.label}</:item>

      <:item title="Value">{@kpi.value}</:item>

      <:item title="Trend">{@kpi.trend}</:item>
    </.list>

    <.back navigate={~p"/kpis"}>Back to kpis</.back>

    <.modal :if={@live_action == :edit} id="kpi-modal" show on_cancel={JS.patch(~p"/kpis/#{@kpi}")}>
      <.live_component
        module={AshSwarmWeb.KpiLive.FormComponent}
        id={@kpi.id}
        title={@page_title}
        action={@live_action}
        current_user={@current_user}
        kpi={@kpi}
        patch={~p"/kpis/#{@kpi}"}
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
     |> assign(:kpi, Ash.get!(AshSwarm.Kpis.Kpi, id, actor: socket.assigns.current_user))}
  end

  defp page_title(:show), do: "Show Kpi"
  defp page_title(:edit), do: "Edit Kpi"
end
