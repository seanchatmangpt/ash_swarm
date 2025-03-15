defmodule AshSwarmWeb.KpiLive.Index do
  use AshSwarmWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <.header>
      Listing Kpis
      <:actions>
        <.link patch={~p"/kpis/new"}>
          <.button>New Kpi</.button>
        </.link>
      </:actions>
    </.header>

    <.Counter count={@count} name={@name} v-socket={@socket} v-on:inc={JS.push("inc")} />

    <.Checkbox v-socket={@socket} v-on:toggle={JS.push("toggle")} />

    <.Combobox v-socket={@socket} v-on:select={JS.push("select")} />

    <.table
      id="kpis"
      rows={@streams.kpis}
      row_click={fn {_id, kpi} -> JS.navigate(~p"/kpis/#{kpi}") end}
    >
      <:col :let={{_id, kpi}} label="Id">{kpi.id}</:col>

      <:col :let={{_id, kpi}} label="Label">{kpi.label}</:col>

      <:col :let={{_id, kpi}} label="Value">{kpi.value}</:col>

      <:col :let={{_id, kpi}} label="Trend">{kpi.trend}</:col>

      <:action :let={{_id, kpi}}>
        <div class="sr-only">
          <.link navigate={~p"/kpis/#{kpi}"}>Show</.link>
        </div>

        <.link patch={~p"/kpis/#{kpi}/edit"}>Edit</.link>
      </:action>

      <:action :let={{id, kpi}}>
        <.link
          phx-click={JS.push("delete", value: %{id: kpi.id}) |> hide("##{id}")}
          data-confirm="Are you sure?"
        >
          Delete
        </.link>
      </:action>
    </.table>

    <.modal :if={@live_action in [:new, :edit]} id="kpi-modal" show on_cancel={JS.patch(~p"/kpis")}>
      <.live_component
        module={AshSwarmWeb.KpiLive.FormComponent}
        id={(@kpi && @kpi.id) || :new}
        title={@page_title}
        current_user={@current_user}
        action={@live_action}
        kpi={@kpi}
        patch={~p"/kpis"}
      />
    </.modal>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign_new(:current_user, fn -> nil end)
      |> stream(:kpis, Ash.read!(AshSwarm.Kpis.Kpi, actor: socket.assigns[:current_user]))
      |> assign(:count, 0)
      |> assign(:name, "Hello World")

    {:ok, socket}
  end

  @impl true
  @spec handle_params(any(), any(), map()) :: {:noreply, map()}
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Kpi")
    |> assign(:kpi, Ash.get!(AshSwarm.Kpis.Kpi, id, actor: socket.assigns.current_user))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Kpi")
    |> assign(:kpi, nil)
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Kpis")
    |> assign(:kpi, nil)
  end

  @impl true
  def handle_info({AshSwarmWeb.KpiLive.FormComponent, {:saved, kpi}}, socket) do
    {:noreply, stream_insert(socket, :kpis, kpi)}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    kpi = Ash.get!(AshSwarm.Kpis.Kpi, id, actor: socket.assigns.current_user)
    Ash.destroy!(kpi, actor: socket.assigns.current_user)

    {:noreply, stream_delete(socket, :kpis, kpi)}
  end

  @impl true
  def handle_event("inc", %{"value" => diff}, socket) do
    IO.puts("Incrementing count by #{diff}")
    {:noreply, update(socket, :count, &(&1 + diff))}
  end
end
