# Resource-Driven State Machines Pattern

**Status:** Not Implemented

## Description

The Resource-Driven State Machines Pattern extends Ash Resources with declarative state machine capabilities, allowing resources to define valid state transitions, side effects, and guards directly in their DSL definition. This pattern seamlessly integrates state-based behavior modeling with Ash's powerful resource capabilities.

Unlike traditional state machine implementations that exist separately from data models, this pattern embeds state machine logic directly into resources, ensuring that:

1. State transitions are data-aware and can use resource attributes for conditional logic
2. Transitions are transaction-safe, ensuring data consistency
3. Authorization can be integrated directly into state transitions
4. State transition history is automatically tracked
5. Domain logic remains encapsulated within the resource definition

By leveraging Ash's DSL extension capabilities and transaction handling, resources become behavior-rich entities that safely manage their own state transitions while preserving a declarative programming model.

## Key Components

### 1. State Machine DSL Extension

The pattern provides an `AshStateMachine` extension that adds a `state_machine` DSL section to Ash Resources:

```elixir
defmodule MyApp.Order do
  use Ash.Resource,
    extensions: [AshStateMachine]
    
  state_machine do
    states [:pending, :processing, :shipped, :delivered, :canceled]
    initial_state :pending
    
    transitions do
      transition :process, from: [:pending], to: :processing do
        authorize :by_actor_attribute, attribute: :role, value: "admin"
      end
      
      transition :ship, from: [:processing], to: :shipped do
        change set_attribute(:shipped_at, &DateTime.utc_now/0)
      end
      
      transition :deliver, from: [:shipped], to: :delivered
      transition :cancel, from: [:pending, :processing], to: :canceled
    end

    # Optional custom validation during state transitions
    validate_transition fn changeset, from, to, context ->
      case {from, to} do
        {:pending, :processing} ->
          if get_attribute(changeset, :total_amount) <= 0 do
            {:error, "Cannot process an order with zero amount"}
          else
            :ok
          end
        _ -> :ok
      end
    end

    # Optional automatic side effects after transitions
    after_transition fn resource, from, to, context ->
      case to do
        :shipped -> 
          MyApp.Notifications.send_shipping_notification(resource)
        _ -> :ok
      end
    end
  end
  
  attributes do
    attribute :status, :atom do
      constraints [one_of: [:pending, :processing, :shipped, :delivered, :canceled]]
      default :pending
    end
    
    attribute :total_amount, :decimal
    attribute :shipped_at, :utc_datetime_usec
    attribute :delivered_at, :utc_datetime_usec
  end

  # Automatically generated action for each transition
  # Each action ensures proper state transitions
end
```

### 2. Generated Transition Actions

The pattern automatically generates Ash actions for each transition, with proper validation and authorization:

```elixir
# Generated under the hood by the extension
actions do
  action :process, :update do
    accept []
    
    argument :reason, :string do
      allow_nil? true
    end
    
    change AshStateMachine.TransitionChange,
      from: :pending, 
      to: :processing,
      transition: :process
  end
  
  action :ship, :update do
    accept []
    
    change AshStateMachine.TransitionChange,
      from: :processing, 
      to: :shipped, 
      transition: :ship,
      attribute_changes: [
        shipped_at: &DateTime.utc_now/0
      ]
  end
  
  # Additional transition actions...
end
```

### 3. Transition Tracking

The pattern optionally tracks transition history using Ash's built-in tracking capabilities:

```elixir
defmodule MyApp.OrderTransition do
  use Ash.Resource,
    data_layer: AshPostgres.DataLayer

  postgres do
    table "order_transitions"
    repo MyApp.Repo
  end

  attributes do
    uuid_primary_key :id
    
    attribute :order_id, :uuid, allow_nil?: false
    attribute :from_state, :atom, allow_nil?: false
    attribute :to_state, :atom, allow_nil?: false
    attribute :transition, :atom, allow_nil?: false
    attribute :actor_id, :uuid
    attribute :reason, :string
    attribute :metadata, :map
    
    create_timestamp :created_at
  end

  relationships do
    belongs_to :order, MyApp.Order
    belongs_to :actor, MyApp.User
  end
end
```

## Implementation Recommendations

To effectively implement this pattern:

1. **Create an Extension**: Build an `AshStateMachine` extension that adds the state machine DSL to Ash resources
2. **Ensure Transaction Safety**: Implement transition actions that use Ash's transaction capabilities
3. **Validate Transitions**: Perform validation during transitions to ensure state integrity
4. **Generate Actions Dynamically**: Use metaprogramming to generate transition actions based on the state machine definition
5. **Implement History Tracking**: Create a mechanism to track transition history for auditing and analysis
6. **Add Event Dispatch**: Dispatch events on state transitions for system-wide coordination
7. **Support Custom Logic**: Allow custom validation and side effect functions during transitions
8. **Provide Visual Tools**: Build tools to visualize state machines for documentation and analysis

## Benefits

The Resource-Driven State Machines Pattern offers numerous benefits:

1. **Data Consistency**: Ensures that resources transition between states in a consistent and predictable manner
2. **Reduced Complexity**: Encapsulates state transition logic directly in the resource definition
3. **Improved Security**: Integrates authorization directly into state transitions
4. **Better Auditability**: Automatically tracks state transition history
5. **Enhanced Documentation**: Makes state transitions explicit and self-documenting
6. **Reduced Bugs**: Prevents invalid state transitions through declarative constraints

## Potential Challenges

Implementing this pattern may present certain challenges:

1. **DSL Complexity**: Balancing expressiveness with simplicity in the state machine DSL
2. **Performance Overhead**: Managing the performance impact of transition tracking
3. **Integration Complexity**: Ensuring proper integration with existing Ash extensions
4. **Migration Challenges**: Supporting migration of existing resources to use state machines

## Related Patterns

This pattern relates to several other architectural patterns:

- **Cross-Resource State Machine**: Extends state machines to span multiple related resources
- **Hierarchical Multi-Level Reactor Pattern**: Combines state machines with hierarchical reactors
- **Event Sourcing Resource**: Uses events to drive state transitions and maintain history

## Conclusion

The Resource-Driven State Machines Pattern represents a powerful fusion of state machine concepts with Ash's resource-driven approach. By embedding state transition logic directly into resources, it creates more robust, self-contained domain models that enforce business rules at the data level while maintaining Ash's elegant declarative style. 