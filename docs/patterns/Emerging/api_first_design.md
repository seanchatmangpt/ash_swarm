# API-First Design Pattern

## Status
**Partially Implemented**

## Description
The API-First Design pattern prioritizes designing and documenting APIs before implementing the underlying functionality. This pattern extends Ash's resource-centric approach by focusing on the API layer first, ensuring that resources are optimally exposed and consumed. The pattern emphasizes consistent API contracts, documentation, and versioning strategies.

This pattern is valuable for applications with complex API requirements, microservice architectures, or systems with multiple consumers of the same resources.

## Current Implementation
The AshSwarm framework has partial implementation of this pattern through:

1. The Automagic API Designer pattern (documented separately) which provides capabilities for automatically designing APIs based on resource definitions.
2. Built-in functions for generating OpenAPI specifications from Ash resources.

## Key Components
- `lib/ash_swarm/to_from_dsl.ex` - Contains logic for translating between DSL and API representations

## Implementation Gaps
While the foundation exists, there are several gaps in the current implementation:

1. No comprehensive approach for API versioning
2. Limited API documentation generation
3. Lack of structured API evolution strategies
4. Missing tools for API contract testing

## Implementation Recommendations
To fully implement this pattern in AshSwarm, consider:

1. Creating an API design extension:
   - Tools for designing API contracts before implementing resources
   - Versioning strategies for API evolution
   - Contract enforcement mechanisms

2. Implementing comprehensive documentation generation:
   - Automatic generation of OpenAPI/Swagger specs
   - Integration with API documentation platforms
   - Example generation for API endpoints

3. Adding API testing and validation tools:
   - Contract testing utilities
   - API compatibility checks
   - Performance testing for API endpoints

4. Building API monitoring and analytics:
   - Usage metrics for API endpoints
   - Error tracking and reporting
   - Performance monitoring

## Potential Implementation

```elixir
defmodule AshSwarm.Patterns.ApiFirstDesign do
  @moduledoc """
  Provides API-first design tools and utilities for Ash resources.
  
  This module offers capabilities to define API contracts, generate documentation,
  manage versioning, and ensure API compatibility over time.
  """
  
  defmacro __using__(opts) do
    quote do
      use Ash.Resource, unquote(opts)
      
      # API contract definition
      Module.register_attribute(__MODULE__, :api_contract, accumulate: false)
      Module.put_attribute(__MODULE__, :api_contract, %{
        version: unquote(Keyword.get(opts, :api_version, "1.0.0")),
        description: unquote(Keyword.get(opts, :api_description, "")),
        deprecation: unquote(Keyword.get(opts, :api_deprecation, nil))
      })
      
      # Register callbacks for API contract validation
      @before_compile AshSwarm.Patterns.ApiFirstDesign
    end
  end
  
  defmacro __before_compile__(env) do
    quote do
      def __api_contract__, do: @api_contract
      
      # API contract validation during compilation
      AshSwarm.Patterns.ApiFirstDesign.validate_contract!(@api_contract, __MODULE__)
    end
  end
  
  # API version definition
  defmacro api_version(version, opts \\ []) do
    quote do
      @api_contract Map.put(@api_contract, :version, unquote(version))
      @api_contract Map.put(@api_contract, :since, unquote(Keyword.get(opts, :since)))
      @api_contract Map.put(@api_contract, :until, unquote(Keyword.get(opts, :until)))
    end
  end
  
  # API endpoint definition
  defmacro api_endpoint(name, opts \\ []) do
    quote do
      @api_contract Map.update!(@api_contract, :endpoints, fn endpoints ->
        Map.put(endpoints || %{}, unquote(name), %{
          description: unquote(Keyword.get(opts, :description, "")),
          params: unquote(Keyword.get(opts, :params, [])),
          responses: unquote(Keyword.get(opts, :responses, %{})),
          deprecated: unquote(Keyword.get(opts, :deprecated, false))
        })
      end)
    end
  end
  
  # Validate API contract
  def validate_contract!(contract, module) do
    # Implementation of contract validation
    :ok
  end
  
  # Generate OpenAPI specification
  def generate_openapi(resources, opts \\ []) do
    resources
    |> Enum.filter(&function_exported?(&1, :__api_contract__, 0))
    |> Enum.map(&{&1, &1.__api_contract__()})
    |> build_openapi_spec(opts)
  end
  
  # Build OpenAPI specification from API contracts
  defp build_openapi_spec(resources_with_contracts, opts) do
    # Implementation of OpenAPI spec generation
    %{
      openapi: "3.0.0",
      info: %{
        title: Keyword.get(opts, :title, "API Documentation"),
        version: Keyword.get(opts, :version, "1.0.0"),
        description: Keyword.get(opts, :description, "")
      },
      paths: build_paths(resources_with_contracts),
      components: %{
        schemas: build_schemas(resources_with_contracts)
      }
    }
  end
  
  # Build OpenAPI paths from API contracts
  defp build_paths(resources_with_contracts) do
    # Implementation of path building
    %{}
  end
  
  # Build OpenAPI schemas from API contracts
  defp build_schemas(resources_with_contracts) do
    # Implementation of schema building
    %{}
  end
  
  # Check API compatibility between versions
  def check_compatibility(old_version, new_version) do
    # Implementation of compatibility checking
    :ok
  end
  
  # Generate API documentation
  def generate_documentation(resources, opts \\ []) do
    # Implementation of documentation generation
    resources
    |> Enum.filter(&function_exported?(&1, :__api_contract__, 0))
    |> Enum.map(&{&1, &1.__api_contract__()})
    |> build_documentation(opts)
  end
  
  # Build documentation from API contracts
  defp build_documentation(resources_with_contracts, opts) do
    # Implementation of documentation building
    %{}
  end
end
```

