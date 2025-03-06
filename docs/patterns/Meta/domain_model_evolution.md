# Domain Model Evolution Pattern

**Status:** Not Implemented

## Description

The Domain Model Evolution Pattern provides mechanisms for domain models to evolve over time, adapting to changing business requirements without breaking existing functionality. This pattern addresses the challenge of maintaining backward compatibility while allowing domain models to grow and change with the business. It enables incremental evolution, versioning, and migration of domain models, ensuring that systems can adapt without requiring complete rewrites.

In the Ash ecosystem, this pattern provides a structured approach to evolving resources, actions, relationships, and validations over time. It establishes protocols for forward and backward compatibility, creates migration paths for data and code, and provides tools for managing the evolution process.

## Current Implementation

AshSwarm does not have a formal implementation of the Domain Model Evolution Pattern. However, some aspects of domain model evolution are present in the Ash ecosystem:

- Resources can be modified over time with code changes
- Data migrations can be created for schema changes
- Extensions allow for adding new capabilities to resources
- Version attributes can track entity versions

## Implementation Recommendations

To fully implement the Domain Model Evolution Pattern:

1. **Create version-aware resources**: Develop resources that understand and track their own version history.

2. **Implement resource migration frameworks**: Build tools for migrating resources between versions.

3. **Design compatibility layers**: Create adapters that allow different versions to interoperate.

4. **Develop evolutionary validation**: Build validation systems that can adapt to different resource versions.

5. **Implement feature toggles**: Create mechanisms to enable or disable features based on version.

6. **Create migration planning tools**: Build tools for planning and organizing migrations.

7. **Design evolutionary testing**: Develop testing frameworks that verify compatibility across versions.

## Potential Implementation

