defmodule AshSwarm.Llm do
  use Ash.Domain,
    otp_app: :ash_swarm

  resources do
    resource AshSwarm.Llm.Question do
      define :ask_question, args: [:question], action: :ask
      define :create_qa, args: [:question, :answer], action: :create
    end
  end
end
