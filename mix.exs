defmodule AshSwarm.MixProject do
  use Mix.Project

  def project do
    [
      app: :ash_swarm,
      version: "0.1.0",
      elixir: "~> 1.14",
      elixirc_paths: elixirc_paths(Mix.env()),
      elixirc_options: [
        # warnings_as_errors: Mix.env() != :test,
        # warn_unused: Mix.env() != :test
      ],
      start_permanent: Mix.env() == :prod,
      consolidate_protocols: Mix.env() != :dev,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {AshSwarm.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:bcrypt_elixir, "~> 3.0"},
      {:picosat_elixir, "~> 0.2"},
      {:ash_authentication_phoenix, "~> 2.0"},
      {:open_api_spex, "~> 3.0"},
      {:oban, "~> 2.0"},
      {:ash_state_machine, "~> 0.2"},
      {:ash_oban, "~> 0.3"},
      {:ash_admin, "~> 0.13"},
      {:ash_postgres, "~> 2.0"},
      {:ash_json_api, "~> 1.0"},
      {:ash_phoenix, "~> 2.0"},
      {:sourceror, "~> 1.7"},
      {:ash, "~> 3.0"},
      {:igniter, "~> 0.5"},
      {:phoenix, "~> 1.7.20"},
      {:phoenix_ecto, "~> 4.5"},
      {:ecto_sql, "~> 3.10"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 4.1"},
      {:phoenix_live_reload, "~> 1.5.3", only: :dev},
      {:phoenix_live_view, "~> 1.0.0"},
      {:floki, ">= 0.30.0", only: :test},
      {:phoenix_live_dashboard, "~> 0.8.3"},
      {:esbuild, "~> 0.8", runtime: Mix.env() == :dev},
      {:tailwind, "~> 0.2", runtime: Mix.env() == :dev},
      {:heroicons,
       github: "tailwindlabs/heroicons",
       tag: "v2.1.1",
       sparse: "optimized",
       app: false,
       compile: false,
       depth: 1},
      {:swoosh, "~> 1.5"},
      {:finch, "~> 0.13"},
      {:telemetry_metrics, "~> 1.0"},
      {:telemetry_poller, "~> 1.0"},
      {:gettext, "~> 0.26"},
      {:jason, "~> 1.2"},
      {:dns_cluster, "~> 0.1.1"},
      {:bandit, "~> 1.5"},
      {:yaml_elixir, "~> 2.9"},
      {:ymlr, "~> 5.1"},
      {:toml, "~> 0.7"},
      {:instructor, "~> 0.1.0"},
      {:httpoison, "~> 2.2"},
      {:oban_web, "~> 2.11"},
      {:openai_ex, "~> 0.8"},
      {:mox, "~> 1.1", only: :test},
      {:uuid, "~> 1.1"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to install project dependencies and perform other setup tasks, run:
  #
  #     $ mix setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      setup: ["deps.get", "ash.setup", "assets.setup", "assets.build", "run priv/repo/seeds.exs"],
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ash.setup --quiet", "test"],
      "assets.setup": ["tailwind.install --if-missing", "esbuild.install --if-missing"],
      "assets.build": ["tailwind ash_swarm", "esbuild ash_swarm"],
      "assets.deploy": [
        "tailwind ash_swarm --minify",
        "esbuild ash_swarm --minify",
        "phx.digest"
      ],
      "phx.routes": ["phx.routes", "ash_json_api.routes", "ash_authentication.phoenix.routes"]
    ]
  end
end
