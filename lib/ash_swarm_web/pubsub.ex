defmodule AshSwarm.PubSub do
  @pubsub_name AshSwarm.PubSub

  def broadcast(topic, event, message) do
    Phoenix.PubSub.broadcast(@pubsub_name, topic, %{event: event, message: message})
  end

  def subscribe(topic) do
    Phoenix.PubSub.subscribe(@pubsub_name, topic)
  end
end
