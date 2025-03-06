defmodule AshSwarmWeb.AnalyticsLive.Index do
  use AshSwarmWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, assign(socket, page_title: "AnalyticsLive")}
  end

  def render(assigns) do
    ~H"""
    <div class="p-8">
      <h1 class="text-3xl font-bold">AnalyticsLive</h1>
      <p class="text-gray-500">This page is under development.</p>
    </div>
    """
  end
end
