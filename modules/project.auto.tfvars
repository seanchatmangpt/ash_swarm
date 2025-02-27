github_owner = "seanchatmangpt"
repo_name    = "ash_swarm"

milestones = {
  "infrastructure" = {
    title       = "Infrastructure"
    due_date    = "2025-02-26"
    description = <<EOT
This milestone includes everything needed to build the application
(e.g. Dockerfile), provisioning AWS, local environment, base AMI, etc.
EOT
  },
  "ci-cd" = {
    title       = "Continuous Deployment / Continuous Integration"
    due_date    = "2025-02-26"
    description = <<EOT
All deliverables for GitHub workflows: basic Elixir checks, building
Docker images, pulling the latest images in production.
EOT
  },
  "instrumentation" = {
    title       = "Instrumentation"
    due_date    = "2025-02-26"
    description = <<EOT
Addition of basic instrumentation, BEAM-specific metrics for the
application, any tasks related to instrumentation.
EOT
  },
  "documentation" = {
    title       = "Documentation"
    due_date    = "2025-02-26"
    description = <<EOT
All docs for Terraform, Elixir, Packer, or anything else that converges
with CI as needed.
EOT
  },
  "uncategorized" = {
    title       = "Uncategorized"
    due_date    = "2025-02-26"
    description = <<EOT
A milestone for everything that doesn't fit the other categories.
EOT
  }
}

labels = {
  "kind-infrastructure" = {
    name  = "Kind:Infrastructure"
    color = "B60205"
  },
  "kind-ci-cd" = {
    name  = "Kind:CI-CD"
    color = "FBCA04"
  },
  "kind-instrumentation" = {
    name  = "Kind:Instrumentation"
    color = "0E8A16"
  },
  "kind-documentation" = {
    name  = "Kind:Documentation"
    color = "5319E7"
  },
  "kind-uncategorized" = {
    name  = "Kind:Uncategorized"
    color = "D93F0B"
  },
  "tech-docker" = {
    name  = "Tech:Docker"
    color = "1D76DB"
  },
  "dockerfile" = {
    name  = "Dockerfile"
    color = "3895AD"
  },
  "tech-elixir" = {
    name  = "Tech:Elixir"
    color = "D9B1FC"
  },
  "tech-gha" = {
    name  = "Tech:GHA"
    color = "66FE68"
  },
  "tech-docker-compose" = {
    name  = "Tech:Docker-Compose"
    color = "006B75"
  },
  "tech-packer" = {
    name  = "Tech:Packer"
    color = "1D76DB"
  },
  "tech-terraform" = {
    name  = "Tech:Terraform"
    color = "5319A1"
  },
  "tech-sops" = {
    name  = "Tech:SOPS"
    color = "F9D0C4"
  },
  "env-aws" = {
    name  = "Env:AWS"
    color = "D3A968"
  },
  "env-local" = {
    name  = "Env:Local"
    color = "0075ca"
  }
}

issues = [
  {
    title     = "Implement the Dockerfile's builder stage"
    body      = <<EOT
The builder stage packages all tools & compile-time dependencies for
the app. It must build the mix release that is then copied into the runner.
EOT
    labels    = ["kind-infrastructure", "dockerfile"]
    milestone = "infrastructure"
  },
  {
    title     = "Implement the Dockerfile's runner stage"
    body      = <<EOT
This stage copies the release built in the builder stage and sets it as
the entrypoint with minimal runtime overhead.
EOT
    labels    = ["kind-infrastructure", "dockerfile"]
    milestone = "infrastructure"
  },
  {
    title     = "Elixir integration pipelines"
    body      = <<EOT
Add a CI pipeline for:
- code compilation
- dependency caching
- tests
- formatting
- unused dependency checks
EOT
    labels    = ["kind-ci-cd", "tech-elixir"]
    milestone = "ci-cd"
  },
  {
    title     = "Add instrumentation library"
    body      = "Add Telemetry or PromEx for basic metrics & logs. Possibly add a Grafana stack?"
    labels    = ["kind-instrumentation"]
    milestone = "instrumentation"
  },
  {
    title     = "Add dev environment documentation"
    body      = "We need a doc page that covers local environment setup, Docker Compose usage, etc."
    labels    = ["kind-documentation"]
    milestone = "documentation"
  },
  {
    title     = "Investigate performance"
    body      = "We suspect a CPU bottleneck in the domain reasoning code. Let's add tracing or logs."
    labels    = ["kind-uncategorized"]
    milestone = "uncategorized"
  }
]
