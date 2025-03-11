# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :ash_swarm, Oban,
  engine: Oban.Engines.Basic,
  notifier: Oban.Notifiers.PG,
  queues: [default: 10],
  repo: AshSwarm.Repo

config :ash_swarm, Oban,
  repo: AshSwarm.Repo,
  plugins: [
    {Oban.Plugins.Cron,
     crontab: [
       {"* * * * *", AshSwarm.Reactors.QASagaJob,
        [args: %{question: "Show me the 25 C4 model diagrams for AGI using plantuml"}]}
     ]}
  ],
  queues: [default: 10]

default_instructor_adapter =
  "ASH_SWARM_DEFAULT_INSTRUCTOR_ADAPTER"
  |> System.get_env("Instructor.Adapters.Groq")
  |> String.trim()
  |> String.replace_prefix("", "Elixir.")
  |> String.to_atom()

config :instructor,
  adapter: default_instructor_adapter

config :instructor, :groq,
  api_url: System.get_env("GROQ_API_URL", "https://api.groq.com/openai"),
  api_key: System.get_env("GROQ_API_KEY", "")

config :instructor, :openai,
  api_url: System.get_env("OPENAI_API_URL"),
  api_key: System.get_env("OPENAI_API_KEY", "")

config :instructor, :gemini, api_key: System.get_env("GEMINI_API_KEY")

config :mime,
  extensions: %{"json" => "application/vnd.api+json"},
  types: %{"application/vnd.api+json" => ["json"]}

config :ash_json_api, show_public_calculations_when_loaded?: false

config :ash,
  allow_forbidden_field_for_relationships_by_default?: true,
  include_embedded_source_by_default?: false,
  show_keysets_for_all_actions?: false,
  default_page_type: :keyset,
  policies: [no_filter_static_forbidden_reads?: false]

config :spark,
  formatter: [
    remove_parens?: true,
    "Ash.Resource": [
      section_order: [
        :authentication,
        :tokens,
        :admin,
        :postgres,
        :json_api,
        :resource,
        :code_interface,
        :actions,
        :policies,
        :pub_sub,
        :preparations,
        :changes,
        :validations,
        :multitenancy,
        :attributes,
        :relationships,
        :calculations,
        :aggregates,
        :identities
      ]
    ],
    "Ash.Domain": [
      section_order: [
        :admin,
        :json_api,
        :resources,
        :policies,
        :authorization,
        :domain,
        :execution
      ]
    ]
  ]

config :ash_swarm,
  ecto_repos: [AshSwarm.Repo],
  generators: [timestamp_type: :utc_datetime],
  ash_domains: [
    AshSwarm.Kpis,
    AshSwarm.Accounts,
    AshSwarm.Workflows,
    AshSwarm.Reactors,
    AshSwarm.Ontology
  ]

# Configures the endpoint
config :ash_swarm, AshSwarmWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [html: AshSwarmWeb.ErrorHTML, json: AshSwarmWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: AshSwarm.PubSub,
  live_view: [signing_salt: "aWB44+46"]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :ash_swarm, AshSwarm.Mailer, adapter: Swoosh.Adapters.Local

# Configure esbuild (the version is required)
config :esbuild,
  version: "0.17.11",
  ash_swarm: [
    args:
      ~w(js/app.js --bundle --target=es2017 --outdir=../priv/static/assets --external:/fonts/* --external:/images/*),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]

# Configure tailwind (the version is required)
config :tailwind,
  version: "3.4.3",
  ash_swarm: [
    args: ~w(
      --config=tailwind.config.js
      --input=css/app.css
      --output=../priv/static/assets/app.css
    ),
    cd: Path.expand("../assets", __DIR__)
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
