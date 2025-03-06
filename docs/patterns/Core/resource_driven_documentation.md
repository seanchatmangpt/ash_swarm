# Resource-Driven Living Documentation

**Status**: Not Implemented

## Description

This pattern keeps documentation in sync with resource definitions using code generation and LLMs. It ensures that documentation always reflects the current state of the codebase by automatically generating and updating documentation whenever resources change, leveraging AI to create human-readable explanations and examples.

## Current Implementation

This pattern is not currently implemented in AshSwarm. There are no specific components in the codebase dedicated to automatically generating and maintaining resource documentation.

## Implementation Recommendations

To implement this pattern:

1. Create a documentation generator that extracts metadata from Ash resources
2. Implement an LLM-powered module to create human-readable documentation
3. Add hooks to automatically update documentation when resources change
4. Create a system to maintain documentation history alongside code changes
5. Implement tools to validate documentation accuracy

## Potential Implementation

```elixir
defmodule AshSwarm.LivingDocumentation do
  @moduledoc """
  Generates and maintains documentation based on Ash resources.
  """
  
  @doc """
  Generates documentation for a set of domains or resources.
  
  ## Parameters
  
    - `targets`: List of domains or resources to document
    - `options`: Configuration options for documentation generation
  
  ## Returns
  
    - `{:ok, docs}`: Documentation was generated successfully
    - `{:error, reason}`: An error occurred during generation
  """
  def generate_documentation(targets, options \\ []) do
    resources = gather_resources(targets)
    
    with {:ok, extracted_metadata} <- extract_metadata(resources),
         {:ok, enriched_metadata} <- enrich_with_llm(extracted_metadata),
         {:ok, docs} <- format_documentation(enriched_metadata, options) do
      {:ok, docs}
    end
  end
  
  @doc """
  Writes documentation to the specified output format and location.
  
  ## Parameters
  
    - `docs`: The documentation to write
    - `format`: Output format (`:markdown`, `:html`, `:ex_doc`)
    - `path`: Directory to write documentation to
  
  ## Returns
  
    - `:ok`: Documentation was written successfully
    - `{:error, reason}`: An error occurred during writing
  """
  def write_documentation(docs, format, path) do
    # Implementation to write documentation in the specified format
  end
  
  @doc """
  Sets up hooks to automatically update documentation when resources change.
  
  ## Parameters
  
    - `config`: Configuration for documentation hooks
  
  ## Returns
  
    - `:ok`: Hooks were set up successfully
    - `{:error, reason}`: An error occurred during setup
  """
  def setup_documentation_hooks(config) do
    # Implementation to set up hooks for automatic documentation updates
  end
  
  # Private helper functions
  
  defp gather_resources(targets) do
    # Logic to collect resources from the specified targets
  end
  
  defp extract_metadata(resources) do
    # Extract metadata from resources (attributes, relationships, etc.)
  end
  
  defp enrich_with_llm(metadata) do
    # Use LLM to enhance metadata with human-readable descriptions
    Enum.map(metadata, fn resource_metadata ->
      prompt = build_documentation_prompt(resource_metadata)
      
      case AshSwarm.InstructorHelper.gen(
        %{description: :string, examples: [:string], usage_notes: :string},
        "You are a documentation expert. Create clear and helpful documentation for this resource.",
        prompt
      ) do
        {:ok, result} -> 
          Map.merge(resource_metadata, %{
            description: result.description,
            examples: result.examples,
            usage_notes: result.usage_notes
          })
        {:error, _} -> 
          resource_metadata
      end
    end)
    |> then(&{:ok, &1})
  end
  
  defp format_documentation(enriched_metadata, options) do
    # Format documentation according to options
  end
  
  defp build_documentation_prompt(resource_metadata) do
    # Create a prompt for the LLM to generate documentation
  end
end
```

## Benefits of Implementation

1. **Always Current**: Documentation stays in sync with the actual code
2. **Reduced Maintenance**: Eliminates manual documentation updates
3. **Consistent Quality**: Ensures all resources have comprehensive documentation
4. **Human-Readable**: Uses AI to create natural language explanations
5. **Improved Developer Experience**: Makes it easier to understand the codebase

## Related Resources

- [ExDoc](https://github.com/elixir-lang/ex_doc) 
- [Ash Framework Documentation](https://hexdocs.pm/ash/Ash.html)
- [Living Documentation Principles](https://www.atlassian.com/continuous-delivery/continuous-integration/living-documentation) 