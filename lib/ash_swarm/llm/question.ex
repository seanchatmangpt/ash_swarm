defmodule AshSwarm.Llm.Question do
  use Ash.Resource,
    otp_app: :ash_swarm,
    domain: AshSwarm.Llm,
    data_layer: Ash.DataLayer.Ets

  actions do
    defaults [:read, :destroy, create: [:question, :answer], update: [:question, :answer]]
    action :ask, :string do
      argument :question, :string, allow_nil?: false
      description "Submit a question to the LLM and receive an answer."

      run fn input, _ ->
        sys_msg = "You are a PhD solution architect."
        user_msg = input.arguments.question

        case AshSwarm.InstructorHelper.gen(%{answer: :string}, sys_msg, user_msg) do
          {:ok, %{answer: answer}} ->
            {:ok, answer}

          {:error, error} ->
            {:error, error}
        end
      end
    end
  end

  attributes do
    uuid_primary_key :id

    attribute :question, :string do
      allow_nil? false
    end

    attribute :answer, :string
    timestamps()
  end
end
