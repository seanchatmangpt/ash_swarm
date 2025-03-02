defmodule Mix.Tasks.Reactor.Gen.Reactor do
  use Igniter.Mix.Task

  @shortdoc "Generate a Reactor module and step modules using Igniter"
  @example "mix reactor.gen.reactor MyApp.CheckoutReactor --inputs email:string,password:string --steps register_user:MyApp.RegisterUserStep,create_stripe_customer:MyApp.CreateStripeCustomerStep --return register_user"

  @moduledoc """
  Generate a Reactor module and its step modules.

  ## Example

  ```bash
  #{@example}
  ```

  Options:
    * `--inputs` (or `-i`): A comma-separated list of inputs, each as `name:type`.
    * `--steps` (or `-s`): A comma-separated list of steps, each as `step_name:StepModule`.
    * `--return` (or `-r`): The name of the step to return.
  """

  @impl Igniter.Mix.Task
  def info(_argv, _parent) do
    %Igniter.Mix.Task.Info{
      positional: [:reactor],
      example: @example,
      schema: [
        inputs: :csv,
        steps: :csv,
        return: :string
      ],
      aliases: [
        i: :inputs,
        s: :steps,
        r: :return
      ]
    }
  end

  @impl Igniter.Mix.Task
  def igniter(igniter) do
    reactor = Igniter.Project.Module.parse(igniter.args.positional.reactor)
    {exists?, igniter} = Igniter.Project.Module.module_exists(igniter, reactor)

    if "--ignore-if-exists" in igniter.args.argv_flags && exists? do
      Mix.shell().info("Skipping Reactor generation: #{reactor} already exists.")
      igniter
    else
      inputs = parse_inputs(Keyword.get(igniter.args.options, :inputs, []))
      steps = parse_steps(Keyword.get(igniter.args.options, :steps, []))

      return_step =
        Keyword.get(igniter.args.options, :return) ||
          Mix.raise("You must specify a return step with --return")

      inputs_code = generate_inputs(inputs)
      steps_code = generate_steps(steps)

      # Generate Step Modules
      igniter =
        Enum.reduce(steps, igniter, fn {_step_name, module_name}, acc ->
          create_step_module(acc, module_name)
        end)

      # Generate Reactor module
      igniter =
        Igniter.Project.Module.create_module(igniter, reactor, """
        use Reactor

        #{inputs_code}

        #{steps_code}

        return :#{return_step}
        """)

      igniter
    end
  end

  def parse_inputs([]), do: []

  def parse_inputs(inputs) when is_list(inputs) do
    Enum.map(inputs, fn input ->
      case String.split(input, ":") do
        [name, _type] -> String.to_atom(name)
        _ -> Mix.raise("Invalid input format: #{inspect(input)}. Expected name:type.")
      end
    end)
  end

  def parse_steps([]), do: []

  def parse_steps(steps) do
    Enum.map(steps, fn step ->
      case String.split(step, ":") do
        [name, module] ->
          {String.to_atom(name), Module.concat([module])}

        _ ->
          Mix.raise("Invalid step format: #{inspect(step)}. Expected name:Module.")
      end
    end)
  end

  defp generate_inputs(inputs) do
    inputs
    |> Enum.map(fn name -> "input :#{name}" end)
    |> Enum.join("\n")
  end

  def generate_steps(steps) do
    steps
    |> Enum.map(fn {name, module} ->
      """
      step :#{name}, #{inspect(module)} do
        # Implement the step here
      end
      """
    end)
    |> Enum.join("\n")
  end

  # ✅ Function to Generate Step Modules
  def create_step_module(igniter, module_name) do
    {exists?, igniter} = Igniter.Project.Module.module_exists(igniter, module_name)

    if exists? do
      Mix.shell().info("Skipping Step module: #{module_name} already exists.")
      igniter
    else
      Mix.shell().info("Generating Step module: #{module_name}")

      # Generate Step Module
      Igniter.Project.Module.create_module(igniter, module_name, """
      use Reactor.Step

      @impl true
      def run(arguments, _context, _options) do
        {:ok, :not_implemented}
      end
      """)
    end
  end
end
