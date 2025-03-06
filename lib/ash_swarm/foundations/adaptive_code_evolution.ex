defmodule AshSwarm.Foundations.AdaptiveCodeEvolution do
  @moduledoc """
  Implements the Adaptive Code Evolution Pattern, providing a framework for 
  code to continuously evolve and improve based on usage patterns and metrics.

  This pattern enables software systems to:
  1. Analyze their own structure and usage patterns
  2. Identify optimization opportunities based on predefined heuristics
  3. Generate and apply patches to improve themselves incrementally
  4. Track the effectiveness of changes and learn from results
  5. Roll back unsuccessful changes when necessary

  Integration with AI-powered modules:
  - AICodeAnalysis: Analyzes code using LLMs to identify optimization opportunities
  - AIAdaptationStrategies: Generates optimized code implementations based on usage patterns
  - AIExperimentEvaluation: Evaluates the outcomes of code adaptation experiments

  ## Examples

  ```elixir
  defmodule MyApp.AdaptiveEvolution do
    use AshSwarm.Foundations.AdaptiveCodeEvolution
    
    # Define AI-powered code analyzers
    ai_analyzer :code_quality, 
      description: "Analyzes code quality using LLMs",
      analyzer_module: AshSwarm.Foundations.AICodeAnalysis,
      analyzer_function: :analyze_code
    
    # Define AI-powered adaptation strategies
    ai_strategy :performance_optimization,
      description: "Generates performance-optimized implementations",
      strategy_module: AshSwarm.Foundations.AIAdaptationStrategies,
      strategy_function: :generate_optimized_implementation
    
    # Define AI-powered experiment evaluators
    ai_evaluator :impact_assessment,
      description: "Evaluates the impact of code adaptations",
      evaluator_module: AshSwarm.Foundations.AIExperimentEvaluation,
      evaluator_function: :evaluate_experiment
  end

  # Usage
  MyApp.AdaptiveEvolution.analyze_with_ai(:code_quality, MyApp.Module)
  ```
  """

  @doc """
  Defines a module as implementing the AdaptiveCodeEvolution pattern.

  This macro introduces DSL functions for defining analyzers, adaptation strategies,
  usage trackers, and experiments.
  """
  defmacro __using__(_opts) do
    quote do
      Module.register_attribute(__MODULE__, :adaptive_analyzers, accumulate: true)
      Module.register_attribute(__MODULE__, :adaptation_strategies, accumulate: true)
      Module.register_attribute(__MODULE__, :usage_trackers, accumulate: true)
      Module.register_attribute(__MODULE__, :experiments, accumulate: true)
      Module.register_attribute(__MODULE__, :ai_analyzers, accumulate: true)
      Module.register_attribute(__MODULE__, :ai_strategies, accumulate: true)
      Module.register_attribute(__MODULE__, :ai_evaluators, accumulate: true)

      @before_compile AshSwarm.Foundations.AdaptiveCodeEvolution

      import AshSwarm.Foundations.AdaptiveCodeEvolution,
        only: [
          code_analyzer: 2,
          adaptation_strategy: 2,
          usage_tracker: 2,
          experiment: 2,
          ai_analyzer: 2,
          ai_strategy: 2,
          ai_evaluator: 2
        ]
    end
  end

  @doc """
  Defines helper functions for modules using the AdaptiveCodeEvolution pattern.

  These functions enable:
  - Retrieving registered analyzers, strategies, trackers, and experiments
  - Analyzing code with defined analyzers
  - Suggesting adaptations based on analysis results
  - Tracking usage patterns
  - Running experiments
  - Applying successful adaptations
  """
  defmacro __before_compile__(_env) do
    quote do
      @doc """
      Returns all registered code analyzers for this module.
      """
      def analyzers do
        @adaptive_analyzers
      end

      @doc """
      Returns all registered adaptation strategies for this module.
      """
      def strategies do
        @adaptation_strategies
      end

      @doc """
      Returns all registered usage trackers for this module.
      """
      def trackers do
        @usage_trackers
      end

      @doc """
      Returns all registered experiments for this module.
      """
      def experiments do
        @experiments
      end

      @doc """
      Returns all registered AI-powered code analyzers for this module.
      """
      def ai_analyzers do
        @ai_analyzers
      end

      @doc """
      Returns all registered AI-powered adaptation strategies for this module.
      """
      def ai_strategies do
        @ai_strategies
      end

      @doc """
      Returns all registered AI-powered experiment evaluators for this module.
      """
      def ai_evaluators do
        @ai_evaluators
      end

      @doc """
      Analyzes a module using an AI-powered analyzer.

      ## Parameters

        - `analyzer_name`: The name of the AI analyzer to use.
        - `module_or_source`: The module or source code to analyze.
        - `options`: Options for the analysis.

      ## Returns

        - `{:ok, analysis}` if the analysis was successful.
        - `{:error, reason}` if there was an error.
      """
      def analyze_with_ai(analyzer_name, module_or_source, options \\ []) do
        analyzer = Enum.find(ai_analyzers(), fn a -> a.name == analyzer_name end)

        if analyzer do
          AshSwarm.Foundations.AdaptiveCodeEvolution.run_ai_analysis(
            analyzer,
            module_or_source,
            options
          )
        else
          {:error, "Unknown AI analyzer: #{analyzer_name}"}
        end
      end

      @doc """
      Generates optimized code using an AI-powered strategy.

      ## Parameters

        - `strategy_name`: The name of the AI strategy to use.
        - `original_code`: The original code to optimize.
        - `usage_data`: Usage data to inform the optimization.
        - `options`: Options for the strategy.

      ## Returns

        - `{:ok, optimized_code}` if the generation was successful.
        - `{:error, reason}` if there was an error.
      """
      def optimize_with_ai(strategy_name, original_code, usage_data, options \\ []) do
        strategy = Enum.find(ai_strategies(), fn s -> s.name == strategy_name end)

        if strategy do
          AshSwarm.Foundations.AdaptiveCodeEvolution.generate_ai_optimization(
            strategy,
            original_code,
            usage_data,
            options
          )
        else
          {:error, "Unknown AI strategy: #{strategy_name}"}
        end
      end

      @doc """
      Evaluates an experiment using an AI-powered evaluator.

      ## Parameters

        - `evaluator_name`: The name of the AI evaluator to use.
        - `original_code`: The original code before adaptation.
        - `adapted_code`: The code after adaptation.
        - `metrics`: Performance metrics from running both versions.
        - `options`: Options for the evaluation.

      ## Returns

        - `{:ok, evaluation}` if the evaluation was successful.
        - `{:error, reason}` if there was an error.
      """
      def evaluate_with_ai(evaluator_name, original_code, adapted_code, metrics, options \\ []) do
        evaluator = Enum.find(ai_evaluators(), fn e -> e.name == evaluator_name end)

        if evaluator do
          AshSwarm.Foundations.AdaptiveCodeEvolution.evaluate_ai_experiment(
            evaluator,
            original_code,
            adapted_code,
            metrics,
            options
          )
        else
          {:error, "Unknown AI evaluator: #{evaluator_name}"}
        end
      end

      @doc """
      Analyzes a module using all registered analyzers.

      ## Parameters

        - `module`: The module to analyze.
        - `options`: Options to pass to each analyzer.

      ## Returns

        - A map containing the combined results from all analyzers.
      """
      def analyze_code(module, options \\ []) do
        Enum.reduce(analyzers(), %{}, fn analyzer, acc ->
          results =
            AshSwarm.Foundations.AdaptiveCodeEvolution.run_analyzer(
              analyzer,
              module,
              options
            )

          Map.merge(acc, results)
        end)
      end

      @doc """
      Suggests possible adaptations based on analysis results using all registered strategies.

      ## Parameters

        - `analysis_results`: The results from analyze_code/2.
        - `options`: Options to pass to each strategy.

      ## Returns

        - A list of suggested adaptations.
      """
      def suggest_adaptations(analysis_results, options \\ []) do
        Enum.flat_map(strategies(), fn strategy ->
          AshSwarm.Foundations.AdaptiveCodeEvolution.suggest_adaptations(
            strategy,
            analysis_results,
            options
          )
        end)
      end

      @doc """
      Tracks usage of a module and action with all registered trackers.

      ## Parameters

        - `module`: The module being used.
        - `action`: The action being performed.
        - `context`: Additional context about the usage.
      """
      def track_usage(module, action, context \\ %{}) do
        Enum.each(trackers(), fn tracker ->
          AshSwarm.Foundations.AdaptiveCodeEvolution.record_usage(
            tracker,
            module,
            action,
            context
          )
        end)
      end

      @doc """
      Runs an experiment to test an adaptation.

      ## Parameters

        - `experiment_name`: The name of the experiment to run.
        - `target`: The target module for the experiment.
        - `options`: Options for the experiment, typically including the adaptation to test.

      ## Returns

        - `{:ok, :success, evaluation}` if the experiment was successful.
        - `{:ok, :failure, evaluation}` if the experiment was unsuccessful.
        - `{:error, reason}` if there was an error running the experiment.
      """
      def run_experiment(experiment_name, target, options \\ []) do
        experiment = Enum.find(experiments(), fn exp -> exp.name == experiment_name end)

        if experiment do
          AshSwarm.Foundations.AdaptiveCodeEvolution.run_experiment(experiment, target, options)
        else
          {:error, "Unknown experiment: #{experiment_name}"}
        end
      end

      @doc """
      Applies an adaptation to a target module.

      ## Parameters

        - `adaptation`: The adaptation to apply.
        - `target`: The target module for the adaptation.
        - `options`: Options for applying the adaptation.

      ## Returns

        - `{:ok, result}` if the adaptation was successfully applied.
        - `{:error, reason}` if there was an error applying the adaptation.
      """
      def apply_adaptation(adaptation, target, options \\ []) do
        AshSwarm.Foundations.AdaptiveCodeEvolution.apply_adaptation(adaptation, target, options)
      end
    end
  end

  @doc """
  Defines a code analyzer to identify patterns in code.

  ## Parameters

    - `name`: The name of the analyzer.
    - `opts`: Options for the analyzer, including:
      - `:description`: A description of what the analyzer does.
      - `:analyzer`: The function to run for analysis.
      - `:options`: Default options for the analyzer.
  """
  defmacro code_analyzer(name, opts) do
    quote do
      analyzer_def = %{
        name: unquote(name),
        description: unquote(opts[:description] || ""),
        analyzer_fn: unquote(opts[:analyzer]),
        options: unquote(opts[:options] || [])
      }

      @adaptive_analyzers analyzer_def
    end
  end

  @doc """
  Defines an adaptation strategy to suggest code improvements.

  ## Parameters

    - `name`: The name of the strategy.
    - `opts`: Options for the strategy, including:
      - `:description`: A description of what the strategy does.
      - `:strategy`: The function to suggest adaptations.
      - `:options`: Default options for the strategy.
  """
  defmacro adaptation_strategy(name, opts) do
    quote do
      strategy_def = %{
        name: unquote(name),
        description: unquote(opts[:description] || ""),
        strategy_fn: unquote(opts[:strategy]),
        options: unquote(opts[:options] || [])
      }

      @adaptation_strategies strategy_def
    end
  end

  @doc """
  Defines a usage tracker to monitor code usage patterns.

  ## Parameters

    - `name`: The name of the tracker.
    - `opts`: Options for the tracker, including:
      - `:description`: A description of what the tracker does.
      - `:tracker`: The function to record usage.
      - `:options`: Default options for the tracker.
  """
  defmacro usage_tracker(name, opts) do
    quote do
      tracker_def = %{
        name: unquote(name),
        description: unquote(opts[:description] || ""),
        tracker_fn: unquote(opts[:tracker]),
        options: unquote(opts[:options] || [])
      }

      @usage_trackers tracker_def
    end
  end

  @doc """
  Defines an experiment to test adaptations.

  ## Parameters

    - `name`: The name of the experiment.
    - `opts`: Options for the experiment, including:
      - `:description`: A description of what the experiment does.
      - `:setup`: Function to set up the experiment.
      - `:run`: Function to run the experiment.
      - `:evaluate`: Function to evaluate the experiment results.
      - `:cleanup`: Function to clean up after the experiment.
      - `:options`: Default options for the experiment.
  """
  defmacro experiment(name, opts) do
    quote do
      experiment_def = %{
        name: unquote(name),
        description: unquote(opts[:description] || ""),
        setup_fn: unquote(opts[:setup]),
        run_fn: unquote(opts[:run]),
        evaluate_fn: unquote(opts[:evaluate]),
        cleanup_fn: unquote(opts[:cleanup]),
        options: unquote(opts[:options] || [])
      }

      @experiments experiment_def
    end
  end

  @doc """
  Runs an analyzer on a module.

  ## Parameters

    - `analyzer`: The analyzer to run.
    - `module`: The module to analyze.
    - `options`: Options for the analyzer.

  ## Returns

    - A map containing the analysis results.
  """
  def run_analyzer(analyzer, module, options) do
    igniter = Igniter.new()

    case Igniter.Project.Module.find_module(igniter, module) do
      {:ok, {_igniter, source, _zipper}} ->
        # Extract the source code as a string for analysis
        source_code = Rewrite.Source.get(source, :content)
        # Call the analyzer function with both the module and its source code
        analyzer.analyzer_fn.(%{module: module, source: source_code}, options)

      {:error, reason} ->
        %{error: "Failed to find module #{inspect(module)}: #{inspect(reason)}"}
    end
  end

  @doc """
  Suggests adaptations based on analysis results.

  ## Parameters

    - `strategy`: The strategy to use for suggestions.
    - `analysis_results`: The results from run_analyzer/3.
    - `options`: Options for the strategy.

  ## Returns

    - A list of suggested adaptations.
  """
  def suggest_adaptations(strategy, analysis_results, options) do
    strategy.strategy_fn.(analysis_results, options)
  end

  @doc """
  Records usage of a module and action.

  ## Parameters

    - `tracker`: The tracker to use for recording.
    - `module`: The module being used.
    - `action`: The action being performed.
    - `context`: Additional context about the usage.
  """
  def record_usage(tracker, module, action, context) do
    tracker.tracker_fn.(module, action, context)
  end

  @doc """
  Runs an experiment to test an adaptation.

  ## Parameters

    - `experiment`: The experiment to run.
    - `target`: The target module for the experiment.
    - `options`: Options for the experiment, typically including the adaptation to test.

  ## Returns

    - `{:ok, :success, evaluation}` if the experiment was successful.
    - `{:ok, :failure, evaluation}` if the experiment was unsuccessful.
    - `{:error, reason}` if there was an error running the experiment.
  """
  def run_experiment(experiment, target, options) do
    # Setup experiment
    case experiment.setup_fn.(target, options) do
      {:ok, setup_data} ->
        # Run experiment
        case experiment.run_fn.(target, setup_data, options) do
          {:ok, run_result} ->
            # Evaluate experiment
            case experiment.evaluate_fn.(target, run_result, options) do
              {:ok, :success, evaluation} ->
                # Cleanup and return success
                experiment.cleanup_fn.(target, setup_data, run_result, :success)
                {:ok, :success, evaluation}

              {:ok, :failure, evaluation} ->
                # Cleanup and return failure
                experiment.cleanup_fn.(target, setup_data, run_result, :failure)
                {:ok, :failure, evaluation}

              error ->
                # Cleanup and return error
                experiment.cleanup_fn.(target, setup_data, run_result, :error)
                error
            end

          error ->
            # Cleanup and return error
            experiment.cleanup_fn.(target, setup_data, nil, :error)
            error
        end

      error ->
        error
    end
  end

  @doc """
  Applies an adaptation to a target module.

  ## Parameters

    - `adaptation`: The adaptation to apply.
    - `target`: The target module for the adaptation.
    - `options`: Options for applying the adaptation.

  ## Returns

    - `{:ok, result}` if the adaptation was successfully applied.
    - `{:error, reason}` if there was an error applying the adaptation.
  """
  def apply_adaptation(adaptation, target, _options) do
    igniter = Igniter.new()

    case Igniter.Project.Module.find_module(igniter, target) do
      {:ok, {igniter, _source, _zipper}} ->
        # Apply adaptation based on its type
        case adaptation.type do
          :add_function ->
            # Add a function to the module
            updated_igniter =
              Igniter.Project.Module.find_and_update_module(
                igniter,
                target,
                fn zipper ->
                  # Find the do block of the module
                  {:ok, do_block} = find_module_do_block(zipper)
                  # Create function AST
                  function_ast =
                    create_function_ast(
                      adaptation.function_name,
                      adaptation.args,
                      adaptation.body
                    )

                  # Add function to the module body
                  add_to_module_body(do_block, function_ast)
                end
              )

            case updated_igniter do
              {:ok, _} ->
                {:ok, %{module: target, adaptation_type: adaptation.type, applied: true}}

              {:error, reason} ->
                {:error, reason}
            end

          :modify_function ->
            # Find and modify a function
            updated_igniter =
              Igniter.Project.Module.find_and_update_module(
                igniter,
                target,
                fn zipper ->
                  # Apply the transformer to the module's AST
                  {:ok, modified_zipper} = adaptation.transformer.(zipper)
                  {:ok, modified_zipper}
                end
              )

            case updated_igniter do
              {:ok, _} ->
                {:ok, %{module: target, adaptation_type: adaptation.type, applied: true}}

              {:error, reason} ->
                {:error, reason}
            end

          :add_section ->
            # Add a section comment and code to the module
            updated_igniter =
              Igniter.Project.Module.find_and_update_module(
                igniter,
                target,
                fn zipper ->
                  # Find the do block of the module
                  {:ok, do_block} = find_module_do_block(zipper)
                  # Create section content with comment
                  section_ast = create_section_ast(adaptation.section_name, adaptation.content)
                  # Add section to the module body
                  add_to_module_body(do_block, section_ast)
                end
              )

            case updated_igniter do
              {:ok, _} ->
                {:ok, %{module: target, adaptation_type: adaptation.type, applied: true}}

              {:error, reason} ->
                {:error, reason}
            end

          :modify_section ->
            # Find and modify a section
            updated_igniter =
              Igniter.Project.Module.find_and_update_module(
                igniter,
                target,
                fn zipper ->
                  # Apply the transformer to the module's AST
                  {:ok, modified_zipper} = adaptation.transformer.(zipper)
                  {:ok, modified_zipper}
                end
              )

            case updated_igniter do
              {:ok, _} ->
                {:ok, %{module: target, adaptation_type: adaptation.type, applied: true}}

              {:error, reason} ->
                {:error, reason}
            end

          :add_attribute ->
            # Add an attribute to the module
            updated_igniter =
              Igniter.Project.Module.find_and_update_module(
                igniter,
                target,
                fn zipper ->
                  # Find the do block of the module
                  {:ok, do_block} = find_module_do_block(zipper)
                  # Create attribute AST
                  attribute_ast =
                    create_attribute_ast(adaptation.attribute_name, adaptation.value)

                  # Add attribute to the module body (at the beginning)
                  add_to_module_body_beginning(do_block, attribute_ast)
                end
              )

            case updated_igniter do
              {:ok, _} ->
                {:ok, %{module: target, adaptation_type: adaptation.type, applied: true}}

              {:error, reason} ->
                {:error, reason}
            end
        end

      {:error, reason} ->
        {:error, "Failed to find module #{inspect(target)}: #{inspect(reason)}"}
    end
  end

  # Helper functions for AST manipulation with Sourceror.Zipper

  defp find_module_do_block(zipper) do
    # Find the do block in a module definition
    # This is a simplified approach - in production code, we'd use a more robust method
    case Sourceror.Zipper.down(zipper) do
      %Sourceror.Zipper{} = z ->
        case find_do_block_in_children(z) do
          {:ok, block_zipper} -> {:ok, block_zipper}
          _ -> {:error, "Could not find module body"}
        end

      _ ->
        {:error, "Could not traverse module AST"}
    end
  end

  defp find_do_block_in_children(zipper) do
    # Look through children to find the do block
    case Sourceror.Zipper.node(zipper) do
      [do: block] when is_tuple(block) or is_list(block) ->
        {:ok, Sourceror.Zipper.down(zipper)}

      _ ->
        case Sourceror.Zipper.right(zipper) do
          %Sourceror.Zipper{} = right_zipper -> find_do_block_in_children(right_zipper)
          _ -> {:error, "No do block found"}
        end
    end
  end

  defp create_function_ast(function_name, args, body) do
    # Create AST for a function definition
    # In production, this would be more sophisticated
    # and handle different argument types and bodies properly
    quote do
      def unquote(function_name)(unquote_splicing(args)) do
        unquote(body)
      end
    end
  end

  defp create_section_ast(section_name, content) do
    # Create AST for a section with comment and content
    [
      {:__block__, [],
       [
         {:@, [], [{:doc, [], ["## Section: #{section_name}"]}]},
         content
       ]}
    ]
  end

  defp create_attribute_ast(attribute_name, value) do
    # Create AST for a module attribute
    {:@, [], [{attribute_name, [], [value]}]}
  end

  defp add_to_module_body(block_zipper, new_node) do
    # Add a node to the end of a module's body
    current_block = Sourceror.Zipper.node(block_zipper)

    case current_block do
      {:__block__, meta, children} when is_list(children) ->
        # Add the new node to the existing block
        new_block = {:__block__, meta, children ++ List.wrap(new_node)}
        {:ok, Sourceror.Zipper.replace(block_zipper, new_block)}

      _ ->
        # Create a new block with the current node and the new node
        new_block = {:__block__, [], [current_block, new_node]}
        {:ok, Sourceror.Zipper.replace(block_zipper, new_block)}
    end
  end

  defp add_to_module_body_beginning(block_zipper, new_node) do
    # Add a node to the beginning of a module's body
    current_block = Sourceror.Zipper.node(block_zipper)

    case current_block do
      {:__block__, meta, children} when is_list(children) ->
        # Add the new node to the beginning of the existing block
        new_block = {:__block__, meta, List.wrap(new_node) ++ children}
        {:ok, Sourceror.Zipper.replace(block_zipper, new_block)}

      _ ->
        # Create a new block with the new node and the current node
        new_block = {:__block__, [], [new_node, current_block]}
        {:ok, Sourceror.Zipper.replace(block_zipper, new_block)}
    end
  end

  @doc """
  Defines an AI-powered code analyzer.

  ## Parameters

    - `name`: The name of the AI analyzer.
    - `opts`: Options for the analyzer, including:
      - `:description`: A description of what the analyzer does.
      - `:model`: The default language model to use.
      - `:analyzer_module`: The module containing the analysis functions.
      - `:options`: Default options for the analyzer.
  """
  defmacro ai_analyzer(name, opts) do
    quote do
      analyzer_def = %{
        name: unquote(name),
        description: unquote(opts[:description] || ""),
        model: unquote(opts[:model]),
        analyzer_module: unquote(opts[:analyzer_module] || AshSwarm.Foundations.AICodeAnalysis),
        analyzer_function: unquote(opts[:analyzer_function] || :analyze_code),
        options: unquote(opts[:options] || [])
      }

      @ai_analyzers analyzer_def
    end
  end

  @doc """
  Defines an AI-powered adaptation strategy.

  ## Parameters

    - `name`: The name of the AI strategy.
    - `opts`: Options for the strategy, including:
      - `:description`: A description of what the strategy does.
      - `:model`: The default language model to use.
      - `:strategy_module`: The module containing the strategy functions.
      - `:options`: Default options for the strategy.
  """
  defmacro ai_strategy(name, opts) do
    quote do
      strategy_def = %{
        name: unquote(name),
        description: unquote(opts[:description] || ""),
        model: unquote(opts[:model]),
        strategy_module:
          unquote(opts[:strategy_module] || AshSwarm.Foundations.AIAdaptationStrategies),
        strategy_function:
          unquote(opts[:strategy_function] || :generate_optimized_implementation),
        options: unquote(opts[:options] || [])
      }

      @ai_strategies strategy_def
    end
  end

  @doc """
  Defines an AI-powered experiment evaluator.

  ## Parameters

    - `name`: The name of the AI evaluator.
    - `opts`: Options for the evaluator, including:
      - `:description`: A description of what the evaluator does.
      - `:model`: The default language model to use.
      - `:evaluator_module`: The module containing the evaluation functions.
      - `:options`: Default options for the evaluator.
  """
  defmacro ai_evaluator(name, opts) do
    quote do
      evaluator_def = %{
        name: unquote(name),
        description: unquote(opts[:description] || ""),
        model: unquote(opts[:model]),
        evaluator_module:
          unquote(opts[:evaluator_module] || AshSwarm.Foundations.AIExperimentEvaluation),
        evaluator_function: unquote(opts[:evaluator_function] || :evaluate_experiment),
        options: unquote(opts[:options] || [])
      }

      @ai_evaluators evaluator_def
    end
  end

  @doc """
  Analyzes code using an AI-powered analyzer.

  ## Parameters

    - `analyzer`: The AI analyzer to use.
    - `module_or_source`: The module or source code to analyze.
    - `options`: Options for the analysis.

  ## Returns

    - `{:ok, analysis}` if the analysis was successful.
    - `{:error, reason}` if there was an error.
  """
  def run_ai_analysis(analyzer, module_or_source, options \\ []) do
    # Merge options with analyzer defaults
    options = Keyword.merge(analyzer.options, options)
    options = Keyword.put_new(options, :model, analyzer.model)

    # Call the analyzer module with the appropriate function
    apply(analyzer.analyzer_module, analyzer.analyzer_function, [module_or_source, options])
  end

  @doc """
  Generates optimized code using an AI-powered strategy.

  ## Parameters

    - `strategy`: The AI strategy to use.
    - `original_code`: The original code to optimize.
    - `usage_data`: Usage data to inform the optimization.
    - `options`: Options for the strategy.

  ## Returns

    - `{:ok, optimized_code}` if the generation was successful.
    - `{:error, reason}` if there was an error.
  """
  def generate_ai_optimization(strategy, original_code, usage_data, options \\ []) do
    # Merge options with strategy defaults
    options = Keyword.merge(strategy.options, options)
    options = Keyword.put_new(options, :model, strategy.model)

    # Call the strategy module with the appropriate function
    apply(strategy.strategy_module, strategy.strategy_function, [
      original_code,
      usage_data,
      options
    ])
  end

  @doc """
  Evaluates an experiment using an AI-powered evaluator.

  ## Parameters

    - `evaluator`: The AI evaluator to use.
    - `original_code`: The original code before adaptation.
    - `adapted_code`: The code after adaptation.
    - `metrics`: Performance metrics from running both versions.
    - `options`: Options for the evaluation.

  ## Returns

    - `{:ok, evaluation}` if the evaluation was successful.
    - `{:error, reason}` if there was an error.
  """
  def evaluate_ai_experiment(evaluator, original_code, adapted_code, metrics, options \\ []) do
    # Merge options with evaluator defaults
    options = Keyword.merge(evaluator.options, options)
    options = Keyword.put_new(options, :model, evaluator.model)

    # Call the evaluator module with the appropriate function
    apply(evaluator.evaluator_module, evaluator.evaluator_function, [
      original_code,
      adapted_code,
      metrics,
      options
    ])
  end
end
