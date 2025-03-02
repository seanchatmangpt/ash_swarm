defmodule AshSwarm.Steps.GenerateAnswerStep do
  use Reactor.Step

  @impl true
  def run(arguments, _context, _options) do
    sys_msg = "You are a helpful assistant."
    user_msg = arguments.question

    case AshSwarm.InstructorHelper.gen(%{answer: :string}, sys_msg, user_msg) do
      {:ok, %{answer: answer}} -> {:ok, answer}
      {:error, error} -> {:error, error}
    end
  end
end
