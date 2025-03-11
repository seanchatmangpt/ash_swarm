defmodule AshSwarm.RepoListener do
  @moduledoc """
  GenServer that listens for issue events.
  """

  def start_link(init \\ [], opts \\ []) do
    GenServer.start_link(__MODULE__, init, opts)
  end

  def init(_default_args) do
    state = %{}
    AshSwarm.PubSub.subscribe("issues")
    {:ok, state}
  end

  def handle_info(%{event: "created", message: message}, state) do
    question = """
    We were given an issue called "#{message["issue"]["title"]}" with body:
    #{message["issue"]["body"]}.

    What do we need to do to implement this issue?
    """

    Reactor.run(AshSwarm.Reactors.QASaga, %{question: question})
    {:noreply, state}
  end
end
