# Multi-Database Abstraction Layer Pattern

**Status:** Not Implemented

## Description

The Multi-Database Abstraction Layer Pattern extends Ash's data layer to seamlessly work with multiple database engines within a single application, allowing different resources to be stored in the most appropriate database while maintaining a unified query interface. It leverages Elixir's protocol system to provide adapter-specific optimizations while preserving a consistent API.

Unlike traditional approaches that force a single database technology for all resources, this pattern:

1. Enables different resources to use different database technologies
2. Provides a unified query interface across all database engines
3. Optimizes queries for each specific database engine
4. Manages cross-database transactions and consistency
5. Abstracts database-specific details from application code

By creating a flexible abstraction layer, this pattern allows applications to leverage the strengths of different database technologies for different use cases while maintaining a consistent programming model.

## Key Components

### 1. Multi-Database Configuration

The pattern provides a way to configure multiple databases:

```elixir
defmodule MyApp.Application do
  use Application

  def start(_type, _args) do
    children = [
      {AshSwarm.MultiDB,
        databases: [
          metrics: [
            type: :timescaledb,
            config: [
              hostname: "timescale.example.com",
              database: "metrics_db",
              username: "metrics_user",
              password: {:system, "TIMESCALE_PASSWORD"}
            ]
          ],
          documents: [
            type: :mongodb,
            config: [
              url: "mongodb://mongo.example.com:27017/docs"
            ]
          ],
          core: [
            type: :postgres,
            config: [
              hostname: "postgres.example.com",
              database: "core_db",
              username: "core_user",
              password: {:system, "POSTGRES_PASSWORD"}
            ]
          ]
        ]
      }
    ]
    
    Supervisor.start_link(children, strategy: :one_for_one)
  end
end
```

### 2. Database-Specific Resource Configuration

The pattern allows resources to specify their database:

```elixir
defmodule MyApp.Metric do
  use Ash.Resource,
    extensions: [AshPostgres.Resource]
    
  postgres do
    table "metrics"
    database :metrics  # References the MultiDB configuration
    repo MyApp.Repo
  end
  
  attributes do
    uuid_primary_key :id
    attribute :timestamp, :utc_datetime_usec
    attribute :name, :string
    attribute :value, :float
    attribute :tags, :map
  end
  
  actions do
    create :create
    read :read
    update :update
    destroy :destroy
  end
end

defmodule MyApp.Document do
  use Ash.Resource,
    extensions: [AshMongoDB.Resource]
    
  mongodb do
    collection "documents"
    database :documents  # References the MultiDB configuration
  end
  
  attributes do
    uuid_primary_key :id
    attribute :title, :string
    attribute :content, :string
    attribute :metadata, :map
    attribute :tags, {:array, :string}
  end
  
  actions do
    create :create
    read :read
    update :update
    destroy :destroy
  end
end
```

### 3. Database Adapter Protocol

The pattern implements a protocol for database adapters:

```elixir
defprotocol AshSwarm.MultiDB.Adapter do
  @moduledoc """
  Protocol for database adapters.
  """
  
  @spec init(module, keyword) :: {:ok, term} | {:error, term}
  def init(adapter, config)
  
  @spec create(term, Ash.Resource.t(), map, keyword) :: {:ok, Ash.Resource.record()} | {:error, term}
  def create(adapter_state, resource, attributes, opts)
  
  @spec read(term, Ash.Query.t(), keyword) :: {:ok, [Ash.Resource.record()]} | {:error, term}
  def read(adapter_state, query, opts)
  
  @spec update(term, Ash.Resource.record(), map, keyword) :: {:ok, Ash.Resource.record()} | {:error, term}
  def update(adapter_state, record, attributes, opts)
  
  @spec destroy(term, Ash.Resource.record(), keyword) :: {:ok, Ash.Resource.record()} | {:error, term}
  def destroy(adapter_state, record, opts)
  
  @spec transaction(term, function, keyword) :: {:ok, term} | {:error, term}
  def transaction(adapter_state, fun, opts)
  
  @spec supports_feature?(term, atom) :: boolean
  def supports_feature?(adapter_state, feature)
end
```

### 4. Database-Specific Adapters

The pattern implements adapters for different databases:

