#!/bin/bash

# Run the adaptive code evolution process

show_help() {
  echo "Usage: $0 [options] [module names...]"
  echo
  echo "Options:"
  echo "  -h, --help      Show this help message and exit"
  echo "  -v, --verbose   Enable verbose output"
  echo "  --skip-db-setup Skip database setup steps"
  echo
  echo "Examples:"
  echo "  $0                                   # Run with default modules"
  echo "  $0 -v                               # Run with default modules in verbose mode"
  echo "  $0 AshSwarm.Accounts.User          # Run only for specified module"
  echo "  $0 -v AshSwarm.Accounts.User       # Run for specified module in verbose mode"
  echo
}

# Parse command line arguments
VERBOSE=""
SKIP_DB_SETUP=false
MODULES=()

for arg in "$@"; do
  case $arg in
    -h|--help)
      show_help
      exit 0
      ;;
    -v|--verbose)
      VERBOSE="--verbose"
      ;;
    --skip-db-setup)
      SKIP_DB_SETUP=true
      ;;
    -*)
      echo "Unknown option: $arg"
      show_help
      exit 1
      ;;
    *)
      MODULES+=("$arg")
      ;;
  esac
done

if [ "$SKIP_DB_SETUP" = false ]; then
  echo "Configuring database..."
  # Source environment variables
  source setup_db_env.sh

  # Update runtime configuration
  mix run config_db.exs
else
  echo "Skipping database setup..."
fi

echo "Running adaptive code evolution..."
# Run the evolution script with any provided modules and options
mix run run_adaptive_evolution.exs $VERBOSE "${MODULES[@]}"

echo "Process completed successfully."
