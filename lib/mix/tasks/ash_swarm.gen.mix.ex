defmodule Mix.Tasks.AshSwarm.Gen.Mix do
  use Igniter.Mix.Task

  @shortdoc "Generate a Mix task module using Igniter"
  @example """
  mix ash_swarm.gen.mix MyApp.FetchReposTask \\
    --arg username:string \\
    --option language:csv \\
    -o verbose:boolean
  """

  @moduledoc """
  Generate a Mix task module.

  ## Example

  ```bash
  #{@example}
  ```

  Options:
    * `--arg` (or `-a`): A comma-separated list of arguments, each as `username`.
    * `--option` (or `-o`): A comma-separated list of options, each as `verbose:boolean`.
  """

  @impl Igniter.Mix.Task
  def info(argv, _parent) do
    IO.inspect(argv)

    %Igniter.Mix.Task.Info{
      positional: [:mix_task],
      example: @example,
      schema: [
        arg: :csv,
        option: :csv
      ],
      aliases: [
        a: :arg,
        o: :option
      ]
    }
  end

  @impl Igniter.Mix.Task
  def igniter(igniter) do
    IO.inspect(igniter)
    mix_task_module = Igniter.Project.Module.parse(igniter.args.positional.mix_task)
    {exists?, igniter} = Igniter.Project.Module.module_exists(igniter, mix_task_module)

    if "--ignore-if-exists" in igniter.args.argv_flags and exists? do
      Mix.shell().info("Skipping Mix task generation: #{mix_task_module} already exists.")
      igniter
    else
      generate(mix_task_module, igniter)
    end
  end

  defp generate(mix_task_module, %{args: %{options: options}} = igniter) do
    args = options |> Keyword.get(:arg, []) |> parse_args()
    task_options = options |> Keyword.get(:option, []) |> parse_options()

    # Extract positional argument names (no types in positional)
    positional_args = Enum.map(args, fn {name, _type} -> name end)

    # Construct schema from --option values (ensuring correct types from CLI)
    schema_entries = Enum.map(task_options, fn {key, type} -> {key, String.to_atom(type)} end)

    # Generate aliases from schema (first character of each key)
    aliases_entries =
      Enum.map(task_options, fn {key, _type} ->
        {String.first(Atom.to_string(key)) |> String.to_atom(), key}
      end)

    # Auto-generate a shortdoc
    shortdoc =
      "Mix task for #{mix_task_module |> Atom.to_string() |> String.replace_prefix("Elixir.", "")}"

    # Generate example command correctly
    example_command =
      "mix #{String.replace_leading(Atom.to_string(mix_task_module), "Elixir.", "")} " <>
        Enum.join(positional_args, " ") <>
        if task_options != [],
          do:
            " " <>
              (Enum.map(task_options, fn {k, v} -> "--#{k} #{to_string(v)}" end)
               |> Enum.join(" ")),
          else: ""

    Igniter.Project.Module.create_module(igniter, mix_task_module, """
      use Igniter.Mix.Task

      @shortdoc "#{shortdoc}"

      @moduledoc \"\"\"
      #{shortdoc}

      ## Example

      ```bash
      #{example_command}
      ```
      \"\"\"

      @impl Igniter.Mix.Task
      def info(_argv, _parent) do
        %Igniter.Mix.Task.Info{
          # a list of positional arguments, i.e `[:file]`
          positional: #{inspect(positional_args)},
          schema: #{inspect(schema_entries)},
          aliases: #{inspect(aliases_entries)}
        }
      end

      @impl Igniter.Mix.Task
      def igniter(igniter) do
        args = igniter.args.positional
        options = igniter.args.options

        IO.puts("Running \#{inspect(__MODULE__)} with arguments: \#{inspect(args)} and options: \#{inspect(options)}")

        # Implement the task logic here
        igniter
      end
    """)
  end

  defp parse_args([]), do: []

  defp parse_args(args) when is_list(args) do
    Enum.map(args, fn arg ->
      case String.split(arg, ":") do
        [name, type] -> {String.to_atom(name), String.to_atom(type)}
        _ -> Mix.raise("Invalid argument format: #{inspect(arg)}. Expected name:type.")
      end
    end)
  end

  defp parse_options([]), do: %{}

  defp parse_options(options) when is_list(options) do
    Enum.into(options, %{}, fn option ->
      case String.split(option, ":") do
        [key, "true"] -> {String.to_atom(key), true}
        [key, "false"] -> {String.to_atom(key), false}
        [key, value] -> {String.to_atom(key), value}
        _ -> Mix.raise("Invalid option format: #{inspect(option)}. Expected key:value.")
      end
    end)
  end
end