```elixir
defmodule AshSwarm.MultiDB.PostgresAdapter do
  @moduledoc """
  Adapter for PostgreSQL databases.
  """
  
  defstruct [:repo, :config]
  
  defimpl AshSwarm.MultiDB.Adapter do
    def init(_adapter, config) do
      # Initialize PostgreSQL connection
      repo_module = config[:repo] || raise "Repo module is required for PostgreSQL adapter"
      
      {:ok, %AshSwarm.MultiDB.PostgresAdapter{
        repo: repo_module,
        config: config
      }}
    end
    
    def create(adapter_state, resource, attributes, opts) do
      # Create a record in PostgreSQL
      # ...implementation details...
    end
    
    def read(adapter_state, query, opts) do
      # Read records from PostgreSQL
      # ...implementation details...
    end
    
    def update(adapter_state, record, attributes, opts) do
      # Update a record in PostgreSQL
      # ...implementation details...
    end
    
    def destroy(adapter_state, record, opts) do
      # Delete a record from PostgreSQL
      # ...implementation details...
    end
    
    def transaction(adapter_state, fun, opts) do
      # Execute a transaction in PostgreSQL
      adapter_state.repo.transaction(fn ->
        fun.()
      end)
    end
    
    def supports_feature?(_adapter_state, :joins), do: true
    def supports_feature?(_adapter_state, :transactions), do: true
    def supports_feature?(_adapter_state, :complex_filters), do: true
    def supports_feature?(_adapter_state, feature), do: false
  end
end

defmodule AshSwarm.MultiDB.MongoDBAdapter do
  @moduledoc """
  Adapter for MongoDB databases.
  """
  
  defstruct [:conn, :config]
  
  defimpl AshSwarm.MultiDB.Adapter do
    def init(_adapter, config) do
      # Initialize MongoDB connection
      {:ok, conn} = Mongo.start_link(config)
      
      {:ok, %AshSwarm.MultiDB.MongoDBAdapter{
        conn: conn,
        config: config
      }}
    end
    
    def create(adapter_state, resource, attributes, opts) do
      # Create a record in MongoDB
      # ...implementation details...
    end
    
    def read(adapter_state, query, opts) do
      # Read records from MongoDB
      # ...implementation details...
    end
    
    def update(adapter_state, record, attributes, opts) do
      # Update a record in MongoDB
      # ...implementation details...
    end
    
    def destroy(adapter_state, record, opts) do
      # Delete a record from MongoDB
      # ...implementation details...
    end
    
    def transaction(adapter_state, fun, opts) do
      # Execute a transaction in MongoDB (if supported)
      case opts[:session] do
        nil ->
          # No session, execute without transaction
          {:ok, fun.()}
          
        session ->
          # Execute with transaction
          Mongo.transaction(adapter_state.conn, session, fn ->
            fun.()
          end)
      end
    end
    
    def supports_feature?(_adapter_state, :document_queries), do: true
    def supports_feature?(_adapter_state, :schemaless), do: true
    def supports_feature?(_adapter_state, :transactions), do: true
    def supports_feature?(_adapter_state, feature), do: false
  end
end
```

### 5. Cross-Database Query Planner

The pattern includes a query planner for cross-database queries:

```elixir
defmodule AshSwarm.MultiDB.QueryPlanner do
  @moduledoc """
  Plans and executes queries across multiple databases.
  """
  
  def plan_query(query) do
    # Analyze the query to determine which databases are involved
    resources = extract_resources_from_query(query)
    databases = resources_to_databases(resources)
    
    case databases do
      [single_db] ->
        # Single database query, use the native adapter
        {:single, single_db, query}
        
      multiple_dbs ->
        # Multi-database query, plan a federated query
        plan_federated_query(query, multiple_dbs)
    end
  end
  
  def execute_query(query_plan) do
    case query_plan do
      {:single, database, query} ->
        # Execute query on a single database
        adapter = get_adapter_for_database(database)
        AshSwarm.MultiDB.Adapter.read(adapter, query, [])
        
      {:federated, stages} ->
        # Execute a federated query across multiple databases
        execute_federated_query(stages)
    end
  end
  
  defp extract_resources_from_query(query) do
    # Extract all resources referenced in the query
    # ...implementation details...
  end
  
  defp resources_to_databases(resources) do
    # Map resources to their databases
    # ...implementation details...
  end
  
  defp plan_federated_query(query, databases) do
    # Plan a query that spans multiple databases
    # ...implementation details...
  end
  
  defp execute_federated_query(stages) do
    # Execute a federated query across multiple databases
    # ...implementation details...
  end
  
  defp get_adapter_for_database(database) do
    # Get the adapter for a specific database
    # ...implementation details...
  end
end
```

### 6. Cross-Database Transaction Manager

The pattern implements cross-database transaction management:

