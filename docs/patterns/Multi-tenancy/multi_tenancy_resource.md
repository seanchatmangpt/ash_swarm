# Multi-Tenancy Resource Pattern

## Status
**Not Implemented**

## Description
The Multi-Tenancy Resource pattern provides comprehensive support for building multi-tenant applications with Ash resources. It extends Ash's resource model to handle tenant isolation, data partitioning, tenant-specific customizations, and cross-tenant operations within a single application instance.

This pattern is particularly valuable for SaaS applications, enterprise systems serving multiple business units, or any application that needs to maintain strict data segregation between different user groups while sharing the same codebase and infrastructure.

## Current Implementation
AshSwarm does not currently implement a dedicated multi-tenancy pattern. While Ash Framework provides some building blocks for implementing multi-tenancy through filters and policies, there is no comprehensive, reusable pattern for multi-tenant resources in the current codebase.

## Implementation Recommendations
To implement this pattern in AshSwarm, consider:

1. Creating a tenant-aware resource extension:
   - Automatic tenant scoping for all queries
   - Tenant identification and context propagation
   - Support for tenant-specific resource customizations
   - Cross-tenant operation safety mechanisms

2. Implementing tenant data isolation:
   - Proven partition strategies (schema-based, row-based, etc.)
   - Tenant-based authorization policies
   - Tenant data migration tools
   - Tenant resource provisioning

3. Adding tenant-specific customization capabilities:
   - Custom fields per tenant
   - Tenant-specific validations and business rules
   - Tenant-specific UI configuration
   - Tenant settings management

4. Building tenant administration tools:
   - Tenant creation and management
   - Tenant resource allocation and limits
   - Tenant usage analytics
   - Cross-tenant operations for administrators

## Potential Implementation

