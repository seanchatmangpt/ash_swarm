defmodule AshSwarmWeb.Components.Sidebar do
  use Phoenix.Component

  attr :icon, :string, required: true
  attr :label, :string, required: true
  attr :path, :string, required: true
  attr :current_path, :string, required: true

  def sidebar_link(assigns) do
    ~H"""
    <.link
      navigate={@path}
      class={"flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-800 #{if @current_path == @path, do: "bg-gray-800 text-teal-400"}"}
    >
      <span>{@icon}</span>
      <span>{@label}</span>
    </.link>
    """
  end
end
