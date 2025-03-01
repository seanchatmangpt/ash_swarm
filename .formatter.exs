[
  import_deps: [
    :reactor,
    :oban,
    :ash_oban,
    :ash_admin,
    :ash_postgres,
    :ash_json_api,
    :ash,
    :ecto,
    :ecto_sql,
    :phoenix
  ],
  subdirectories: ["priv/*/migrations"],
  plugins: [Spark.Formatter, Phoenix.LiveView.HTMLFormatter],
  inputs: ["*.{heex,ex,exs}", "{config,lib,test}/**/*.{heex,ex,exs}", "priv/*/seeds.exs"]
]