```elixir
defmodule AshSwarm.Patterns.MultiTenancy do
  @moduledoc """
  Provides multi-tenancy capabilities for Ash resources.
  
  This module extends Ash resources with tenant awareness, ensuring proper
  data isolation between tenants and supporting tenant-specific customizations.
  """
  
  defmacro __using__(opts) do
    quote do
      use Ash.Resource, unquote(opts)
      
      # Set up tenant configuration
      @tenant_options unquote(Keyword.get(opts, :tenant_options, []))
      @tenant_strategy unquote(Keyword.get(opts, :tenant_strategy, :attribute))
      @tenant_attribute unquote(Keyword.get(opts, :tenant_attribute, :tenant_id))
      @cross_tenant_actions unquote(Keyword.get(opts, :cross_tenant_actions, []))
      
      # Register for multi-tenancy capabilities
      Module.register_attribute(__MODULE__, :tenant_config, accumulate: false)
      Module.put_attribute(__MODULE__, :tenant_config, %{
        strategy: @tenant_strategy,
        attribute: @tenant_attribute,
        cross_tenant_actions: @cross_tenant_actions
      })
      
      # Register callbacks for tenant handling
      @before_compile AshSwarm.Patterns.MultiTenancy
      
      # Add tenant attribute if using attribute strategy
      if @tenant_strategy == :attribute do
        attributes do
          attribute @tenant_attribute, :string, allow_nil?: false
        end
      end
    end
  end
  
  defmacro __before_compile__(env) do
    quote do
      def __tenant_config__, do: @tenant_config
      
      # Hook into the query pipeline to ensure tenant scoping
      def with_tenant(query, tenant_id, opts \\ []) do
        AshSwarm.Patterns.MultiTenancy.scope_to_tenant(query, __MODULE__, tenant_id, opts)
      end
      
      # Default implementations for resource callbacks
      if Code.ensure_loaded?(Ash.Resource.Transformers) and
         function_exported?(Ash.Resource.Transformers, :build_tenant_transformation, 2) do
        def transform_read(query, opts) do
          AshSwarm.Patterns.MultiTenancy.transform_for_tenant(query, __MODULE__, :read, opts)
        end
        
        def transform_create(changeset, opts) do
          AshSwarm.Patterns.MultiTenancy.transform_for_tenant(changeset, __MODULE__, :create, opts)
        end
        
        def transform_update(changeset, opts) do
          AshSwarm.Patterns.MultiTenancy.transform_for_tenant(changeset, __MODULE__, :update, opts)
        end
        
        def transform_destroy(changeset, opts) do
          AshSwarm.Patterns.MultiTenancy.transform_for_tenant(changeset, __MODULE__, :destroy, opts)
        end
      end
    end
  end
  
  # Configure tenant-specific customizations
  defmacro tenant_customizations(options) do
    quote do
      @tenant_config Map.put(@tenant_config, :customizations, unquote(options))
    end
  end
  
  # Configure tenant-specific validations
  defmacro tenant_validations(validations) do
    quote do
      @tenant_config Map.put(@tenant_config, :validations, unquote(validations))
    end
  end
  
  # Scope a query to a specific tenant
  def scope_to_tenant(query, resource, tenant_id, opts \\ []) do
    # Skip tenant scoping for cross-tenant operations if authorized
    if opts[:cross_tenant] && authorize_cross_tenant?(resource, query, opts) do
      query
    else
      apply_tenant_scope(query, resource, tenant_id)
    end
  end
  
  # Apply tenant scoping based on the tenant strategy
  defp apply_tenant_scope(query, resource, tenant_id) do
    config = resource.__tenant_config__()
    
    case config.strategy do
      :attribute ->
        # Attribute-based tenant strategy (row-level tenancy)
        Ash.Query.filter(query, [{config.attribute, ^tenant_id}])
        
      :schema ->
        # Schema-based tenant strategy
        query
        |> Map.put(:schema, "tenant_#{tenant_id}")
        
      :api ->
        # API-based tenant strategy
        Ash.Query.set_tenant(query, tenant_id)
        
      :function ->
        # Custom function strategy
        apply(resource, :apply_tenant_scope, [query, tenant_id])
    end
  end
  
  # Transform queries or changesets to enforce tenant boundaries
  def transform_for_tenant(query_or_changeset, resource, action_type, opts) do
    tenant_id = get_tenant_id(opts)
    
    # Only apply tenant scoping if we have a tenant ID and the action isn't marked as cross-tenant
    if tenant_id && !is_cross_tenant_action?(resource, action_type, opts) do
      case action_type do
        :read -> scope_to_tenant(query_or_changeset, resource, tenant_id)
        :create -> set_tenant_on_changeset(query_or_changeset, resource, tenant_id)
        :update -> scope_changeset_to_tenant(query_or_changeset, resource, tenant_id)
        :destroy -> scope_changeset_to_tenant(query_or_changeset, resource, tenant_id)
      end
    else
      query_or_changeset
    end
  end
  
  # Set tenant ID on a create changeset
  defp set_tenant_on_changeset(changeset, resource, tenant_id) do
    config = resource.__tenant_config__()
    
    if config.strategy == :attribute do
      Ash.Changeset.force_change_attribute(changeset, config.attribute, tenant_id)
    else
      changeset
    end
  end
  
  # Scope an update/destroy changeset to the tenant
  defp scope_changeset_to_tenant(changeset, resource, tenant_id) do
    config = resource.__tenant_config__()
    
    if config.strategy == :attribute do
      Ash.Changeset.add_filter(changeset, [{config.attribute, ^tenant_id}])
    else
      changeset
    end
  end
  
  # Check if an action is configured to allow cross-tenant operations
  defp is_cross_tenant_action?(resource, action_type, opts) do
    action_name = opts[:action]
    
    if action_name do
      config = resource.__tenant_config__()
      action_name in (config.cross_tenant_actions || [])
    else
      false
    end
  end
  
  # Get the tenant ID from options, request context, or process dictionary
  defp get_tenant_id(opts) do
    cond do
      # Explicit tenant_id in options
      opts[:tenant_id] ->
        opts[:tenant_id]
        
      # From Ash request context
      opts[:context] && opts[:context][:tenant_id] ->
        opts[:context][:tenant_id]
        
      # From process dictionary
      Process.get(:tenant_id) ->
        Process.get(:tenant_id)
        
      # Default tenant (mostly for development)
      Application.get_env(:ash_swarm, :default_tenant_id) ->
        Application.get_env(:ash_swarm, :default_tenant_id)
        
      # No tenant identified
      true ->
        nil
    end
  end
  
  # Authorize a cross-tenant operation
  defp authorize_cross_tenant?(resource, query_or_changeset, opts) do
    # Implementation for cross-tenant authorization
    # Could involve checking for admin roles, special permissions, etc.
    actor = opts[:actor]
    
    if actor do
      # Check if actor has cross-tenant permissions
      has_permission?(actor, :cross_tenant_access)
    else
      false
    end
  end
  
  # Check if an actor has a permission
  defp has_permission?(actor, permission) do
    # Implementation for permission checking
    false
  end
  
  # Tenant management functionality
  defmodule TenantManager do
    @moduledoc """
    Provides functionality for managing tenants in a multi-tenant application.
    """
    
    def create_tenant(name, opts \\ []) do
      # Implementation for tenant creation
      tenant_id = generate_tenant_id(name)
      
      # 1. Store tenant information
      {:ok, _tenant} = store_tenant_info(tenant_id, name, opts)
      
      # 2. Set up tenant resources based on strategy
      :ok = provision_tenant_resources(tenant_id, opts)
      
      {:ok, tenant_id}
    end
    
    def delete_tenant(tenant_id) do
      # Implementation for tenant deletion
      :ok = cleanup_tenant_resources(tenant_id)
      {:ok, _result} = delete_tenant_info(tenant_id)
      
      :ok
    end
    
    def list_tenants do
      # Implementation for listing all tenants
      []
    end
    
    def get_tenant(tenant_id) do
      # Implementation for getting tenant details
      {:ok, %{}}
    end
    
    # Generate a unique tenant ID
    defp generate_tenant_id(name) do
      # Implementation for generating tenant ID
      "tenant_#{:crypto.strong_rand_bytes(8) |> Base.encode16(case: :lower)}"
    end
    
    # Store tenant information
    defp store_tenant_info(tenant_id, name, opts) do
      # Implementation for storing tenant info
      {:ok, %{}}
    end
    
    # Delete tenant information
    defp delete_tenant_info(tenant_id) do
      # Implementation for deleting tenant info
      {:ok, true}
    end
    
    # Provision resources for a new tenant
    defp provision_tenant_resources(tenant_id, opts) do
      strategy = opts[:strategy] || :attribute
      
      case strategy do
        :schema ->
          create_tenant_schema(tenant_id)
          
        :attribute ->
          # Nothing special needed for attribute-based strategy
          :ok
          
        :api ->
          register_tenant_api(tenant_id)
      end
    end
    
    # Clean up resources when deleting a tenant
    defp cleanup_tenant_resources(tenant_id) do
      # Implementation for resource cleanup
      :ok
    end
    
    # Create a database schema for a tenant
    defp create_tenant_schema(tenant_id) do
      # Implementation for schema creation
      :ok
    end
    
    # Register a tenant API
    defp register_tenant_api(tenant_id) do
      # Implementation for API registration
      :ok
    end
  end
end
```