```elixir
defmodule AshSwarm.Foundations.DomainModelEvolution do
  @moduledoc """
  Provides mechanisms for domain models to evolve over time,
  adapting to changing business requirements while maintaining
  compatibility and providing migration paths.
  """
  
  use AshSwarm.Extension
  import Spark.Dsl.Extension
  
  dsl_extension do
    section :evolution_strategy do
      schema do
        field :strategy, {:one_of, [:strict, :flexible, :hybrid]}, default: :hybrid
        field :backwards_compatibility, :boolean, default: true
        field :record_version_history, :boolean, default: true
        field :version_attribute, :atom, default: :version
        field :migration_strategy, {:one_of, [:inline, :background, :manual]}, default: :manual
      end
    end
    
    section :version_definitions do
      entry :version, :map do
        schema do
          field :version, :string, required: true
          field :description, :string, default: ""
          field :release_date, :date
          field :stability, {:one_of, [:experimental, :stable, :deprecated]}, default: :stable
          field :compatibility, {:list, :string}, default: []
          field :changelog, :string
        end
      end
    end
    
    section :attribute_evolution do
      entry :attribute_change, :map do
        schema do
          field :version_from, :string, required: true
          field :version_to, :string, required: true
          field :attribute, :atom, required: true
          field :change_type, {:one_of, [:add, :remove, :rename, :type_change, :constraint_change, :default_change]}, required: true
          field :old_value, :any
          field :new_value, :any
          field :migration_function, :mfa
          field :data_migration_required, :boolean, default: false
        end
      end
    end
    
    section :relationship_evolution do
      entry :relationship_change, :map do
        schema do
          field :version_from, :string, required: true
          field :version_to, :string, required: true
          field :relationship, :atom, required: true
          field :change_type, {:one_of, [:add, :remove, :rename, :type_change, :cardinality_change]}, required: true
          field :old_value, :any
          field :new_value, :any
          field :migration_function, :mfa
          field :data_migration_required, :boolean, default: false
        end
      end
    end
    
    section :action_evolution do
      entry :action_change, :map do
        schema do
          field :version_from, :string, required: true
          field :version_to, :string, required: true
          field :action, :atom, required: true
          field :change_type, {:one_of, [:add, :remove, :rename, :argument_change, :return_change, :behavior_change]}, required: true
          field :old_value, :any
          field :new_value, :any
          field :adaptation_function, :mfa
          field :code_adaptation_required, :boolean, default: false
        end
      end
    end
    
    section :calculation_evolution do
      entry :calculation_change, :map do
        schema do
          field :version_from, :string, required: true
          field :version_to, :string, required: true
          field :calculation, :atom, required: true
          field :change_type, {:one_of, [:add, :remove, :rename, :implementation_change, :return_type_change]}, required: true
          field :old_value, :any
          field :new_value, :any
          field :adaptation_function, :mfa
        end
      end
    end
    
    section :validation_evolution do
      entry :validation_change, :map do
        schema do
          field :version_from, :string, required: true
          field :version_to, :string, required: true
          field :validation, :atom, required: true
          field :change_type, {:one_of, [:add, :remove, :strengthen, :weaken, :reimplement]}, required: true
          field :old_value, :any
          field :new_value, :any
          field :data_validation_required, :boolean, default: false
          field :validation_function, :mfa
        end
      end
    end
    
    section :migration_plans do
      entry :migration_plan, :map do
        schema do
          field :name, :atom, required: true
          field :description, :string, default: ""
          field :from_version, :string, required: true
          field :to_version, :string, required: true
          field :steps, {:list, :mfa}, default: []
          field :pre_migration_checks, {:list, :mfa}, default: []
          field :post_migration_checks, {:list, :mfa}, default: []
          field :estimated_duration, :integer # in seconds
          field :requires_downtime, :boolean, default: false
        end
      end
    end
    
    section :compatibility_tests do
      entry :compatibility_test, :map do
        schema do
          field :name, :atom, required: true
          field :description, :string, default: ""
          field :versions_tested, {:list, :string}, required: true
          field :test_function, :mfa, required: true
          field :criticality, {:one_of, [:low, :medium, :high, :critical]}, default: :medium
        end
      end
    end
  end
  
  @doc """
  Gets the current version of a resource.
  """
  def current_version(resource) do
    # Implementation would return the current version of the resource
  end
  
  @doc """
  Gets the version history of a resource.
  """
  def version_history(resource) do
    # Implementation would return the version history of the resource
  end
  
  @doc """
  Creates a version of a resource for a specific version.
  """
  def as_version(resource, version) do
    # Implementation would return a version-specific resource definition
  end
  
  @doc """
  Validates compatibility between resource versions.
  """
  def validate_compatibility(resource, from_version, to_version) do
    # Implementation would validate compatibility between versions
  end
  
  @doc """
  Creates a migration plan between versions.
  """
  def create_migration_plan(resource, from_version, to_version, options \\ []) do
    # Implementation would create a migration plan between versions
  end
  
  @doc """
  Executes a migration plan.
  """
  def execute_migration(resource, migration_plan, options \\ []) do
    # Implementation would execute a migration plan
  end
  
  @doc """
  Tests compatibility between versions.
  """
  def test_compatibility(resource, versions \\ :all) do
    # Implementation would test compatibility between specified versions
  end
  
  @doc """
  Creates an adapter for compatibility between versions.
  """
  def create_compatibility_adapter(resource, client_version, server_version) do
    # Implementation would create an adapter for compatibility
  end
end
```

## Usage Example

