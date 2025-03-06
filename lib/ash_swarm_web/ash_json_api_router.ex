defmodule AshSwarmWeb.AshJsonApiRouter do
  use AshJsonApi.Router,
    domains: [Module.concat(["AshSwarm.Workflows"]), Module.concat(["AshSwarm.Kpis"])],
    open_api: "/open_api"
end