## Usage Example

```elixir
defmodule MyApp.Resources.TenantAwareCustomer do
  use AshSwarm.Patterns.MultiTenancy,
    tenant_strategy: :attribute,
    tenant_attribute: :tenant_id,
    cross_tenant_actions: [:admin_list_all_customers]
  
  attributes do
    uuid_primary_key :id
    
    attribute :name, :string
    attribute :email, :string
    attribute :status, :atom, constraints: [one_of: [:active, :inactive, :pending]]
    
    # Note: tenant_id is automatically added by the MultiTenancy pattern
    # attribute :tenant_id, :string, allow_nil?: false
    
    timestamps()
  end
  
  # Tenant-specific customizations
  tenant_customizations [
    allowed_statuses: %{
      "tenant_a" => [:active, :inactive, :pending],
      "tenant_b" => [:active, :inactive, :pending, :archived]
    },
    email_validation: %{
      "tenant_a" => :strict,
      "tenant_b" => :relaxed
    }
  ]
  
  # Tenant-specific validations
  tenant_validations fn changeset, context ->
    tenant_id = AshSwarm.Patterns.MultiTenancy.get_tenant_id(context)
    config = __MODULE__.__tenant_config__()
    
    # Apply tenant-specific validations
    case get_in(config.customizations, [:email_validation, tenant_id]) do
      :strict -> validate_email_strict(changeset)
      :relaxed -> validate_email_relaxed(changeset)
      _ -> changeset
    end
  end
  
  # Resource actions
  actions do
    defaults [:create, :read, :update, :destroy]
    
    read :list_customers do
      # Standard list action - will be automatically tenant-scoped
    end
    
    read :admin_list_all_customers do
      # Cross-tenant action for administrators
      # This is marked as cross_tenant_action, so it won't be automatically tenant-scoped
    end
    
    create :register_customer do
      # Tenant ID will be automatically set during creation
      accept [:name, :email, :status]
    end
  end
  
  # Validation helpers
  defp validate_email_strict(changeset) do
    # Implementation of strict email validation
    changeset
  end
  
  defp validate_email_relaxed(changeset) do
    # Implementation of relaxed email validation
    changeset
  end
end

# Creating a new tenant
{:ok, tenant_id} = AshSwarm.Patterns.MultiTenancy.TenantManager.create_tenant("Acme Corp", 
  strategy: :attribute
)

# Setting the current tenant
Process.put(:tenant_id, tenant_id)

# Using the tenant-aware resource
{:ok, customers} = MyApp.Resources.TenantAwareCustomer.list_customers()
# This query is automatically scoped to the current tenant_id

# Creating a customer in the current tenant
{:ok, customer} = MyApp.Resources.TenantAwareCustomer.register_customer(%{
  name: "John Doe",
  email: "john@example.com",
  status: :active
})
# The tenant_id is automatically applied

# Cross-tenant access (requires appropriate permissions)
{:ok, all_customers} = MyApp.Resources.TenantAwareCustomer.admin_list_all_customers(
  cross_tenant: true,
  actor: admin_user
)
# This could return customers from all tenants if the user has permission
```

## Benefits of Implementation
Implementing this pattern would provide several benefits:

1. **Data Isolation**: Ensure complete separation of tenant data without data leakage.
2. **Simplified Development**: Abstract tenant handling away from business logic code.
3. **Tenant-Specific Customization**: Support different requirements for different tenants.
4. **Consistent Implementation**: Provide a standard pattern for tenant handling across the application.
5. **Operational Efficiency**: Run multiple tenants on shared infrastructure while maintaining isolation.
6. **Tenant Management**: Centralized tools for provisioning and managing tenants.

## Related Resources
- [Ash Framework Authorization Documentation](https://hexdocs.pm/ash/authorization.html)
- [Multi-Tenant Data Architecture](https://docs.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/data-considerations)
- [SaaS Multi-Tenant Strategies](https://medium.com/@alexeyzimarev/saas-multi-tenancy-strategies-1-2-68ec264b55a2) 