defmodule AshSwarmWeb.Components.RightPanel do
  use Phoenix.Component

  attr :notifications, :list, required: true

  def right_panel(assigns) do
    ~H"""
    <div class="w-80 bg-gray-50 p-4 border-l border-gray-200 hidden lg:block">
      <h2 class="text-lg font-bold mb-3">Notifications</h2>
      <div class="space-y-2">
        <%= for notification <- @notifications do %>
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <div class="flex items-start">
              <span class={"w-2 h-2 mt-2 rounded-full mr-2 #{notification_color(notification.type)}"}>
              </span>
              <div class="flex-1">
                <p class="text-sm">{notification.message}</p>
                <span class="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          </div>
        <% end %>
      </div>
    </div>
    """
  end

  defp notification_color("warning"), do: "bg-yellow-400"
  defp notification_color("success"), do: "bg-green-400"
  defp notification_color("error"), do: "bg-red-400"
end
