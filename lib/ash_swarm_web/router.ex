defmodule AshSwarmWeb.Router do
  use AshSwarmWeb, :router

  use AshAuthentication.Phoenix.Router

  import AshAuthentication.Plug.Helpers
  import Oban.Web.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {AshSwarmWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :load_from_session
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :load_from_bearer
    plug :set_actor, :user
  end

  scope "/", AshSwarmWeb do
    pipe_through :browser

    ash_authentication_live_session :authenticated_routes do
      # in each liveview, add one of the following at the top of the module:
      #
      # If an authenticated user must be present:
      # on_mount {AshSwarmWeb.LiveUserAuth, :live_user_required}
      #
      # If an authenticated user *may* be present:
      # on_mount {AshSwarmWeb.LiveUserAuth, :live_user_optional}
      #
      # If an authenticated user must *not* be present:
      # on_mount {AshSwarmWeb.LiveUserAuth, :live_no_user}
    end
  end

  scope "/api/json" do
    pipe_through [:api]

    forward "/swaggerui",
            OpenApiSpex.Plug.SwaggerUI,
            path: "/api/json/open_api",
            default_model_expand_depth: 4

    forward "/", AshSwarmWeb.AshJsonApiRouter
  end

  scope "/", AshSwarmWeb do
    pipe_through :browser

    oban_dashboard("/oban")

    get "/", PageController, :home
    auth_routes AuthController, AshSwarm.Accounts.User, path: "/auth"
    sign_out_route AuthController

    # Remove these if you'd like to use your own authentication views
    sign_in_route register_path: "/register",
                  reset_path: "/reset",
                  auth_routes_prefix: "/auth",
                  on_mount: [{AshSwarmWeb.LiveUserAuth, :live_no_user}],
                  overrides: [
                    AshSwarmWeb.AuthOverrides,
                    AshAuthentication.Phoenix.Overrides.Default
                  ]

    # Remove this if you do not want to use the reset password feature
    reset_route auth_routes_prefix: "/auth",
                overrides: [
                  AshSwarmWeb.AuthOverrides,
                  AshAuthentication.Phoenix.Overrides.Default
                ]

    live "/workflows", WorkflowLive.Index, :index
    live "/workflows/new", WorkflowLive.Index, :new
    live "/workflows/:id/edit", WorkflowLive.Index, :edit

    live "/workflows/:id", WorkflowLive.Show, :show
    live "/workflows/:id/show/edit", WorkflowLive.Show, :edit

    live "/kpis", KpiLive.Index, :index
    live "/kpis/new", KpiLive.Index, :new
    live "/kpis/:id/edit", KpiLive.Index, :edit

    live "/kpis/:id", KpiLive.Show, :show
    live "/kpis/:id/show/edit", KpiLive.Show, :edit
  end

  # Other scopes may use custom stacks.
  # scope "/api", AshSwarmWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:ash_swarm, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: AshSwarmWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  if Application.compile_env(:ash_swarm, :dev_routes) do
    import AshAdmin.Router

    scope "/admin" do
      pipe_through :browser

      ash_admin "/"
    end
  end
end