```elixir
defmodule AshSwarm.MultiDB.TransactionManager do
  @moduledoc """
  Manages transactions across multiple databases.
  """
  
  def transaction(databases, fun) do
    # Start a distributed transaction
    transaction_id = generate_transaction_id()
    
    # Create transaction context
    context = %{
      transaction_id: transaction_id,
      databases: databases,
      committed: %{},
      prepared: %{}
    }
    
    # Execute two-phase commit
    try do
      # Prepare phase
      context = prepare_all(context, fun)
      
      # Commit phase
      commit_all(context)
    catch
      kind, reason ->
        # Rollback on error
        rollback_all(context)
        :erlang.raise(kind, reason, __STACKTRACE__)
    end
  end
  
  defp prepare_all(context, fun) do
    # Prepare phase of two-phase commit
    prepared = Enum.map(context.databases, fn database ->
      adapter = get_adapter_for_database(database)
      
      # Check if adapter supports transactions
      if AshSwarm.MultiDB.Adapter.supports_feature?(adapter, :transactions) do
        # Prepare transaction
        case prepare_transaction(adapter, fun) do
          {:ok, result} ->
            {database, {:ok, result}}
            
          {:error, reason} ->
            {database, {:error, reason}}
        end
      else
        # Adapter doesn't support transactions, execute directly
        case execute_without_transaction(adapter, fun) do
          {:ok, result} ->
            {database, {:ok, result}}
            
          {:error, reason} ->
            {database, {:error, reason}}
        end
      end
    end)
    |> Enum.into(%{})
    
    # Check if any prepare failed
    if Enum.any?(prepared, fn {_, result} -> match?({:error, _}, result) end) do
      # At least one prepare failed, raise error
      failed = Enum.filter(prepared, fn {_, result} -> match?({:error, _}, result) end)
      raise "Transaction prepare failed: #{inspect(failed)}"
    end
    
    # All prepares succeeded
    %{context | prepared: prepared}
  end
  
  defp commit_all(context) do
    # Commit phase of two-phase commit
    committed = Enum.map(context.databases, fn database ->
      adapter = get_adapter_for_database(database)
      
      # Check if adapter supports transactions
      if AshSwarm.MultiDB.Adapter.supports_feature?(adapter, :transactions) do
        # Commit transaction
        case commit_transaction(adapter, context.transaction_id) do
          :ok ->
            {database, :ok}
            
          {:error, reason} ->
            {database, {:error, reason}}
        end
      else
        # Adapter doesn't support transactions, already executed in prepare phase
        {database, :ok}
      end
    end)
    |> Enum.into(%{})
    
    # Return results from prepare phase
    results = Enum.map(context.prepared, fn {database, {:ok, result}} -> {database, result} end)
    |> Enum.into(%{})
    
    {:ok, results}
  end
  
  defp rollback_all(context) do
    # Rollback all prepared transactions
    Enum.each(context.databases, fn database ->
      adapter = get_adapter_for_database(database)
      
      # Check if adapter supports transactions
      if AshSwarm.MultiDB.Adapter.supports_feature?(adapter, :transactions) do
        # Rollback transaction
        rollback_transaction(adapter, context.transaction_id)
      end
    end)
    
    :ok
  end
  
  defp prepare_transaction(adapter, fun) do
    # Prepare a transaction on a specific adapter
    # ...implementation details...
  end
  
  defp commit_transaction(adapter, transaction_id) do
    # Commit a prepared transaction
    # ...implementation details...
  end
  
  defp rollback_transaction(adapter, transaction_id) do
    # Rollback a prepared transaction
    # ...implementation details...
  end
  
  defp execute_without_transaction(adapter, fun) do
    # Execute without transaction support
    # ...implementation details...
  end
  
  defp get_adapter_for_database(database) do
    # Get the adapter for a specific database
    # ...implementation details...
  end
  
  defp generate_transaction_id do
    # Generate a unique transaction ID
    # ...implementation details...
  end
end
```

## Implementation Recommendations

To effectively implement this pattern:

1. **Leverage Elixir's Protocol System**: Use protocols for adapter-specific optimizations
2. **Implement Database-Specific Adapters**: Create optimized adapters for each database
3. **Design a Query Planner**: Build a query planner for cross-database queries
4. **Add Transaction Management**: Implement cross-database transaction support
5. **Provide Feature Detection**: Add mechanisms to detect database-specific features
6. **Create Migration Tools**: Build tools for managing migrations across databases
7. **Add Monitoring Capabilities**: Implement monitoring for database performance
8. **Support Connection Pooling**: Add connection pooling for each database

## Benefits

The Multi-Database Abstraction Layer Pattern offers numerous benefits:

1. **Flexibility**: Enables using the right database for each use case
2. **Performance**: Allows optimizing storage for different data types
3. **Scalability**: Supports scaling different databases independently
4. **Consistency**: Maintains a consistent API across databases
5. **Isolation**: Isolates database-specific code from application logic
6. **Evolution**: Enables gradual migration between database technologies
7. **Specialization**: Leverages specialized databases for specific needs

## Potential Challenges

Implementing this pattern may present certain challenges:

1. **Complexity Management**: Managing the complexity of multiple databases
2. **Transaction Handling**: Implementing reliable cross-database transactions
3. **Query Optimization**: Optimizing queries across different databases
4. **Feature Parity**: Handling differences in database feature sets
5. **Operational Overhead**: Managing multiple database systems
6. **Learning Curve**: Steeper learning curve for developers

## Related Patterns

This pattern relates to several other architectural patterns:

- **Aggregate Materialization Pattern**: Can store aggregates in specialized databases
- **Stream-Based Resource Transformation**: Can transform data between different databases
- **Observability-Enhanced Resource**: Can provide monitoring for database performance

## Conclusion

The Multi-Database Abstraction Layer Pattern extends Ash's data layer capabilities to seamlessly work with multiple database engines, allowing applications to leverage the strengths of different database technologies while maintaining a consistent programming model. By providing a unified interface with database-specific optimizations, this pattern enables flexible, high-performance data storage strategies that can evolve with changing application needs. This approach aligns perfectly with modern polyglot persistence architectures, creating a foundation for building scalable, adaptable systems that use the right tool for each job. 