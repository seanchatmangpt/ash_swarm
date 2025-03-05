# LLM-Augmented Runtime Validation

**Status**: Partially Implemented

## Description

This pattern combines Ash's validation capabilities with LLM-powered contextual validation for complex business rules. Rather than relying solely on programmatic validation, this approach leverages LLMs to validate data against complex, context-sensitive business rules that might be difficult to express programmatically.

## Current Implementation

The pattern is partially implemented in AshSwarm through:

1. The `AshSwarm.InstructorHelper` module, which provides a standardized interface to the LLM
2. Usage in the `AshSwarm.Reactors.Question` resource for LLM-powered validation of questions
3. Integration with the Instructor library for structured responses

### Key Components

- `lib/ash_swarm/instructor_helper.ex`: Helper module for interacting with the Instructor library
- `lib/ash_swarm/reactors/question.ex`: Example usage in the Question resource
- `live_books/ash_domain_reasoning.livemd`: Examples of using structured LLM validation

### Example Usage

The current implementation demonstrates:
1. Using LLMs to validate and transform input data
2. Structured response handling with Instructor
3. Integration with Ash resources for Q&A functionality

## Implementation Gaps

While the current implementation provides basic LLM validation, it's not yet fully integrated with Ash's validation system:

1. No dedicated Ash extension for LLM validation
2. Limited to specific use cases (Q&A) rather than general validation
3. No caching or optimization for repeated validation calls
4. No integration with Ash's validation pipeline

## Implementation Recommendations

To fully implement this pattern:

1. Create an Ash extension that adds LLM validation capabilities
2. Implement a DSL for defining LLM validation rules
3. Add caching and optimization for efficient validation
4. Integrate with Ash's error reporting system
5. Create testing tools for LLM validations

## Code Examples

Current implementation in instructor_helper.ex:

```elixir
defmodule AshSwarm.InstructorHelper do
  @moduledoc """
  A helper module for interacting with Instructor_ex.

  Provides a function `gen/4` which wraps the call to Instructor.chat_completion.
  """

  @doc """
  Generates a completion using Instructor.chat_completion.

  ## Parameters

    - `response_model`: The expected structure for the response (map, Ecto embedded schema, or partial).
    - `sys_msg`: The system message providing context to the LLM.
    - `user_msg`: The user prompt.
    - `model`: (Optional) The LLM model to use. Defaults to `"llama-3.1-8b-instant"`.

  ## Returns

    - `{:ok, result}` on success.
    - `{:error, reason}` on failure.
  """
  def gen(response_model, sys_msg, user_msg, model \\ nil) do
    # HACK: This is a temporary solution. The model should be properly configurable.
    default_model = "llama-3.1-8b-instant"
    model = model || System.get_env("ASH_SWARM_DEFAULT_MODEL", default_model)

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
```

Example usage in question.ex:

```elixir
defmodule AshSwarm.Reactors.Question do
  use Ash.Resource,
    otp_app: :ash_swarm,
    domain: AshSwarm.Reactors,
    data_layer: Ash.DataLayer.Ets,
    extensions: [AshAdmin.Resource]

  actions do
    defaults [:read, :destroy, create: [:question, :answer], update: [:question, :answer]]

    action :ask, :string do
      argument :question, :string, allow_nil?: false
      description "Submit a question to the LLM and receive an answer."

      run fn input, _ ->
        sys_msg = "You are a helpful assistant."
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

  # Additional resource configuration...
end
```

## Related Resources

- [Ash Framework Validation Documentation](https://hexdocs.pm/ash/Ash.Changeset.Validations.html)
- [Instructor Library](https://github.com/thmsmlr/instructor_ex)
- [Combining Rules-Based and LLM Systems](https://www.promptingguide.ai/techniques/rag) 