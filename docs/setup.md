# AshSwarm Setup Guide

This guide provides detailed, step-by-step instructions for setting up your development environment to work with AshSwarm.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [LLM Provider Configuration](#llm-provider-configuration)
- [Running the Application](#running-the-application)
- [Running LiveBooks](#running-livebooks)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following tools installed:

### 1. Elixir and Erlang

We recommend using [asdf](https://asdf-vm.com/) for version management:

```bash
# Install asdf
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.10.2
# Add to your shell (for bash)
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bashrc
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
# For zsh, fish, or other shells, refer to asdf documentation

# Install plugins
asdf plugin add erlang
asdf plugin add elixir

# Install versions specified in the project
# (These match the versions in .tool-versions)
asdf install erlang 25.2
asdf install elixir 1.14.3-otp-25
```

### 2. PostgreSQL

Install PostgreSQL (version 12 or higher):

**macOS (using Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows:**
Download and install from the [PostgreSQL website](https://www.postgresql.org/download/windows/).

### 3. Git

Ensure Git is installed on your system:

**macOS:**
```bash
brew install git
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install git
```

**Windows:**
Download and install from the [Git website](https://git-scm.com/download/win).

### 4. LiveBook (Optional, but recommended)

For running the interactive examples:

```bash
mix escript.install hex livebook
```

Ensure the escript bin directory is in your PATH.

## Installation

Follow these steps to set up AshSwarm:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ash_swarm.git
cd ash_swarm
```

### 2. Install Dependencies

```bash
# Fetch dependencies
mix deps.get

# Compile the project
mix compile
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root with the following environment variables (adjust as needed):

```bash
# LLM Provider Configuration
export GROQ_API_KEY=your_groq_api_key
export OPENAI_API_KEY=your_openai_api_key
export ASH_SWARM_DEFAULT_INSTRUCTOR_ADAPTER=Instructor.Adapters.Groq
export ASH_SWARM_DEFAULT_MODEL=gpt-4o

# Database Configuration (if needed)
export DATABASE_URL=postgres://username:password@localhost/ash_swarm_dev
```

Load these variables into your shell:

```bash
source .env
```

For Fish shell users:
```fish
set -a (cat .env | grep -v '^#' | xargs -L 1)
```

## Database Setup

### 1. Configure Your Database

Edit `config/dev.exs` if you need to customize database settings:

```elixir
config :ash_swarm, AshSwarm.Repo,
  username: "postgres",
  password: "postgres",
  database: "ash_swarm_dev",
  hostname: "localhost",
  show_sensitive_data_on_connection_error: true,
  pool_size: 10
```

### 2. Create and Migrate the Database

```bash
# Create the database
mix ecto.create

# Run migrations
mix ecto.migrate

# Optionally, run seeds
mix run priv/repo/seeds.exs
```

## LLM Provider Configuration

AshSwarm can work with different LLM providers. Follow these steps to configure your provider:

### Groq Configuration

1. Sign up for an account at [Groq](https://groq.com/)
2. Obtain an API key from your account dashboard
3. Set up the necessary environment variables:

```bash
export GROQ_API_URL=https://api.groq.com/openai
export GROQ_API_KEY=your_groq_api_key
```

### OpenAI Configuration

1. Sign up for an account at [OpenAI](https://openai.com/)
2. Obtain an API key from your account dashboard
3. Set up the necessary environment variables:

```bash
export OPENAI_API_URL=https://api.openai.com/v1
export OPENAI_API_KEY=your_openai_api_key
```

### Setting a Default Provider

Choose your default provider:

```bash
# For Groq
export ASH_SWARM_DEFAULT_INSTRUCTOR_ADAPTER=Instructor.Adapters.Groq
export ASH_SWARM_DEFAULT_MODEL=gpt-4o

# For OpenAI
export ASH_SWARM_DEFAULT_INSTRUCTOR_ADAPTER=Instructor.Adapters.OpenAI
export ASH_SWARM_DEFAULT_MODEL=gpt-4o
```

## Running the Application

### Start the Phoenix Server

```bash
# Start the server
mix phx.server

# Alternatively, start with an interactive Elixir shell
iex -S mix phx.server
```

The server will be available at http://localhost:4000.

### Using the Admin Interface

AshSwarm includes Ash Admin, which provides a web interface for managing resources:

1. Access the admin interface at http://localhost:4000/admin
2. Navigate through the available resources

## Running LiveBooks

AshSwarm includes several LiveBook examples that demonstrate key features:

### 1. Start LiveBook Server

```bash
livebook server
```

### 2. Open LiveBook in Your Browser

Open the URL provided by the LiveBook server (usually http://localhost:8080).

### 3. Open the Example LiveBooks

Navigate to the `live_books/` directory in the project and open one of the following:

- `streaming_orderbot.livemd` - Demonstrates streaming interactions with LLMs
- `reactor_practice.livemd` - Shows how to use Reactors
- `ash_domain_reasoning.livemd` - Illustrates domain reasoning

### 4. Configure LiveBook for LLM Access

In the LiveBook interface:

1. Click the key icon in the top right
2. Add your LLM provider API keys as secrets:
   - `GROQ_API_KEY` - Your Groq API key
   - `OPENAI_API_KEY` - Your OpenAI API key

## Troubleshooting

### Common Issues and Solutions

#### 1. Mix Dependencies Errors

If you encounter errors with dependencies:

```bash
# Clean compiled files and dependencies
mix deps.clean --all
rm -rf _build

# Get dependencies again
mix deps.get
mix compile
```

#### 2. Database Connection Issues

If you have trouble connecting to the database:

```bash
# Check PostgreSQL is running
pg_isready

# If it's not running, start it
# On macOS with Homebrew:
brew services start postgresql

# On Linux:
sudo systemctl start postgresql
```

Check that your database credentials in `config/dev.exs` match your PostgreSQL setup.

#### 3. LLM API Connection Issues

If you encounter errors connecting to LLM APIs:

1. Verify your API keys are correct
2. Check that your environment variables are properly set
3. Ensure you have internet connectivity
4. Check the API provider's status page for any outages

```bash
# Test API connectivity (for OpenAI)
curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $OPENAI_API_KEY" https://api.openai.com/v1/models

# Should return 200 if connection is working
```

#### 4. Port Conflicts

If port 4000 is already in use:

```bash
# Find the process using port 4000
lsof -i :4000

# Change the port in config/dev.exs:
config :ash_swarm, AshSwarmWeb.Endpoint,
  http: [port: 4001],  # Change to an available port
  # ...
```

### Getting Help

If you encounter issues not covered here:

1. Check the project's issue tracker on GitHub
2. Consult the Ash Framework documentation:
   - [Ash Framework](https://hexdocs.pm/ash/Ash.html)
   - [Ash Phoenix](https://hexdocs.pm/ash_phoenix/AshPhoenix.html)
   - [Ash Postgres](https://hexdocs.pm/ash_postgres/AshPostgres.html)
3. Join the Ash Framework discussions on:
   - [GitHub Discussions](https://github.com/ash-project/ash/discussions)
   - [Discord Server](https://discord.gg/MTKvAB3) 