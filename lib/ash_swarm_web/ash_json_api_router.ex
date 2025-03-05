defmodule AshSwarmWeb.AshJsonApiRouter do
  use AshJsonApi.Router,
    domains: [Module.concat(["AshSwarm.Workflows"])],
    open_api: "/open_api"
end
