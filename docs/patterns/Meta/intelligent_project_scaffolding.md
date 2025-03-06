# Intelligent Project Scaffolding Pattern

**Status:** Not Implemented

## Description

The Intelligent Project Scaffolding Pattern creates a framework for dynamically generating and evolving project structures based on contextual understanding and adaptation. Unlike traditional scaffolding that follows rigid templates, this pattern uses the Igniter framework to analyze project context, requirements, and existing code to create the most appropriate structure and components.

This pattern enables:

1. Context-aware project generation that adapts to specific needs
2. Intelligent upgrades that preserve custom code while updating standardized components
3. Progressive enhancement of existing projects with new capabilities
4. Pattern recognition and application across codebases
5. Consistent implementation of best practices while respecting domain-specific requirements

By leveraging [Igniter](https://github.com/ash-project/igniter) as its foundation, this pattern creates a more flexible and adaptive approach to project bootstrapping and evolution that responds to the unique characteristics of each project rather than forcing a one-size-fits-all template.

## Current Implementation

AshSwarm does not currently have a formal implementation of the Intelligent Project Scaffolding Pattern. However, the Ash ecosystem provides several building blocks:

- Igniter's core functionality for code generation and patching
- Ash install and upgrade scripts use Igniter to modify projects
- Various mix tasks in the Ash ecosystem create project components

A full implementation would require creating a comprehensive framework that understands project context, can make intelligent decisions about what components to generate, and can adapt existing projects while preserving custom logic.

## Implementation Recommendations

To fully implement the Intelligent Project Scaffolding Pattern:

1. **Create project analyzers**: Develop tools that can analyze existing projects to understand their structure and needs.

2. **Implement context-aware generators**: Build generators that adapt their output based on project context and requirements.

3. **Design scaffolding strategies**: Create strategies for different types of projects, components, and architectural patterns.

4. **Build upgrade planners**: Develop systems that can determine the most appropriate upgrade path for a project.

5. **Implement pattern recognizers**: Create tools that can identify common patterns in code and extract them for reuse.

6. **Develop customization preservers**: Ensure that custom code and modifications are preserved during scaffolding and upgrades.

7. **Create progressive enhancers**: Build tools that can progressively enhance existing projects with new capabilities.

## Potential Implementation

```elixir
defmodule AshSwarm.Foundations.IntelligentProjectScaffolding do
  @moduledoc """
  Implements the Intelligent Project Scaffolding Pattern, providing a framework
  for context-aware project generation and evolution.
  """
  
  use AshSwarm.Extension
  
  defmacro __using__(opts) do
    quote do
      Module.register_attribute(__MODULE__, :project_analyzers, accumulate: true)
      Module.register_attribute(__MODULE__, :scaffold_strategies, accumulate: true)
      Module.register_attribute(__MODULE__, :upgrade_planners, accumulate: true)
      Module.register_attribute(__MODULE__, :pattern_recognizers, accumulate: true)
      
      @before_compile AshSwarm.Foundations.IntelligentProjectScaffolding
      
      import AshSwarm.Foundations.IntelligentProjectScaffolding, only: [
        project_analyzer: 2,
        scaffold_strategy: 2,
        upgrade_planner: 2,
        pattern_recognizer: 2
      ]
    end
  end
  
  defmacro __before_compile__(_env) do
    quote do
      def analyzers do
        @project_analyzers
      end
      
      def strategies do
        @scaffold_strategies
      end
      
      def planners do
        @upgrade_planners
      end
      
      def recognizers do
        @pattern_recognizers
      end
      
      def analyze_project(project_path, options \\ []) do
        Enum.reduce(analyzers(), %{}, fn analyzer, acc ->
          results = AshSwarm.Foundations.IntelligentProjectScaffolding.run_analyzer(
            analyzer, project_path, options
          )
          Map.merge(acc, results)
        end)
      end
      
      def scaffold_project(project_path, strategy_name, options \\ []) do
        strategy = Enum.find(strategies(), fn s -> s.name == strategy_name end)
        
        if strategy do
          AshSwarm.Foundations.IntelligentProjectScaffolding.apply_scaffold(
            strategy, project_path, options
          )
        else
          {:error, "Unknown scaffold strategy: #{strategy_name}"}
        end
      end
      
      def plan_upgrade(project_path, options \\ []) do
        analysis = analyze_project(project_path, options)
        
        Enum.reduce_while(planners(), nil, fn planner, acc ->
          case AshSwarm.Foundations.IntelligentProjectScaffolding.plan_upgrade(
            planner, project_path, analysis, options
          ) do
            {:ok, plan} when not is_nil(plan) -> {:halt, plan}
            _ -> {:cont, acc}
          end
        end)
      end
      
      def apply_upgrade_plan(project_path, plan, options \\ []) do
        AshSwarm.Foundations.IntelligentProjectScaffolding.apply_upgrade_plan(
          project_path, plan, options
        )
      end
      
      def recognize_patterns(project_path, options \\ []) do
        Enum.flat_map(recognizers(), fn recognizer ->
          AshSwarm.Foundations.IntelligentProjectScaffolding.recognize_patterns(
            recognizer, project_path, options
          )
        end)
      end
    end
  end
  
  defmacro project_analyzer(name, opts) do
    quote do
      analyzer_def = %{
        name: unquote(name),
        description: unquote(opts[:description] || ""),
        analyzer_fn: unquote(opts[:analyzer]),
        options: unquote(opts[:options] || [])
      }
      
      @project_analyzers analyzer_def
    end
  end
  
  defmacro scaffold_strategy(name, opts) do
    quote do
      strategy_def = %{
        name: unquote(name),
        description: unquote(opts[:description] || ""),
        applicability_fn: unquote(opts[:applicability] || fn _, _ -> true end),
        generator_fn: unquote(opts[:generator]),
        options: unquote(opts[:options] || [])
      }
      
      @scaffold_strategies strategy_def
    end
  end
  
  defmacro upgrade_planner(name, opts) do
    quote do
      planner_def = %{
        name: unquote(name),
        description: unquote(opts[:description] || ""),
        applicability_fn: unquote(opts[:applicability]),
        planner_fn: unquote(opts[:planner]),
        options: unquote(opts[:options] || [])
      }
      
      @upgrade_planners planner_def
    end
  end
  
  defmacro pattern_recognizer(name, opts) do
    quote do
      recognizer_def = %{
        name: unquote(name),
        description: unquote(opts[:description] || ""),
        recognizer_fn: unquote(opts[:recognizer]),
        options: unquote(opts[:options] || [])
      }
      
      @pattern_recognizers recognizer_def
    end
  end
  
  def run_analyzer(analyzer, project_path, options) do
    analyzer.analyzer_fn.(project_path, options)
  end
  
  def apply_scaffold(strategy, project_path, options) do
    if strategy.applicability_fn.(project_path, options) do
      strategy.generator_fn.(project_path, options)
    else
      {:error, "Scaffold strategy #{strategy.name} is not applicable to this project"}
    end
  end
  
  def plan_upgrade(planner, project_path, analysis, options) do
    if planner.applicability_fn.(analysis, options) do
      planner.planner_fn.(project_path, analysis, options)
    else
      {:ok, nil}
    end
  end
  
  def apply_upgrade_plan(project_path, plan, options) do
    igniter = Igniter.new()
    
    Enum.reduce_while(plan.steps, {:ok, igniter}, fn step, {:ok, current_igniter} ->
      case apply_upgrade_step(current_igniter, project_path, step, options) do
        {:ok, updated_igniter} -> {:cont, {:ok, updated_igniter}}
        error -> {:halt, error}
      end
    end)
  end
  
  def recognize_patterns(recognizer, project_path, options) do
    recognizer.recognizer_fn.(project_path, options)
  end
  
  defp apply_upgrade_step(igniter, project_path, step, options) do
    case step.type do
      :create_file ->
        Igniter.Project.create_file(igniter, step.path, step.content)
        
      :modify_file ->
        case Igniter.Project.read_file(igniter, step.path) do
          {:ok, content} ->
            modified = step.modifier_fn.(content)
            Igniter.Project.write_file(igniter, step.path, modified)
            
          error -> error
        end
        
      :create_module ->
        Igniter.Project.Module.create_module(
          igniter,
          step.module_name,
          step.content
        )
        
      :modify_module ->
        igniter
        |> Igniter.Project.Module.find_module(step.module_name)
        |> case do
          {:ok, module_info} ->
            modified = step.modifier_fn.(module_info)
            Igniter.Project.Module.update_module(igniter, step.module_name, fn _ -> modified end)
            
          error -> error
        end
        
      :run_mix_task ->
        Igniter.compose_task(igniter, step.task, step.args)
        
      :install_dependency ->
        # This would handle adding dependencies to mix.exs
        {:ok, igniter}
        
      :custom ->
        step.custom_fn.(igniter, project_path, options)
    end
  end
end
```

## Usage Example

```elixir
defmodule MyApp.ProjectScaffolding do
  use AshSwarm.Foundations.IntelligentProjectScaffolding
  
  # Define a project analyzer that examines the project structure
  project_analyzer :ash_project_analyzer,
    description: "Analyzes an Ash Framework project to understand its structure and components",
    analyzer: fn project_path, _options ->
      # Determine if this is an Ash project
      is_ash_project = File.exists?(Path.join(project_path, "mix.exs")) &&
                      contains_ash_dependency?(Path.join(project_path, "mix.exs"))
      
      if is_ash_project do
        # Analyze the project structure
        resources = find_resources(project_path)
        apis = find_apis(project_path)
        extensions = find_extensions(project_path)
        
        %{
          type: :ash_project,
          resources: resources,
          apis: apis,
          extensions: extensions,
          ash_version: determine_ash_version(project_path)
        }
      else
        %{
          type: :non_ash_project
        }
      end
    end
  
  # Define a scaffolding strategy for a basic Ash CRUD API
  scaffold_strategy :ash_crud_api,
    description: "Scaffolds a basic CRUD API using Ash Framework",
    applicability: fn _project_path, analysis ->
      analysis[:type] == :ash_project
    end,
    generator: fn project_path, options ->
      # Extract domain info from options
      domain = options[:domain] || "MyApp"
      resource_name = options[:resource] || "Example"
      
      # Use Igniter to create the scaffold
      igniter = Igniter.new()
      
      # Create the resource module
      resource_path = Path.join([project_path, "lib", String.downcase(domain), "resources", "#{String.downcase(resource_name)}.ex"])
      
      resource_content = """
      defmodule #{domain}.Resources.#{resource_name} do
        use Ash.Resource,
          data_layer: Ash.DataLayer.Ets
          
        attributes do
          uuid_primary_key :id
          
          attribute :name, :string do
            allow_nil? false
          end
          
          attribute :description, :string
          
          timestamps()
        end
        
        actions do
          defaults [:create, :read, :update, :destroy]
        end
      end
      """
      
      # Create the API module
      api_path = Path.join([project_path, "lib", String.downcase(domain), "#{String.downcase(resource_name)}_api.ex"])
      
      api_content = """
      defmodule #{domain}.#{resource_name}Api do
        use Ash.Api
        
        resources do
          resource #{domain}.Resources.#{resource_name}
        end
      end
      """
      
      # Create the registry module if it doesn't exist
      registry_path = Path.join([project_path, "lib", String.downcase(domain), "registry.ex"])
      
      registry_content = """
      defmodule #{domain}.Registry do
        use Ash.Registry
        
        entries do
          entry #{domain}.Resources.#{resource_name}
        end
      end
      """
      
      # Apply the scaffold
      igniter
      |> Igniter.Project.create_file(resource_path, resource_content)
      |> Igniter.Project.create_file(api_path, api_content)
      |> case do
        {:ok, igniter} ->
          if File.exists?(registry_path) do
            # Update the registry to include the new resource
            {:ok, content} = Igniter.Project.read_file(igniter, registry_path)
            updated_content = update_registry_content(content, "#{domain}.Resources.#{resource_name}")
            Igniter.Project.write_file(igniter, registry_path, updated_content)
          else
            # Create the registry
            Igniter.Project.create_file(igniter, registry_path, registry_content)
          end
          
        error -> error
      end
    end
  
  # Define an upgrade planner that detects and plans upgrades for Ash projects
  upgrade_planner :ash_version_upgrade_planner,
    description: "Plans upgrades for Ash projects based on the detected version",
    applicability: fn analysis, _options ->
      analysis[:type] == :ash_project
    end,
    planner: fn project_path, analysis, _options ->
      current_version = analysis[:ash_version]
      latest_version = get_latest_ash_version()
      
      if Version.compare(current_version, latest_version) == :lt do
        # Need to upgrade - create the plan
        steps = []
        
        # For each major version change, add appropriate migration steps
        steps = if Version.major(current_version) < Version.major(latest_version) do
          steps ++ major_version_migration_steps(current_version, latest_version)
        else
          steps
        end
        
        # For each minor version change, add appropriate migration steps
        steps = if Version.minor(current_version) < Version.minor(latest_version) do
          steps ++ minor_version_migration_steps(current_version, latest_version)
        else
          steps
        end
        
        # Include patch updates
        steps = steps ++ [
          %{
            type: :modify_file,
            path: Path.join(project_path, "mix.exs"),
            modifier_fn: fn content ->
              update_dependency_version(content, "ash", latest_version)
            end
          }
        ]
        
        {:ok, %{
          from_version: current_version,
          to_version: latest_version,
          steps: steps
        }}
      else
        # Already on the latest version
        {:ok, nil}
      end
    end
  
  # Define a pattern recognizer that identifies common patterns in Ash resources
  pattern_recognizer :crud_pattern_recognizer,
    description: "Recognizes CRUD patterns in Ash resources",
    recognizer: fn project_path, _options ->
      # Find all resource modules
      resources = find_resources(project_path)
      
      # Look for common patterns in each resource
      Enum.flat_map(resources, fn resource ->
        # Load the resource file
        resource_path = resource_path_from_module(resource)
        
        case File.read(Path.join(project_path, resource_path)) do
          {:ok, content} ->
            # Use Igniter to parse the module
            igniter = Igniter.new()
            
            case Igniter.Code.Module.parse_string(content) do
              {:ok, module_info} ->
                # Look for patterns
                patterns = []
                
                # Check for CRUD actions pattern
                patterns = if has_crud_actions?(module_info) do
                  patterns ++ [%{
                    type: :crud_actions,
                    module: resource
                  }]
                else
                  patterns
                end
                
                # Check for timestamps pattern
                patterns = if has_timestamps?(module_info) do
                  patterns ++ [%{
                    type: :timestamps,
                    module: resource
                  }]
                else
                  patterns
                end
                
                patterns
                
              _error -> []
            end
            
          _error -> []
        end
      end)
    end
  
  # Helper functions (would be implemented in a real example)
  defp contains_ash_dependency?(mix_file) do
    # Check if the mix.exs file contains ash as a dependency
    true
  end
  
  defp find_resources(project_path) do
    # Find all Ash resource modules in the project
    []
  end
  
  defp find_apis(project_path) do
    # Find all Ash API modules in the project
    []
  end
  
  defp find_extensions(project_path) do
    # Find all Ash extensions used in the project
    []
  end
  
  defp determine_ash_version(project_path) do
    # Determine the version of Ash being used
    "2.9.0"
  end
  
  defp update_registry_content(content, resource_module) do
    # Update the registry content to include the new resource
    content
  end
  
  defp get_latest_ash_version do
    # Get the latest version of Ash from Hex
    "3.0.0"
  end
  
  defp major_version_migration_steps(current_version, latest_version) do
    # Generate steps needed for a major version migration
    []
  end
  
  defp minor_version_migration_steps(current_version, latest_version) do
    # Generate steps needed for a minor version migration
    []
  end
  
  defp update_dependency_version(content, dep_name, new_version) do
    # Update the version of a dependency in mix.exs
    content
  end
  
  defp resource_path_from_module(module_name) do
    # Convert a module name to its file path
    ""
  end
  
  defp has_crud_actions?(module_info) do
    # Check if a module has CRUD actions defined
    true
  end
  
  defp has_timestamps?(module_info) do
    # Check if a module has timestamps defined
    true
  end
end

# Example usage
defmodule MyApp.ProjectManager do
  def scaffold_new_domain(project_path, domain_name) do
    # Analyze the project first
    analysis = MyApp.ProjectScaffolding.analyze_project(project_path)
    
    # Choose an appropriate scaffolding strategy based on the analysis
    strategy = if analysis[:type] == :ash_project do
      :ash_crud_api
    else
      :basic_crud_api
    end
    
    # Apply the scaffolding strategy
    MyApp.ProjectScaffolding.scaffold_project(project_path, strategy, 
      domain: domain_name,
      resource: "User"
    )
  end
  
  def upgrade_project(project_path) do
    # Analyze the project
    analysis = MyApp.ProjectScaffolding.analyze_project(project_path)
    
    # Plan the upgrade
    case MyApp.ProjectScaffolding.plan_upgrade(project_path) do
      nil ->
        IO.puts "Project is already up to date"
        :ok
        
      plan ->
        IO.puts "Planning to upgrade from #{plan.from_version} to #{plan.to_version}"
        IO.puts "Steps to perform: #{length(plan.steps)}"
        
        # Apply the upgrade
        case MyApp.ProjectScaffolding.apply_upgrade_plan(project_path, plan) do
          {:ok, _} ->
            IO.puts "Upgrade completed successfully"
            :ok
            
          error ->
            IO.puts "Upgrade failed: #{inspect(error)}"
            error
        end
    end
  end
  
  def analyze_patterns(project_path) do
    # Recognize patterns in the project
    patterns = MyApp.ProjectScaffolding.recognize_patterns(project_path)
    
    # Group by pattern type
    patterns_by_type = Enum.group_by(patterns, & &1.type)
    
    # Report findings
    IO.puts "Pattern analysis results:"
    IO.puts "-------------------------"
    
    for {type, instances} <- patterns_by_type do
      IO.puts "#{type}: #{length(instances)} instances"
      
      for instance <- instances do
        IO.puts "  - #{instance.module}"
      end
    end
    
    patterns_by_type
  end
end

# Using Igniter directly for a complex scaffolding task
defmodule MyApp.ComplexScaffolder do
  def create_event_sourced_domain(project_path, domain_name) do
    igniter = Igniter.new()
    
    # Create the domain directory structure
    domain_path = Path.join([project_path, "lib", String.downcase(domain_name)])
    
    # Create necessary directories
    for dir <- ["resources", "commands", "events", "projections", "aggregates"] do
      File.mkdir_p!(Path.join(domain_path, dir))
    end
    
    # Use Igniter to generate the core modules
    igniter
    |> generate_aggregate_module(domain_name)
    |> generate_event_store_module(domain_name)
    |> generate_command_handler_module(domain_name)
    |> generate_projection_module(domain_name)
  end
  
  defp generate_aggregate_module(igniter, domain_name) do
    module_name = "#{domain_name}.Aggregates.Root"
    
    Igniter.Project.Module.create_module(
      igniter,
      module_name,
      """
      defmodule #{module_name} do
        use Ash.Resource,
          domain: #{domain_name}.Domain,
          data_layer: Ash.DataLayer.Ets
          
        aggregate do
          attribute :id, :uuid, primary_key: true
          attribute :version, :integer
        end
        
        events do
          event :created
          event :updated
          event :destroyed
        end
      end
      """
    )
  end
  
  defp generate_event_store_module(igniter, domain_name) do
    module_name = "#{domain_name}.EventStore"
    
    Igniter.Project.Module.create_module(
      igniter,
      module_name,
      """
      defmodule #{module_name} do
        use Ash.EventStore
        
        # Implementation would define how events are stored
      end
      """
    )
  end
  
  defp generate_command_handler_module(igniter, domain_name) do
    module_name = "#{domain_name}.CommandHandler"
    
    Igniter.Project.Module.create_module(
      igniter,
      module_name,
      """
      defmodule #{module_name} do
        use Ash.CommandHandler
        
        # Implementation would define command handling logic
      end
      """
    )
  end
  
  defp generate_projection_module(igniter, domain_name) do
    module_name = "#{domain_name}.Projections.ReadModel"
    
    Igniter.Project.Module.create_module(
      igniter,
      module_name,
      """
      defmodule #{module_name} do
        use Ash.Projection
        
        # Implementation would define projection logic
      end
      """
    )
  end
end
```

## Benefits of Implementation

1. **Context-Aware Scaffolding**: Project structures are generated based on specific project needs and context.

2. **Intelligent Upgrades**: Upgrades adapt to the specific project structure and preserve custom code.

3. **Pattern Recognition**: Common patterns are recognized and can be extracted for reuse or optimization.

4. **Progressive Enhancement**: Existing projects can be progressively enhanced with new capabilities.

5. **Consistent Implementation**: Best practices are consistently applied across projects.

6. **Reduced Bootstrap Time**: New projects can be bootstrapped more quickly with appropriate structures.

7. **Evolutionary Development**: Projects can evolve over time without manual restructuring.

8. **Knowledge Capture**: Domain knowledge is captured in the scaffolding strategies and can be reused.

## Related Resources

- [Igniter GitHub Repository](https://github.com/ash-project/igniter)
- [Ash Framework Documentation](https://www.ash-hq.org)
- [Igniter Semantic Patching Pattern](./igniter_semantic_patching.md)
- [Adaptive Code Evolution Pattern](./adaptive_code_evolution.md)
- [Code Generation Bootstrapping Pattern](./code_generation_bootstrapping.md)
- [Domain Model Evolution Pattern](./domain_model_evolution.md) 