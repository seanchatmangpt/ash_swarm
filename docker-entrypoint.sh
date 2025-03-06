#!/bin/bash
set -e

# Wait for the database to be ready
until nc -z db 5432; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Print Elixir and Erlang versions
echo "Elixir version:"
elixir --version
echo "Erlang version:"
erl -noshell -eval 'io:fwrite("~s~n", [erlang:system_info(otp_release)])' -s init stop

# Ensure we're in the app directory
cd /app

# Install dependencies if they don't exist
if [ ! -d "deps" ] || [ ! "$(ls -A deps)" ]; then
  echo "Installing dependencies..."
  mix deps.get
else
  echo "Dependencies already installed, skipping..."
fi

# Compile the project
echo "Compiling project..."
mix deps.compile
mix compile

# Install and compile assets
if [ -d "assets" ]; then
  echo "Setting up assets..."
  mix assets.setup
  mix assets.build
fi

# Run migrations if the database exists
if mix ecto.create --quiet; then
  echo "Database created. Running migrations..."
else
  echo "Database already exists. Running migrations..."
fi
mix ecto.migrate

# Execute the passed command
echo "Executing command: $@"
exec "$@" 