```elixir
defmodule MyApp.Resources.Customer do
  use Ash.Resource,
    extensions: [AshSwarm.Foundations.DomainModelEvolution]
    
  evolution_strategy do
    strategy :hybrid
    backwards_compatibility true
    record_version_history true
    version_attribute :schema_version
    migration_strategy :background
  end
  
  version_definitions do
    version do
      version "1.0.0"
      description "Initial customer resource definition"
      release_date ~D[2023-01-15]
      stability :stable
    end
    
    version do
      version "1.1.0"
      description "Added email verification and preferences"
      release_date ~D[2023-04-02]
      stability :stable
      compatibility ["1.0.0"]
      changelog """
      - Added email_verified attribute
      - Added customer preferences relationship
      - Added verify_email action
      """
    end
    
    version do
      version "2.0.0"
      description "Comprehensive customer profile redesign"
      release_date ~D[2023-09-10]
      stability :stable
      compatibility ["1.1.0"]
      changelog """
      - Renamed 'name' to 'full_name'
      - Split address into structured components
      - Added customer segments
      - Changed status values
      - Added lifecycle_stage attribute
      """
    end
    
    version do
      version "2.1.0"
      description "Customer journey tracking"
      release_date ~D[2023-12-05]
      stability :experimental
      compatibility ["2.0.0"]
      changelog """
      - Added journey_stage attribute
      - Added touchpoints relationship
      - Added track_customer_journey action
      """
    end
  end
  
  attribute_evolution do
    attribute_change do
      version_from "1.0.0"
      version_to "1.1.0"
      attribute :email_verified
      change_type :add
      new_value [type: :boolean, default: false]
      data_migration_required true
      migration_function {MyApp.CustomerMigrations, :set_initial_email_verification, []}
    end
    
    attribute_change do
      version_from "1.1.0"
      version_to "2.0.0"
      attribute :name
      change_type :rename
      old_value :name
      new_value :full_name
      data_migration_required true
      migration_function {MyApp.CustomerMigrations, :copy_name_to_full_name, []}
    end
    
    attribute_change do
      version_from "1.1.0"
      version_to "2.0.0"
      attribute :address
      change_type :type_change
      old_value :string
      new_value :map
      data_migration_required true
      migration_function {MyApp.CustomerMigrations, :parse_address_to_structured, []}
    end
    
    attribute_change do
      version_from "1.1.0"
      version_to "2.0.0"
      attribute :status
      change_type :constraint_change
      old_value [one_of: [:active, :inactive, :pending]]
      new_value [one_of: [:active, :inactive, :pending, :archived, :suspended]]
      data_migration_required false
    end
    
    attribute_change do
      version_from "1.1.0"
      version_to "2.0.0"
      attribute :lifecycle_stage
      change_type :add
      new_value [type: :atom, constraints: [one_of: [:lead, :prospect, :customer, :churned, :renewal]]]
      data_migration_required true
      migration_function {MyApp.CustomerMigrations, :infer_lifecycle_stage, []}
    end
    
    attribute_change do
      version_from "2.0.0"
      version_to "2.1.0"
      attribute :journey_stage
      change_type :add
      new_value [type: :atom, constraints: [one_of: [:awareness, :consideration, :decision, :retention, :advocacy]]]
      data_migration_required true
      migration_function {MyApp.CustomerMigrations, :infer_journey_stage, []}
    end
  end
  
  relationship_evolution do
    relationship_change do
      version_from "1.0.0"
      version_to "1.1.0"
      relationship :preferences
      change_type :add
      new_value [
        type: :has_one,
        destination: MyApp.Resources.CustomerPreference,
        destination_attribute: :customer_id
      ]
      data_migration_required true
      migration_function {MyApp.CustomerMigrations, :create_default_preferences, []}
    end
    
    relationship_change do
      version_from "1.1.0"
      version_to "2.0.0"
      relationship :segments
      change_type :add
      new_value [
        type: :many_to_many,
        destination: MyApp.Resources.CustomerSegment,
        through: MyApp.Resources.CustomerSegmentMembership
      ]
      data_migration_required true
      migration_function {MyApp.CustomerMigrations, :assign_initial_segments, []}
    end
    
    relationship_change do
      version_from "2.0.0"
      version_to "2.1.0"
      relationship :touchpoints
      change_type :add
      new_value [
        type: :has_many,
        destination: MyApp.Resources.CustomerTouchpoint,
        destination_attribute: :customer_id
      ]
      data_migration_required false
    end
  end
  
  action_evolution do
    action_change do
      version_from "1.0.0"
      version_to "1.1.0"
      action :verify_email
      change_type :add
      new_value [
        type: :update,
        changes: [set: [email_verified: true]],
        constraints: [require_token: true]
      ]
      code_adaptation_required true
      adaptation_function {MyApp.CustomerActions, :implement_email_verification, []}
    end
    
    action_change do
      version_from "1.1.0"
      version_to "2.0.0"
      action :update_profile
      change_type :argument_change
      old_value [
        arguments: [name: [:string], email: [:string], address: [:string], phone: [:string]]
      ]
      new_value [
        arguments: [
          full_name: [:string],
          email: [:string],
          address: [:map],
          phone: [:string],
          lifecycle_stage: [:atom]
        ]
      ]
      code_adaptation_required true
      adaptation_function {MyApp.CustomerActions, :adapt_update_profile_action, []}
    end
    
    action_change do
      version_from "2.0.0"
      version_to "2.1.0"
      action :track_customer_journey
      change_type :add
      new_value [
        arguments: [
          journey_stage: [type: :atom, constraints: [one_of: [:awareness, :consideration, :decision, :retention, :advocacy]]],
          touchpoint_type: [type: :atom],
          touchpoint_data: [type: :map]
        ],
        type: :action,
        run: {MyApp.CustomerJourney, :record_touchpoint, []}
      ]
      code_adaptation_required true
      adaptation_function {MyApp.CustomerActions, :implement_journey_tracking, []}
    end
  end
  
  migration_plans do
    migration_plan do
      name :upgrade_to_v2
      description "Upgrade customers from v1.1.0 to v2.0.0"
      from_version "1.1.0"
      to_version "2.0.0"
      pre_migration_checks [
        {MyApp.CustomerMigrations, :check_address_format_consistency, []},
        {MyApp.CustomerMigrations, :check_backup_status, []}
      ]
      steps [
        {MyApp.CustomerMigrations, :backup_customers, []},
        {MyApp.CustomerMigrations, :copy_name_to_full_name, []},
        {MyApp.CustomerMigrations, :parse_address_to_structured, []},
        {MyApp.CustomerMigrations, :infer_lifecycle_stage, []},
        {MyApp.CustomerMigrations, :create_customer_segments, []},
        {MyApp.CustomerMigrations, :assign_initial_segments, []},
        {MyApp.CustomerMigrations, :update_schema_version, ["2.0.0"]}
      ]
      post_migration_checks [
        {MyApp.CustomerMigrations, :verify_data_integrity, []},
        {MyApp.CustomerMigrations, :verify_segment_assignments, []}
      ]
      estimated_duration 3600 # 1 hour
      requires_downtime false
    end
  end
  
  compatibility_tests do
    compatibility_test do
      name :profile_update_compatibility
      description "Tests that profile updates work across versions"
      versions_tested ["1.0.0", "1.1.0", "2.0.0"]
      test_function {MyApp.CompatibilityTests, :test_profile_updates, []}
      criticality :high
    end
    
    compatibility_test do
      name :api_compatibility
      description "Tests that the API endpoints work with all client versions"
      versions_tested ["1.0.0", "1.1.0", "2.0.0", "2.1.0"]
      test_function {MyApp.CompatibilityTests, :test_api_compatibility, []}
      criticality :critical
    end
  end
  
  # Current resource definition (version 2.1.0)
  attributes do
    uuid_primary_key :id
    attribute :schema_version, :string, default: "2.1.0"
    attribute :full_name, :string
    attribute :email, :string
    attribute :email_verified, :boolean, default: false
    attribute :phone, :string
    attribute :address, :map
    attribute :status, :atom, default: :pending, constraints: [one_of: [:active, :inactive, :pending, :archived, :suspended]]
    attribute :lifecycle_stage, :atom, constraints: [one_of: [:lead, :prospect, :customer, :churned, :renewal]]
    attribute :journey_stage, :atom, constraints: [one_of: [:awareness, :consideration, :decision, :retention, :advocacy]]
    timestamps()
  end
  
  relationships do
    has_one :preferences, MyApp.Resources.CustomerPreference
    many_to_many :segments, MyApp.Resources.CustomerSegment, through: MyApp.Resources.CustomerSegmentMembership
    has_many :touchpoints, MyApp.Resources.CustomerTouchpoint
  end
  
  actions do
    defaults [:create, :read, :update, :destroy]
    
    update :verify_email do
      argument :token, :string, allow_nil?: false
      
      change set_attribute(:email_verified, true)
      
      constraint match(:token, ^Ash.get_global(MyApp.Resources.Customer, :verification_token))
    end
    
    update :update_profile do
      argument :full_name, :string
      argument :email, :string
      argument :phone, :string
      argument :address, :map
      argument :lifecycle_stage, :atom, constraints: [one_of: [:lead, :prospect, :customer, :churned, :renewal]]
      
      change set_attribute(:full_name, arg(:full_name))
      change set_attribute(:email, arg(:email))
      change set_attribute(:phone, arg(:phone))
      change set_attribute(:address, arg(:address))
      change set_attribute(:lifecycle_stage, arg(:lifecycle_stage))
    end
    
    action :track_customer_journey do
      argument :journey_stage, :atom, constraints: [one_of: [:awareness, :consideration, :decision, :retention, :advocacy]]
      argument :touchpoint_type, :atom
      argument :touchpoint_data, :map
      
      run fn input, context ->
        MyApp.CustomerJourney.record_touchpoint(input, context)
      end
    end
  end
end

# Example of using the evolution features
defmodule MyApp.CustomerEvolutionManager do
  def upgrade_customers_to_latest_version do
    # Get the current resource version
    current_version = AshSwarm.Foundations.DomainModelEvolution.current_version(MyApp.Resources.Customer)
    
    # Create a migration plan to the latest version
    migration_plan = AshSwarm.Foundations.DomainModelEvolution.create_migration_plan(
      MyApp.Resources.Customer,
      current_version,
      "2.1.0"
    )
    
    # Validate the migration plan
    case AshSwarm.Foundations.DomainModelEvolution.validate_compatibility(
      MyApp.Resources.Customer,
      current_version,
      "2.1.0"
    ) do
      {:ok, _validation_results} ->
        # Execute the migration
        AshSwarm.Foundations.DomainModelEvolution.execute_migration(
          MyApp.Resources.Customer,
          migration_plan,
          background: true,
          notify_on_completion: true
        )
        
      {:error, compatibility_issues} ->
        # Handle compatibility issues
        {:error, "Cannot upgrade due to compatibility issues: #{inspect(compatibility_issues)}"}
    end
  end
  
  def handle_legacy_client(client_version) do
    # Create a compatibility adapter for a legacy client
    adapter = AshSwarm.Foundations.DomainModelEvolution.create_compatibility_adapter(
      MyApp.Resources.Customer,
      client_version,
      "2.1.0"
    )
    
    # Return the adapter for use with the client
    {:ok, adapter}
  end
  
  def test_cross_version_compatibility do
    # Run all compatibility tests
    test_results = AshSwarm.Foundations.DomainModelEvolution.test_compatibility(
      MyApp.Resources.Customer
    )
    
    # Return test results
    {:ok, test_results}
  end
end
```

## Benefits of Implementation

1. **Sustainable Evolution**: Domain models can evolve over time without breaking existing systems.

2. **Backward Compatibility**: Changes to domain models maintain compatibility with existing clients.

3. **Structured Migrations**: Provides clear paths for migrating from one version to another.

4. **Version Awareness**: The system understands and can work with multiple versions simultaneously.

5. **Reduced Technical Debt**: Systematic evolution reduces the accumulation of technical debt.

6. **Change Visibility**: Changes to domain models are explicitly documented and tracked.

7. **Safer Refactoring**: Resources can be refactored with confidence in backward compatibility.

8. **Predictable Upgrades**: Resource upgrades follow a planned, tested path.

## Related Resources

- [Semantic Versioning](https://semver.org/)
- [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html)
- [Domain-Driven Design](https://domainlanguage.com/ddd/)
- [API Versioning Strategies](https://www.xmatters.com/blog/api-versioning-strategies)
- [Database Schema Migration](https://en.wikipedia.org/wiki/Schema_migration)
- [Ash Framework Resources](https://www.ash-hq.org/docs/module/ash/latest/ash-resource) 