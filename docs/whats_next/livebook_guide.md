# Livebook Guide for AshSwarm

This guide provides detailed instructions for setting up and using Livebook with AshSwarm to run the interactive notebooks that demonstrate key functionality.

## Table of Contents

- [Installation](#installation)
- [Starting the Livebook Server](#starting-the-livebook-server)
- [Authentication Methods](#authentication-methods)
- [Importing AshSwarm Notebooks](#importing-ashswarm-notebooks)
- [Setting Up the Runtime](#setting-up-the-runtime)
- [Working with Notebooks](#working-with-notebooks)

## Installation

### Installing Livebook via Mix

The recommended way to install Livebook is through Mix:

```bash
mix escript.install hex livebook
```

After installation, add the path to your `.mix/escripts` directory to your shell configuration to make the `livebook` command available in your PATH.

### Alternative Installation Methods

If you encounter issues with the Mix installation, you can install Livebook via Homebrew:

```bash
brew install livebook
```

## Starting the Livebook Server

### Basic Start

```bash
/Users/YOUR_USERNAME/.mix/escripts/livebook server
```

This will start a Livebook server at http://localhost:8080 with token authentication.

### Custom Port

If port 8080 is already in use, you can specify a different port:

```bash
/Users/YOUR_USERNAME/.mix/escripts/livebook server --port 8090
```

## Authentication Methods

### Token Authentication (Default)

By default, Livebook uses token authentication. The server will display a URL with a token:

```
[Livebook] Application running at http://localhost:8092/?token=sci45o2buklqkbw55sxtuswwplrjg444
```

Visit this URL in your browser to access Livebook.

### Password Authentication

For a more persistent authentication method, you can use password authentication:

```bash
LIVEBOOK_PASSWORD=your_secure_password /Users/YOUR_USERNAME/.mix/escripts/livebook server --port 8090
```

Then access Livebook at http://localhost:8090 and enter the password when prompted.

## Importing AshSwarm Notebooks

AshSwarm includes several example notebooks in the `live_books` directory:

1. **ash_domain_reasoning.livemd** - Demonstrates AI-powered reasoning with Ash Framework
2. **reactor_practice.livemd** - Explores the reactor pattern for workflow orchestration
3. **streaming_orderbot.livemd** - Shows how to build a streaming response bot

To import these notebooks:

1. Start the Livebook server and authenticate
2. Click "Import" or "Open" in the Livebook interface
3. Select "From file"
4. Navigate to the `live_books` directory in your AshSwarm project
5. Select the notebook you want to import

## Setting Up the Runtime

For each notebook, you'll need to set up a runtime that has access to the AshSwarm dependencies:

1. After opening a notebook, click on "Runtime" in the top right
2. Select "Mix standalone" 
3. For the "Path to project", enter the full path to your AshSwarm project directory
4. Click "Connect"

This setup ensures that all dependencies and modules from your AshSwarm project are available to the notebook.

## Working with Notebooks

### Required Environment Variables

Some notebooks require environment variables for LLM API keys. You can set these in Livebook:

1. Click on "Secrets" in the right sidebar
2. Add necessary API keys (e.g., `OPENAI_API_KEY`, `GROQ_API_KEY`)

### Understanding the Available Notebooks

#### ash_domain_reasoning.livemd

This notebook demonstrates how to use the Ash Framework together with AI-powered reasoning to build and extend domain models. You'll learn how to:

- Define resources and relationships in YAML
- Convert them to Ash-compatible structures
- Use AI to extend and validate domain models

#### reactor_practice.livemd

This notebook focuses on the reactor pattern for orchestrating workflows. You'll see examples of:

- Creating a reactor with multiple steps
- Handling inputs and outputs
- Configuring middleware
- Running reactors and examining the results

#### streaming_orderbot.livemd

This notebook shows how to implement streaming responses from an LLM, allowing you to create interactive conversational interfaces. You'll learn how to:

- Connect to streaming LLM APIs
- Process streaming tokens
- Build a simple order-taking bot

## Troubleshooting

### Port Already in Use

If you see an error like:

```
ERROR!!! [Livebook] shutdown: failed to start child: {Bandit, #Reference<...>}
** (EXIT) shutdown: failed to start child: :listener
    ** (EXIT) :eaddrinuse
```

Try a different port with the `--port` option.

### Authentication Issues

If you're unable to connect using the token or password:

1. Make sure you're using the correct URL and authentication method
2. Try restarting the Livebook server
3. Check your browser's cookies and cache

### Notebook Execution Errors

If you encounter errors when running notebook cells:

1. Ensure the Phoenix server is running (`mix phx.server`)
2. Verify you're using the correct runtime (Mix standalone pointing to your project)
3. Check that all required environment variables and secrets are set 