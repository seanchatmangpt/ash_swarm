defmodule AshSwarm.Reactors.QASaga do
  use Ash.Reactor

  ash do
    default_domain AshSwarm.Reactors
  end

  # Define the input to the saga.
  input(:question)

  # Use an action step that calls our resource's :ask action.
  action :ask_question, AshSwarm.Reactors.Question, :ask do
    inputs(%{question: input(:question)})
  end

  # Return the result of the ask_question step.
  return(:ask_question)
end
