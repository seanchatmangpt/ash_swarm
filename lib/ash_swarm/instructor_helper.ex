defmodule AshSwarm.InstructorHelper do
  @moduledoc """
  A helper module for interacting with Instructor_ex.

  Provides a function `gen/4` which wraps the call to Instructor.chat_completion.
  """
  use Instructor

  @doc """
  Generates a completion using Instructor.chat_completion.

  ## Parameters

    - `response_model`: The expected structure for the response (either a map or an Ecto embedded schema).
    - `sys_msg`: The system message providing context to the language model.
    - `user_msg`: The user prompt.
    - `model`: (Optional) The model to use. Defaults to `"llama-3.1-8b-instant"`.

  ## Returns

    - `{:ok, result}` on success.
    - `{:error, reason}` on failure.
  """
  def gen(response_model, sys_msg, user_msg, model \\ "llama-3.3-70b-specdec") do
    params = [
      mode: :tools,
      model: model,
      messages: [
        %{role: "system", content: sys_msg},
        %{role: "user", content: user_msg}
      ],
      response_model: response_model
    ]

    Instructor.chat_completion(params)
  end
end
