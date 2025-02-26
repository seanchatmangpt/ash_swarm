defmodule AshSwarmTest.DomainReasoningYAMLTest do
  use ExUnit.Case, async: true

  alias AshSwarm.DomainReasoning

  @fixture "test/fixtures/domain_reasoning.yaml"
  @modified "test/fixtures/domain_reasoning_modified.yaml"

  test "loads domain reasoning from YAML, modifies it, and writes a modified copy" do
    # Ensure the fixture file exists
    assert File.exists?(@fixture)

    # Load the domain reasoning from YAML
    reasoning = DomainReasoning.from_yaml(nil, @fixture)
    assert reasoning.final_answer =~ "SCOR ERP project is structured"

    # Modify the final_answer field
    modified_reasoning = %DomainReasoning{
      reasoning
      | final_answer: "Modified final answer for testing."
    }

    # Write the modified reasoning to a new YAML file
    DomainReasoning.to_yaml(modified_reasoning, @modified)
    assert File.exists?(@modified)

    # Reload the modified file and verify the changes
    modified_loaded = DomainReasoning.from_yaml(nil, @modified)
    assert modified_loaded.final_answer == "Modified final answer for testing."

    # Clean up the modified file
    # File.rm(@modified)
  end
end
