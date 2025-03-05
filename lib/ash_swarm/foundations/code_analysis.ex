defmodule AshSwarm.Foundations.CodeAnalysis do
  @moduledoc """
  Provides utilities for analyzing code patterns and optimization opportunities.
  
  This module supports the Adaptive Code Evolution Pattern by identifying
  patterns, anti-patterns, and optimization opportunities in code.
  """
  
  @doc """
  Analyzes a module's AST for patterns and anti-patterns.
  
  ## Parameters
  
    - `module_info`: The module info from Igniter.
    - `options`: Analysis options.
  
  ## Returns
  
    - A map of analysis results including patterns, anti-patterns, and metrics.
  """
  def analyze_module(module_info, options \\ []) do
    # Start with an empty analysis
    analysis = %{
      module: module_info.module,
      patterns: [],
      anti_patterns: [],
      metrics: %{
        function_count: 0,
        average_function_size: 0,
        complexity: %{},
        coupling: [],
        cohesion: 0
      },
      optimization_opportunities: []
    }
    
    # Analyze functions in the module
    functions = module_info.functions || []
    
    analysis = if Keyword.get(options, :analyze_functions, true) do
      functions_analysis = analyze_functions(functions, options)
      Map.merge(analysis, functions_analysis, fn _k, v1, v2 -> 
        if is_map(v1) and is_map(v2), do: Map.merge(v1, v2), else: v2 
      end)
    else
      analysis
    end
    
    # Analyze module structure
    analysis = if Keyword.get(options, :analyze_structure, true) do
      structure_analysis = analyze_structure(module_info, options)
      Map.merge(analysis, structure_analysis, fn _k, v1, v2 -> 
        if is_map(v1) and is_map(v2), do: Map.merge(v1, v2), else: v2 
      end)
    else
      analysis
    end
    
    # Analyze dependencies and coupling
    analysis = if Keyword.get(options, :analyze_dependencies, true) do
      dependencies_analysis = analyze_dependencies(module_info, options)
      Map.merge(analysis, dependencies_analysis, fn _k, v1, v2 -> 
        if is_map(v1) and is_map(v2), do: Map.merge(v1, v2), else: v2 
      end)
    else
      analysis
    end
    
    # Identify optimization opportunities
    optimization_opportunities = identify_optimization_opportunities(analysis, options)
    %{analysis | optimization_opportunities: optimization_opportunities}
  end
  
  @doc """
  Analyzes functions in a module.
  
  ## Parameters
  
    - `functions`: The module's functions from Igniter.
    - `options`: Analysis options.
  
  ## Returns
  
    - Analysis of functions including complexity, size, patterns, and anti-patterns.
  """
  def analyze_functions(functions, options \\ []) do
    function_count = length(functions)
    
    # Analyze each function
    function_analyses = Enum.map(functions, fn {name, arity, ast} ->
      analyze_function(name, arity, ast, options)
    end)
    
    # Calculate metrics
    total_size = Enum.reduce(function_analyses, 0, fn analysis, acc ->
      acc + analysis.size
    end)
    
    average_size = if function_count > 0, do: total_size / function_count, else: 0
    
    # Collect patterns and anti-patterns
    patterns = function_analyses
    |> Enum.flat_map(fn analysis -> analysis.patterns end)
    |> Enum.uniq()
    
    anti_patterns = function_analyses
    |> Enum.flat_map(fn analysis -> analysis.anti_patterns end)
    |> Enum.uniq()
    
    # Collect complexity metrics
    complexity = Enum.reduce(function_analyses, %{}, fn analysis, acc ->
      Map.put(acc, "#{analysis.name}/#{analysis.arity}", analysis.complexity)
    end)
    
    %{
      function_analyses: function_analyses,
      metrics: %{
        function_count: function_count,
        average_function_size: average_size,
        complexity: complexity
      },
      patterns: patterns,
      anti_patterns: anti_patterns
    }
  end
  
  @doc """
  Analyzes a single function.
  
  ## Parameters
  
    - `name`: The function name.
    - `arity`: The function arity.
    - `ast`: The function AST.
    - `options`: Analysis options.
  
  ## Returns
  
    - Analysis of the function including complexity, size, patterns, and anti-patterns.
  """
  def analyze_function(name, arity, ast, options \\ []) do
    # Calculate function size (approximate lines of code)
    size = calculate_function_size(ast)
    
    # Calculate cyclomatic complexity
    complexity = calculate_complexity(ast)
    
    # Identify patterns
    patterns = identify_function_patterns(name, arity, ast, options)
    
    # Identify anti-patterns
    anti_patterns = identify_function_anti_patterns(name, arity, ast, size, complexity, options)
    
    %{
      name: name,
      arity: arity,
      size: size,
      complexity: complexity,
      patterns: patterns,
      anti_patterns: anti_patterns
    }
  end
  
  @doc """
  Analyzes the structure of a module.
  
  ## Parameters
  
    - `module_info`: The module info from Igniter.
    - `options`: Analysis options.
  
  ## Returns
  
    - Analysis of the module structure.
  """
  def analyze_structure(module_info, options \\ []) do
    # Identify structural patterns
    patterns = identify_structure_patterns(module_info, options)
    
    # Identify structural anti-patterns
    anti_patterns = identify_structure_anti_patterns(module_info, options)
    
    # Calculate cohesion
    cohesion = calculate_cohesion(module_info)
    
    %{
      patterns: patterns,
      anti_patterns: anti_patterns,
      metrics: %{
        cohesion: cohesion
      }
    }
  end
  
  @doc """
  Analyzes dependencies and coupling in a module.
  
  ## Parameters
  
    - `module_info`: The module info from Igniter.
    - `options`: Analysis options.
  
  ## Returns
  
    - Analysis of dependencies and coupling.
  """
  def analyze_dependencies(module_info, options \\ []) do
    # Extract dependencies
    deps = extract_dependencies(module_info)
    
    # Calculate coupling metrics
    coupling = calculate_coupling(deps)
    
    # Identify dependency-related patterns
    patterns = identify_dependency_patterns(deps, options)
    
    # Identify dependency-related anti-patterns
    anti_patterns = identify_dependency_anti_patterns(deps, coupling, options)
    
    %{
      dependencies: deps,
      metrics: %{
        coupling: coupling
      },
      patterns: patterns,
      anti_patterns: anti_patterns
    }
  end
  
  @doc """
  Identifies optimization opportunities based on analysis results.
  
  ## Parameters
  
    - `analysis`: The analysis results.
    - `options`: Analysis options.
  
  ## Returns
  
    - A list of optimization opportunities.
  """
  def identify_optimization_opportunities(analysis, options \\ []) do
    # Start with an empty list
    opportunities = []
    
    # Look for high complexity functions
    opportunities = if Keyword.get(options, :optimize_complexity, true) do
      complexity_opportunities = Enum.reduce(analysis.metrics.complexity, opportunities, fn {func, complexity}, acc ->
        if complexity > 10 do
          [%{
            type: :complexity_reduction,
            target: func,
            severity: :high,
            description: "High cyclomatic complexity (#{complexity})"
          } | acc]
        else
          acc
        end
      end)
      
      complexity_opportunities
    else
      opportunities
    end
    
    # Look for anti-patterns
    opportunities = if Keyword.get(options, :optimize_anti_patterns, true) do
      anti_pattern_opportunities = Enum.reduce(analysis.anti_patterns, opportunities, fn anti_pattern, acc ->
        case anti_pattern do
          {:large_function, func_name, size} when size > 100 ->
            [%{
              type: :refactoring,
              target: func_name,
              severity: :high,
              description: "Large function (#{size} lines)"
            } | acc]
            
          {:duplicate_code, location, _duplicates} ->
            [%{
              type: :extract_common_code,
              target: location,
              severity: :medium,
              description: "Duplicate code detected"
            } | acc]
            
          {:inefficient_query, location, details} ->
            [%{
              type: :query_optimization,
              target: location,
              severity: :high,
              description: "Inefficient query: #{details}"
            } | acc]
            
          _ ->
            acc
        end
      end)
      
      anti_pattern_opportunities
    else
      opportunities
    end
    
    # Look for high coupling
    opportunities = if Keyword.get(options, :optimize_coupling, true) do
      coupling_opportunities = Enum.reduce(analysis.metrics.coupling, opportunities, fn {module, coupling}, acc ->
        if coupling > 5 do
          [%{
            type: :reduce_coupling,
            target: module,
            severity: :medium,
            description: "High coupling with #{module} (#{coupling} references)"
          } | acc]
        else
          acc
        end
      end)
      
      coupling_opportunities
    else
      opportunities
    end
    
    # Return unique opportunities sorted by severity
    opportunities
    |> Enum.uniq_by(fn opp -> {opp.type, opp.target} end)
    |> Enum.sort_by(fn opp -> 
      severity_value = case opp.severity do
        :high -> 3
        :medium -> 2
        :low -> 1
      end
      -severity_value
    end)
  end
  
  # Helper functions
  
  defp calculate_function_size(ast) do
    # This is a simplified implementation
    # In a real implementation, this would analyze the AST to count lines of code
    # For now, we'll just count the number of AST nodes as a proxy
    {_ast, count} = Macro.prewalk(ast, 0, fn node, acc ->
      {node, acc + 1}
    end)
    
    count
  end
  
  defp calculate_complexity(ast) do
    # This is a simplified implementation of cyclomatic complexity
    # In a real implementation, this would properly analyze conditionals,
    # loops, and case statements in the AST
    base_complexity = 1
    
    {_ast, additional_complexity} = Macro.prewalk(ast, 0, fn node, acc ->
      complexity_increment = case node do
        {:if, _, _} -> 1
        {:case, _, _} -> 1
        {:cond, _, _} -> 1
        {:|>, _, _} -> 0
        {:with, _, _} -> 1
        {:for, _, _} -> 1
        {:while, _, _} -> 1
        {:&&, _, _} -> 1
        {:||, _, _} -> 1
        {:fn, _, _} -> 1
        {:rescue, _, _} -> 1
        _ -> 0
      end
      
      {node, acc + complexity_increment}
    end)
    
    base_complexity + additional_complexity
  end
  
  defp identify_function_patterns(name, arity, ast, _options) do
    # This is a simplified implementation
    # In a real implementation, this would look for known good patterns
    patterns = []
    
    # Check for pipeline pattern
    patterns = if contains_pipeline?(ast) do
      [{:pipeline, "#{name}/#{arity}"} | patterns]
    else
      patterns
    end
    
    # Check for delegation pattern
    patterns = if is_delegation?(name, arity, ast) do
      [{:delegation, "#{name}/#{arity}"} | patterns]
    else
      patterns
    end
    
    patterns
  end
  
  defp identify_function_anti_patterns(name, arity, ast, size, complexity, _options) do
    # This is a simplified implementation
    # In a real implementation, this would look for known anti-patterns
    anti_patterns = []
    
    # Check for large functions
    anti_patterns = if size > 50 do
      [{:large_function, "#{name}/#{arity}", size} | anti_patterns]
    else
      anti_patterns
    end
    
    # Check for high complexity
    anti_patterns = if complexity > 15 do
      [{:high_complexity, "#{name}/#{arity}", complexity} | anti_patterns]
    else
      anti_patterns
    end
    
    # Check for nested conditionals
    anti_patterns = if has_nested_conditionals?(ast) do
      [{:nested_conditionals, "#{name}/#{arity}"} | anti_patterns]
    else
      anti_patterns
    end
    
    anti_patterns
  end
  
  defp identify_structure_patterns(module_info, _options) do
    # This is a simplified implementation
    # In a real implementation, this would look for good structural patterns
    patterns = []
    
    # Look for use of behavior/protocol implementation
    patterns = if has_behavior_implementation?(module_info) do
      [{:behavior_implementation, module_info.module} | patterns]
    else
      patterns
    end
    
    patterns
  end
  
  defp identify_structure_anti_patterns(module_info, _options) do
    # This is a simplified implementation
    # In a real implementation, this would look for structural anti-patterns
    anti_patterns = []
    
    # Look for very large modules
    function_count = length(module_info.functions || [])
    
    anti_patterns = if function_count > 30 do
      [{:large_module, module_info.module, function_count} | anti_patterns]
    else
      anti_patterns
    end
    
    anti_patterns
  end
  
  defp calculate_cohesion(module_info) do
    # This is a simplified implementation
    # In a real implementation, this would calculate LCOM (Lack of Cohesion of Methods)
    # or a similar metric
    
    # For now, we'll use a placeholder value
    0.5
  end
  
  defp extract_dependencies(module_info) do
    # This is a simplified implementation
    # In a real implementation, this would extract all module dependencies
    # from the AST of each function
    
    # Extract from imports
    import_deps = (module_info.imports || [])
    |> Enum.map(fn {module, _functions} -> module end)
    
    # For now, we'll just return the imports as dependencies
    import_deps
  end
  
  defp calculate_coupling(deps) do
    # This is a simplified implementation
    # In a real implementation, this would calculate metrics like
    # afferent and efferent coupling
    
    # For now, we'll just count the occurrences of each dependency
    deps
    |> Enum.reduce(%{}, fn dep, acc ->
      Map.update(acc, dep, 1, &(&1 + 1))
    end)
    |> Enum.map(fn {module, count} -> {module, count} end)
  end
  
  defp identify_dependency_patterns(deps, _options) do
    # This is a simplified implementation
    # In a real implementation, this would look for good dependency patterns
    
    # For now, we'll just return an empty list
    []
  end
  
  defp identify_dependency_anti_patterns(deps, coupling, _options) do
    # This is a simplified implementation
    # In a real implementation, this would look for dependency anti-patterns
    anti_patterns = []
    
    # Look for high coupling
    anti_patterns = Enum.reduce(coupling, anti_patterns, fn {module, count}, acc ->
      if count > 10 do
        [{:high_coupling, module, count} | acc]
      else
        acc
      end
    end)
    
    anti_patterns
  end
  
  defp contains_pipeline?(ast) do
    # Check if the AST contains a pipeline operator
    {_, result} = Macro.prewalk(ast, false, fn node, acc ->
      case node do
        {:|>, _, _} -> {node, true}
        _ -> {node, acc}
      end
    end)
    
    result
  end
  
  defp is_delegation?(name, arity, ast) do
    # This is a simplified implementation to detect delegation pattern
    # In a real implementation, this would look for functions that just
    # delegate to another module or internal function
    
    # For now, we'll just return false
    false
  end
  
  defp has_nested_conditionals?(ast) do
    # Check for nested conditionals in the AST
    {_, result} = Macro.prewalk(ast, %{depth: 0, found: false}, fn node, acc ->
      case node do
        {:if, _, _} ->
          new_depth = acc.depth + 1
          {node, %{depth: new_depth, found: new_depth > 1 || acc.found}}
          
        {:case, _, _} ->
          new_depth = acc.depth + 1
          {node, %{depth: new_depth, found: new_depth > 1 || acc.found}}
          
        {:cond, _, _} ->
          new_depth = acc.depth + 1
          {node, %{depth: new_depth, found: new_depth > 1 || acc.found}}
          
        _ ->
          {node, acc}
      end
    end)
    
    result.found
  end
  
  defp has_behavior_implementation?(module_info) do
    # Check if the module implements any behavior or protocol
    (module_info.moduledoc || [])
    |> Enum.any?(fn {attr, _} -> 
      attr == :behaviour || attr == :behavior || attr == :impl
    end)
  end
end