#!/bin/bash

# Set database environment variables for AshSwarm
export POSTGRES_USER="ash_user"
export POSTGRES_PASSWORD="ash_password"
export POSTGRES_HOST="localhost"
export POSTGRES_DB="ash_swarm_dev"

echo "Database environment variables set:"
echo "POSTGRES_USER: $POSTGRES_USER"
echo "POSTGRES_PASSWORD: $POSTGRES_PASSWORD"
echo "POSTGRES_HOST: $POSTGRES_HOST"
echo "POSTGRES_DB: $POSTGRES_DB"

# Verify that the database is accessible
echo "Checking database connection..."
psql -U "$POSTGRES_USER" -h "$POSTGRES_HOST" -d "$POSTGRES_DB" -c "SELECT 'Connection successful!';" || {
  echo "Failed to connect to database."
  echo "Make sure PostgreSQL is running and the user has proper permissions."
  exit 1
}

echo "You can now run your application with these environment variables"
echo "Source this script before running the application:"
echo "source setup_db_env.sh"
