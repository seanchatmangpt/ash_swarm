#!/bin/bash

# Start AshSwarm servers script
# This script starts both the Phoenix server and Livebook server for AshSwarm

# Kill any existing servers
echo "Stopping any existing servers..."
pkill -f "phx.server" || true
pkill -f "livebook server" || true

# Start Phoenix server in the background
echo "Starting Phoenix server at http://localhost:4000"
mix phx.server &
PHOENIX_PID=$!

# Wait for Phoenix to initialize
sleep 5

# Start Livebook server in the background
echo "Starting Livebook server at http://localhost:8092"
LIVEBOOK_PASSWORD=livebooksecretpassword ~/.mix/escripts/livebook server --port 8092 &
LIVEBOOK_PID=$!

# Output access information
echo ""
echo "==================================================="
echo "AshSwarm Environment Started"
echo "==================================================="
echo "Phoenix server: http://localhost:4000"
echo "Livebook server: http://localhost:8092"
echo "Livebook password: livebooksecretpassword"
echo ""
echo "Available Livebooks:"
find "$(pwd)/live_books" -name "*.livemd" | sed 's/.*\/\(.*\)\.livemd/- \1/'
echo ""
echo "To stop servers, run: pkill -f phx.server && pkill -f livebook"
echo "==================================================="

# Open browsers to both servers
sleep 2
open http://localhost:4000
open http://localhost:8092

# Keep the script running to maintain the servers
echo "Servers running... Press Ctrl+C to exit"
wait $PHOENIX_PID $LIVEBOOK_PID 