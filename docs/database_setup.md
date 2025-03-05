# Database Setup for AshSwarm

This document outlines the steps required to set up the database for the AshSwarm project, particularly for using the Adaptive Code Evolution feature.

## Prerequisites

- PostgreSQL 14.x or higher installed
- Basic knowledge of PostgreSQL administration

## Database Configuration Steps

1. Create the necessary PostgreSQL roles:

```bash
# Create the postgres role (if it doesn't exist)
psql postgres -c "CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres' SUPERUSER;"

# Create the application role
psql postgres -c "CREATE ROLE ash_user WITH LOGIN PASSWORD 'ash_password' CREATEDB;"
```

2. Create the development database:

```bash
psql postgres -c "CREATE DATABASE ash_swarm_dev OWNER ash_user;"
```

3. Update environment variables for database connection:

```bash
export POSTGRES_USER="ash_user"
export POSTGRES_PASSWORD="ash_password"
export POSTGRES_HOST="localhost"
export POSTGRES_DB="ash_swarm_dev"
```

For convenience, you can use the provided scripts:

- `setup_db_env.sh`: Sets the environment variables for database connection
- `config_db.exs`: Updates the runtime configuration for the application

## Running the Adaptive Code Evolution Feature

To manually trigger the Adaptive Code Evolution feature:

1. Ensure the database is properly configured:

```bash
# Source the environment variables
source setup_db_env.sh

# Update the runtime configuration
mix run config_db.exs
```

2. Run the adaptive evolution script:

```bash
mix run run_adaptive_evolution.exs
```

This will:
- Analyze usage patterns for the specified modules
- Identify optimization opportunities
- Apply optimizations based on usage statistics
- Log the evolution process for further analysis

## Troubleshooting

If you encounter the error `FATAL 28000 (invalid_authorization_specification) role "postgres" does not exist`, it means the PostgreSQL role specified in the configuration doesn't exist. Follow the steps above to create the necessary roles.

For other database connection issues, verify:
- PostgreSQL service is running
- Database user has appropriate permissions
- Connection parameters are correct in your configuration