## Usage Example

```elixir
defmodule MyApp.Resources.Product do
  use AshSwarm.Patterns.ApiFirstDesign, api_version: "1.2.0"
  
  attributes do
    uuid_primary_key :id
    
    attribute :name, :string
    attribute :description, :string
    attribute :price, :decimal
    attribute :status, :atom, constraints: [one_of: [:active, :discontinued, :upcoming]]
    
    timestamps()
  end
  
  # API contract definition
  api_version "1.2.0", since: "2023-01-01"
  
  api_endpoint :list_products,
    description: "List all products with filtering options",
    params: [
      status: [type: :atom, required: false],
      min_price: [type: :decimal, required: false],
      max_price: [type: :decimal, required: false]
    ],
    responses: %{
      200 => "List of products matching the criteria",
      400 => "Invalid parameters provided"
    }
  
  api_endpoint :get_product,
    description: "Get a single product by ID",
    params: [
      id: [type: :uuid, required: true]
    ],
    responses: %{
      200 => "Product details",
      404 => "Product not found"
    }
  
  # Resource actions
  actions do
    defaults [:create, :read, :update, :destroy]
    
    read :list_products do
      filter expr(status == ^arg(:status)) when arg(:status) != nil
      filter expr(price >= ^arg(:min_price)) when arg(:min_price) != nil
      filter expr(price <= ^arg(:max_price)) when arg(:max_price) != nil
    end
    
    read :get_product do
      argument :id, :uuid, allow_nil?: false
      get? true
      filter expr(id == ^arg(:id))
    end
  end
  
  # Resource definition...
end

# Generate OpenAPI specification
openapi_spec = AshSwarm.Patterns.ApiFirstDesign.generate_openapi([
  MyApp.Resources.Product,
  MyApp.Resources.Category
], title: "E-commerce API", version: "1.0.0")

# Generate API documentation
api_docs = AshSwarm.Patterns.ApiFirstDesign.generate_documentation([
  MyApp.Resources.Product,
  MyApp.Resources.Category
])

# Check API compatibility between versions
:ok = AshSwarm.Patterns.ApiFirstDesign.check_compatibility("1.1.0", "1.2.0")
```

## Benefits of Implementation
Implementing this pattern would provide several benefits:

1. **API Consistency**: Ensure consistent API design across all resources and modules.
2. **Documentation First**: Generate comprehensive documentation directly from API definitions.
3. **Contract Testing**: Validate API changes against existing contracts to prevent breaking changes.
4. **API Versioning**: Manage API evolution with proper versioning support.
5. **Improved Collaboration**: Facilitate better communication between teams working on frontend and backend.
6. **Client SDK Generation**: Automatically generate client SDKs from API specifications.

## Related Resources
- [Ash Framework Resource Documentation](https://hexdocs.pm/ash/Ash.Resource.html)
- [OpenAPI Specification](https://swagger.io/specification/)
- [API Design Best Practices](https://github.com/dwyl/best-practices/blob/master/API-DESIGN.md)
- [Design-First API Development](https://stoplight.io/design-first) 