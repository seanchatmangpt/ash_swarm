defmodule AshSwarmWeb.DashboardLive do
  use AshSwarmWeb, :live_view

  alias AshSwarm.Workflows
  alias AshSwarm.Kpis

  @impl true
  def mount(params, _session, socket) do
    # Detect if it's a fresh page load or a LiveView navigation
    current_path = params["_live_link"] || get_current_path(socket)

    workflows = fetch_workflows()
    kpis = fetch_kpis() |> update_active_workflows_kpi(workflows)

    {:ok,
     socket
     |> assign(:workflows, workflows)
     |> assign(:kpis, kpis)
     |> assign(:current_path, current_path), layout: {AshSwarmWeb.Layouts, :dashboard}}
  end

  defp fetch_workflows do
    case Workflows.read_workflows() do
      {:ok, workflows} -> workflows
      {:error, _reason} -> []
    end
  end

  defp fetch_kpis do
    case Kpis.read_kpis() do
      {:ok, kpis} -> kpis
      {:error, _reason} -> []
    end
  end

  defp update_active_workflows_kpi(kpis, workflows) do
    active_count = length(workflows)

    Enum.map(kpis, fn
      %{label: "Active Workflows"} = kpi -> Map.put(kpi, :value, to_string(active_count))
      kpi -> kpi
    end)
  end

  defp get_current_path(socket) do
    case get_connect_params(socket) do
      %{"_live_link" => path} -> path
      _ -> "/dashboard"
    end
  end
end
