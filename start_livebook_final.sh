#!/bin/bash

# Script to start the Livebook server with fixed code
echo "Starting Livebook for AshSwarm..."

# Clean and compile ash_swarm with no-warnings-as-errors
echo "Compiling dependencies with warnings disabled..."
cd /Users/speed/ash_swarm
mix deps.clean --unused
mix deps.get
mix compile --no-warnings-as-errors

# Kill any existing Livebook processes
echo "Stopping any existing Livebook and Elixir processes..."
pkill -f livebook || true
pkill -f beam.smp || true

# Export necessary environment variables for Livebook
export LIVEBOOK_TOKEN_ENABLED=false
export LIVEBOOK_PORT=8082

# Environment variables to prevent database connection issues
export ASH_DATABASE_MODE=mock
export OBAN_TESTING=inline
export OBAN_QUEUES=false
export OBAN_PLUGINS=false
export OBAN_ENGINE=immediate

# Environment variables for AshSwarm and Ash configuration
export ELIXIR_ERL_OPTIONS="-ash validate_domain_config_inclusion false"
export ASH_DISABLE_VALIDATION=true
export ASH_DISABLE_DOMAIN_VALIDATION=true

# Start Livebook with proper settings
echo "Starting Livebook server on port 8082..."
livebook server

echo "Livebook server has stopped." 
