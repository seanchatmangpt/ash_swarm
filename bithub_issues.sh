#!/bin/bash

# Set application and module names
APP_NAME="bithub"
DOMAIN_MODULE="Bithub.Issues"
RESOURCE_MODULE="Bithub.Issues.Issue"
CONTROLLER_MODULE="BithubWeb.GitHubWebhookController"

echo "🚀 Setting up GitHub Issues with Ash, PubSub, and Webhooks..."

# 1️⃣ Generate the Ash domain if it does not exist
mix ash.gen.domain $DOMAIN_MODULE --ignore-if-exists

# 2️⃣ Generate the Ash Resource for Issues with PubSub support
mix ash.gen.resource $RESOURCE_MODULE \
  --default-actions read,create,update,destroy \
  --uuid-primary-key id \
  --attribute issue_title:string:required:public \
  --attribute issue_body:string:required:public \
  --attribute repo_id:string:required:public \
  --timestamps \
  --extend postgres,graphql

# 3️⃣ Generate a Phoenix Controller for the GitHub Issue Webhook
mix phx.gen.html GitHubWebhook Issue --no-schema --no-context

# 4️⃣ Modify the Router to Add the Webhook Route
ROUTER_FILE="lib/$APP_NAME"_web/router.ex
if ! grep -q "GitHubWebhookController" "$ROUTER_FILE"; then
  echo "Adding GitHub Webhook route..."
  sed -i '' "/scope \"/a\\
\\
  scope \"/webhooks\", BithubWeb do\\
    post \"/github/issues\", GitHubWebhookController, :receive\\
  end
" "$ROUTER_FILE"
fi

# 5️⃣ Ensure Phoenix PubSub is configured
CONFIG_FILE="config/config.exs"
if ! grep -q "pubsub_server" "$CONFIG_FILE"; then
  echo "Configuring Phoenix PubSub..."
  echo "
config :$APP_NAME, BithubWeb.Endpoint,
  pubsub_server: Bithub.PubSub
" >> "$CONFIG_FILE"
fi

# 6️⃣ Ensure PubSub is started in the Application Supervisor
APPLICATION_FILE="lib/$APP_NAME/application.ex"
if ! grep -q "Phoenix.PubSub" "$APPLICATION_FILE"; then
  echo "Adding PubSub to Application Supervisor..."
  sed -i '' "/children = \[/a\\
    {Phoenix.PubSub, name: Bithub.PubSub},
" "$APPLICATION_FILE"
fi

# 7️⃣ Format the codebase
mix format

echo "✅ Setup Complete! Run 'mix phx.server' to start the application."
echo "🌍 Use 'ngrok http 4000' to expose the webhook for GitHub integration."
