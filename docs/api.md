# AshSwarm API Documentation

This document provides detailed information about the key APIs and interfaces in AshSwarm.

## Table of Contents

- [DSL Modeling](#dsl-modeling)
- [Domain Reasoning](#domain-reasoning)
- [Instructor Helper](#instructor-helper)
- [Reactors](#reactors)
- [Ecto Schemas](#ecto-schemas)

## DSL Modeling

### ToFromDSL

A behavior and macro module that provides serialization capabilities between Elixir and DSL formats (YAML, JSON).

**Location**: `lib/ash_swarm/to_from_dsl.ex`

#### Behavior Callbacks

```elixir
@callback model_dump(struct()) :: map()
@callback model_validate(map()) :: struct()
@callback model_dump_json(struct(), keyword()) :: String.t()
```

#### Provided Functions

When a module uses `ToFromDSL`, it gets these functions:

| Function | Description | Parameters |
|----------|-------------|------------|
| `from_map/1` | Creates a struct from a map | `data` - Map to convert |
| `from_yaml/2` | Creates a struct from YAML content | `content` - YAML string (optional), `file_path` - Path to YAML file (optional) |
| `from_json/2` | Creates a struct from JSON content | `content` - JSON string (optional), `file_path` - Path to JSON file (optional) |
| `to_yaml/2` | Converts struct to YAML | `instance` - Struct to convert, `file_path` - Path to save (optional) |
| `to_json/2` | Converts struct to JSON | `instance` - Struct to convert, `file_path` - Path to save (optional) |

#### Example Usage

```elixir
defmodule MyModel do
  use ToFromDSL
  
  defstruct [:name, :value]
  
  @impl true
  def model_dump(%__MODULE__{} = struct), do: Map.from_struct(struct)
  
  @impl true
  def model_validate(data) when is_map(data) do
    %__MODULE__{
      name: Map.get(data, "name") || Map.get(data, :name),
      value: Map.get(data, "value") || Map.get(data, :value)
    }
  end
  
  @impl true
  def model_dump_json(%__MODULE__{} = struct, opts \\ []) do
    indent = Keyword.get(opts, :indent, 2)
    Jason.encode!(Map.from_struct(struct), pretty: indent > 0)
  end
end

# Usage
model = MyModel.from_yaml("name: test\nvalue: 123")
yaml_string = MyModel.to_yaml(model)
json_string = MyModel.to_json(model)
```

### AshSwarm.DSLModel

An example implementation of the `ToFromDSL` behavior.

**Location**: `lib/ash_swarm/dsl_model.ex`

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | Required name field |
| `description` | String | Optional description |
| `count` | Integer | Optional count value |

## Domain Reasoning

### AshSwarm.DomainReasoning

Core module for domain reasoning functionality.

**Location**: `lib/ash_swarm/domain_reasoning.ex`

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `resources` | List | List of resources in the domain |
| `steps` | List | List of reasoning steps |
| `final_answer` | String | The final answer/conclusion |

#### Example Usage

```elixir
domain = AshSwarm.DomainReasoning.from_yaml("resources:\n  - name: User\n    attributes:\n      - name: email")
yaml_string = AshSwarm.DomainReasoning.to_yaml(domain)
```

## Instructor Helper

### AshSwarm.InstructorHelper

A helper module for interacting with LLMs through the Instructor library.

**Location**: `lib/ash_swarm/instructor_helper.ex`

#### Functions

##### `gen/4`

Generates a completion using Instructor.chat_completion.

**Parameters**:

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `response_model` | Map/Schema | Expected structure for response | Required |
| `sys_msg` | String | System message for the LLM | Required |
| `user_msg` | String | User prompt | Required |
| `model` | String | LLM model to use | System default or "llama-3.1-8b-instant" |

**Returns**:
- `{:ok, result}` on success
- `{:error, reason}` on failure

**Example**:

```elixir
AshSwarm.InstructorHelper.gen(
  %{answer: :string},
  "You are a helpful assistant.",
  "What is the capital of France?",
  "gpt-4o"
)
```

## Reactors

### AshSwarm.Reactors.QASaga

A Reactor for orchestrating question-answer interactions with LLMs.

**Location**: `lib/ash_swarm/reactors/qa_saga.ex`

#### Inputs

| Input | Description |
|-------|-------------|
| `question` | The question to ask the LLM |

#### Steps

| Step | Description |
|------|-------------|
| `ask_question` | Calls the Question resource's `:ask` action |

#### Returns

The result of the `ask_question` step.

#### Example Usage

```elixir
Reactor.run(AshSwarm.Reactors.QASaga, %{question: "What is the meaning of life?"})
```

### AshSwarm.Reactors.QASagaJob

An Oban worker for executing the QASaga reactor as a background job.

**Location**: `lib/ash_swarm/reactors/qa_saga_job.ex`

#### Oban Configuration

| Property | Value |
|----------|-------|
| `queue` | `:default` |
| `max_attempts` | `3` |

#### Job Args

| Arg | Type | Description |
|-----|------|-------------|
| `question` | String | The question to process |

#### Example Usage

```elixir
%{question: "What is the meaning of life?"}
|> Oban.new(worker: AshSwarm.Reactors.QASagaJob)
|> AshSwarm.Repo.insert()
```

### AshSwarm.Reactors.Question

An Ash Resource for handling questions and answers.

**Location**: `lib/ash_swarm/reactors/question.ex`

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | UUID | Primary key |
| `question` | String | The question text |
| `answer` | String | The answer text |

#### Actions

| Action | Type | Description |
|--------|------|-------------|
| `:ask` | String | Submits a question to the LLM and returns the answer |

**Parameters for `:ask`**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `question` | String | The question to ask |

## Ecto Schemas

### AshSwarm.EctoSchema.DomainReasoning

Ecto schema for domain reasoning data.

**Location**: `lib/ash_swarm/ecto_schema/domain_reasoning.ex`

#### Schema Structure

| Field | Type | Description |
|-------|------|-------------|
| `resources` | List | Embedded list of DomainResource structs |
| `steps` | List | Embedded list of DomainStep structs |
| `final_answer` | String | Final reasoning outcome |

#### Example Usage

```elixir
alias AshSwarm.EctoSchema.DomainReasoning
alias AshSwarm.EctoSchema.DomainResource
alias AshSwarm.EctoSchema.DomainStep

%DomainReasoning{
  resources: [
    %DomainResource{name: "User", attributes: [%{name: "email", type: "string"}]}
  ],
  steps: [
    %DomainStep{
      explanation: "Added User resource",
      output: "Created User with email attribute"
    }
  ],
  final_answer: "Domain model complete with User resource"
}
```

### AshSwarm.EctoSchema.DomainResource

Ecto schema for a domain resource.

**Location**: `lib/ash_swarm/ecto_schema/domain_reasoning.ex`

#### Schema Structure

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Resource name |
| `attributes` | List of maps | Resource attributes |
| `relationships` | List of maps | Resource relationships |
| `default_actions` | List of strings | Default actions for the resource |
| `primary_key` | Map | Primary key configuration |
| `domain` | String | Domain the resource belongs to |
| `extends` | List of strings | Extensions applied to the resource |
| `base` | String | Base module for the resource |
| `timestamps` | Boolean | Whether to include timestamps |

### AshSwarm.EctoSchema.DomainStep

Ecto schema for a domain reasoning step.

**Location**: `lib/ash_swarm/ecto_schema/domain_reasoning.ex`

#### Schema Structure

| Field | Type | Description |
|-------|------|-------------|
| `explanation` | String | Textual explanation of the reasoning |
| `output` | String | Result or outcome of the step | 