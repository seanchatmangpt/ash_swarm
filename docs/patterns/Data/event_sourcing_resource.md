# Event Sourcing Resource Pattern

## Status
**Not Implemented**

## Description
The Event Sourcing Resource pattern implements event sourcing principles on top of Ash resources, tracking all changes as immutable events and enabling rebuilding resource state from the event history. This pattern captures the complete history of all changes to resources, provides audit capabilities, enables temporal queries (time travel), and supports reliable event-driven architectures.

This pattern is particularly valuable for applications with strong audit requirements, complex business processes, or those needing to support event-driven architectures.

## Current Implementation
AshSwarm does not currently implement this pattern. While Ash Framework provides some foundations for event handling, there is no comprehensive event sourcing implementation in the current codebase.

## Implementation Recommendations
To implement this pattern in AshSwarm, consider:

1. Creating an event sourcing extension for Ash resources:
   - Define event types and event schemas
   - Integrate with Ash's action pipeline
   - Implement event storage and retrieval

2. Building event serialization and deserialization:
   - Ensure all events are properly serialized for storage
   - Support versioning for event schemas
   - Handle event upgrades as schemas evolve

3. Implementing state reconstruction:
   - Build utilities to replay events and reconstruct state
   - Support point-in-time queries
   - Optimize for performance with snapshots

4. Adding event processing and projections:
   - Support for event subscribers
   - Tools for building read models/projections
   - Integration with event buses or streaming platforms

## Potential Implementation

```elixir
defmodule AshSwarm.Patterns.EventSourcedResource do
  defmacro __using__(opts) do
    quote do
      use Ash.Resource, unquote(opts)
      
      # Track all changes as events
      event_sourcing do
        store Keyword.get(unquote(opts), :event_store, AshSwarm.EventStore)
        serializer Keyword.get(unquote(opts), :serializer, Jason)
        
        # Define event types
        events do
          event :created
          event :updated
          event :deleted
          # Custom events
        end
        
        # Event versioning
        versioning do
          strategy :increment
          field :version
        end
      end
      
      # For each action, record events
      after_action :create, :record_created_event
      after_action :update, :record_updated_event
      after_action :destroy, :record_deleted_event
      
      # Implementation of event recording
      def record_created_event(resource, _action_result, _) do
        AshSwarm.Patterns.EventSourcedResource.record_event(resource, :created)
        {:ok, resource}
      end
      
      def record_updated_event(resource, action_result, _) do
        # Extract changes from action_result
        changes = Map.get(action_result, :changes, %{})
        AshSwarm.Patterns.EventSourcedResource.record_event(resource, :updated, %{changes: changes})
        {:ok, resource}
      end
      
      def record_deleted_event(resource, _action_result, _) do
        AshSwarm.Patterns.EventSourcedResource.record_event(resource, :deleted)
        {:ok, resource}
      end
    end
  end
  
  # Event store functions
  def record_event(resource, event_type, metadata \\ %{}) do
    resource_module = resource.__struct__
    store = resource_module.__event_sourcing__().store
    serializer = resource_module.__event_sourcing__().serializer
    
    event = %{
      id: Ecto.UUID.generate(),
      resource_type: resource_module,
      resource_id: resource.id,
      event_type: event_type,
      data: serializer.encode!(Map.from_struct(resource)),
      metadata: serializer.encode!(metadata),
      version: resource.version,
      created_at: DateTime.utc_now()
    }
    
    store.append_event(event)
  end
  
  def rebuild_from_events(resource_module, id) do
    store = resource_module.__event_sourcing__().store
    serializer = resource_module.__event_sourcing__().serializer
    
    events = store.get_events(resource_module, id)
    
    Enum.reduce(events, nil, fn event, acc ->
      event_data = serializer.decode!(event.data)
      
      case event.event_type do
        :created ->
          struct(resource_module, event_data)
        
        :updated ->
          # Apply changes to the accumulator
          changes = serializer.decode!(event.metadata).changes
          Map.merge(acc, changes)
        
        :deleted ->
          # Mark as deleted but keep the data
          Map.put(acc, :deleted, true)
        
        _ ->
          # Custom event handling would go here
          acc
      end
    end)
  end
end

# Event store implementation example
defmodule AshSwarm.EventStore do
  def append_event(event) do
    # Implementation for storing events
    # Could use PostgreSQL, EventStoreDB, or other storage
  end
  
  def get_events(resource_type, resource_id) do
    # Implementation for retrieving events
  end
end
```

## Usage Example

```elixir
defmodule MyApp.Resources.Order do
  use AshSwarm.Patterns.EventSourcedResource,
    event_store: MyApp.OrderEventStore
  
  # Custom events specific to this resource
  events do
    event :payment_received
    event :shipped
    event :canceled
  end
  
  # Add custom actions to record domain events
  actions do
    # Basic CRUD actions
    defaults [:create, :read, :update, :destroy]
    
    # Domain-specific action
    action :record_payment, :update do
      accept [:payment_id, :amount]
      
      change set_attribute(:payment_status, :paid)
      
      after_action :record_payment_event
    end
  end
  
  # Custom event recorder for payment
  def record_payment_event(order, _action_result, _) do
    AshSwarm.Patterns.EventSourcedResource.record_event(
      order, 
      :payment_received, 
      %{payment_id: order.payment_id, amount: order.amount}
    )
    {:ok, order}
  end
  
  # Resource definition...
end

# Querying at a point in time
order_at_time = AshSwarm.Patterns.EventSourcedResource.as_of(
  MyApp.Resources.Order,
  "order-123",
  ~U[2025-02-15 12:00:00Z]
)
```

## Benefits of Implementation
Implementing this pattern would provide several benefits:

1. **Complete Audit Trail**: Track the full history of all changes to resources.
2. **Temporal Queries**: Support for "time travel" queries to see resource state at any point in time.
3. **Event-Driven Architecture**: Enable reliable event publishing for integration with other systems.
4. **Debugging**: Easier troubleshooting by examining the exact sequence of changes.
5. **Compliance**: Meet regulatory requirements for data history and auditing.

## Related Resources
- [Event Sourcing Pattern](https://martinfowler.com/eaaDev/EventSourcing.html)
- [Elixir Event Sourcing](https://github.com/commanded/commanded)
- [Event Store](https://www.eventstore.com/) 