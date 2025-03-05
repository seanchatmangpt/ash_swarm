# Resource-to-Legacy Integration Pattern

## Status
**Not Implemented**

## Description
The Resource-to-Legacy Integration pattern creates a bridge between Ash resources and existing non-Ash schemas, databases, or APIs. This pattern enables gradual migration from legacy systems to Ash Framework while maintaining interoperability, allowing teams to incrementally adopt Ash without requiring a complete system rewrite.

This pattern is particularly valuable for organizations with significant investment in existing systems that want to benefit from Ash's capabilities without disrupting current operations.

## Current Implementation
AshSwarm does not currently have a specific implementation of this pattern. The codebase shows no direct integration with legacy systems outside of Ash Framework.

## Implementation Recommendations
To implement this pattern in AshSwarm, consider:

1. Creating a bridge module that:
   - Maps Ash attributes to legacy system fields
   - Handles data conversion and transformation between systems
   - Provides synchronization capabilities

2. Implementing adapter resources that:
   - Wrap legacy systems with an Ash-compatible interface
   - Handle create, read, update, delete operations against legacy data
   - Propagate changes bidirectionally

3. Adding transaction support:
   - Ensuring atomic operations across both Ash and legacy systems
   - Managing rollbacks when operations fail on either side

4. Building data migration utilities:
   - Tools to facilitate gradual migration from legacy to Ash
   - Verification of data consistency between systems

## Potential Implementation

```elixir
defmodule AshSwarm.Patterns.LegacyBridge do
  defmacro __using__(opts) do
    quote do
      use Ash.Resource, unquote(opts)
      
      # Define how to map between Ash and legacy systems
      legacy_mapping do
        schema Keyword.get(unquote(opts), :legacy_schema)
        table Keyword.get(unquote(opts), :legacy_table)
        
        field_mappings do
          map :id, to: "legacy_id"
          map :inserted_at, to: "created_timestamp"
          # Additional mappings
        end
      end
      
      # Actions that work with both systems
      actions do
        action :sync_with_legacy, :update do
          run fn input, _context ->
            # Synchronization logic
          end
        end
      end
    end
  end
  
  # Implement the actual bridge functionality
  def sync_data(ash_resource, legacy_schema) do
    # Implementation for bidirectional synchronization
  end
end
```

## Adapter Example for Ecto Schema

```elixir
defmodule AshSwarm.Patterns.EctoAdapter do
  def create_adapter_resource(ecto_schema) do
    resource_name = "#{ecto_schema}_adapter" |> String.to_atom()
    
    quote do
      defmodule unquote(resource_name) do
        use Ash.Resource,
          data_layer: AshSwarm.DataLayer.EctoAdapter
        
        ecto_adapter do
          schema unquote(ecto_schema)
          repo MyApp.Repo
        end
        
        # Generated attributes based on Ecto schema
        attributes do
          # Dynamic attribute generation would happen here
        end
        
        # Generated actions
        actions do
          defaults [:create, :read, :update, :destroy]
        end
      end
    end
    |> Code.eval_quoted()
  end
end
```

## Benefits of Implementation
Implementing this pattern would provide several benefits:

1. **Gradual Migration**: Enables incremental adoption of Ash Framework without a complete rewrite.
2. **Risk Reduction**: Reduces the risk associated with full system rewrites.
3. **Legacy Investment Protection**: Preserves the value of existing systems while adopting new technology.
4. **Parallel Development**: Allows teams to work on both systems simultaneously during transition periods.
5. **Simplified Integration**: Provides a consistent approach to integrating with existing systems.

## Related Resources
- [Ash Framework Data Layers](https://hexdocs.pm/ash/data-layers.html)
- [Ecto Integration Patterns](https://hexdocs.pm/ecto/Ecto.html)
- [Strangler Fig Pattern](https://martinfowler.com/bliki/StranglerFigApplication.html) 