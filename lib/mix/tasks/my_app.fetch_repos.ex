defmodule Mix.Tasks.MyApp.FetchRepos do
  use Igniter.Mix.Task

  @shortdoc "Mix task for Mix.Tasks.MyApp.FetchRepos"

  @moduledoc """
  Mix task for Mix.Tasks.MyApp.FetchRepos

  ## Example

  TODO: Update this example with the correct command

  ```bash
  mix my_app.fetch_repos username --verbose boolean --language csv
  ```
  """

  @impl Igniter.Mix.Task
  def info(_argv, _parent) do
    %Igniter.Mix.Task.Info{
      # a list of positional arguments, i.e `[:file]`
      positional: [:username],
      schema: [verbose: :boolean, language: :csv],
      aliases: [v: :verbose, l: :language]
    }
  end

  @impl Igniter.Mix.Task
  def igniter(igniter) do
    args = igniter.args.positional
    options = igniter.args.options

    IO.puts(
      "Running #{inspect(__MODULE__)} with arguments: #{inspect(args)} and options: #{inspect(options)}"
    )

    # Implement the task logic here
    igniter
  end
end
