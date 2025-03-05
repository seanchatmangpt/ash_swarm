# AshSwarm

AshSwarm is an Elixir-based project that explores how to use the [Ash Framework](https://ash-hq.org/) alongside concurrency patterns (Reactor, Oban jobs, etc.) and AI-driven logic to create domain-specific "swarms." These swarms coordinate multiple steps and tasks—particularly LLM (large language model) interactions—without relying on complex, black-box "agent" frameworks.

## Table of Contents

- [Background and Motivation](#background-and-motivation)
- [Swarm Concept](#swarm-concept)
- [Key Components](#key-components)
  - [DSL Modeling](#dsl-modeling)
  - [Domain Reasoning](#domain-reasoning)
  - [Reactors and Oban](#reactors-and-oban)
  - [Instructor Helpers](#instructor-helpers)
- [Examples and Livebooks](#examples-and-livebooks)
  - [Streaming Order Bot](#streaming-order-bot)
  - [Domain Reasoning Livebook](#domain-reasoning-livebook)
- [Why Elixir (and Ash)?](#why-elixir-and-ash)
- [Roadmap / Future Directions](#roadmap--future-directions)
- [How to Run Locally](#how-to-run-locally)
- [Livebook Guide](#livebook-guide)
- [LLM Provider Configuration](#llm-provider-configuration)
- [License](#license)
- [Development Setup](#development-setup)

---

## Background and Motivation

> "AshSwarm" is named for the idea that we can have many small tasks (or calls to a language model) coordinating to solve real problems in a well-defined, incremental way—rather than using large, monolithic 'agent' loops. 

- **25+ years of dev experience**: This project reflects lessons learned in both Python and JavaScript, but applies them in Elixir, which provides excellent concurrency and reliability.
- **Ash Ecosystem**: Ash already includes advanced abstractions for resource definition, data layer interactions, and more. The goal is to complement Ash with domain reasoning and step-based "reactors" that can invoke AI at specific points.
- **Bridging Python and Elixir**: Many AI/LLM techniques come from the Python community. AshSwarm adopts those ideas (like chain-of-thought prompting or DSL modeling) and adapts them to Elixir's unique strengths.

---

## Swarm Concept

"Swarm" here doesn't refer to a brand-new framework, but rather a practice of:

1. **Defining tasks or steps** explicitly (e.g., "fetch this data," "run a GPT prompt," "validate the result").  
2. **Invoking LLM reasoning** at well-defined boundaries rather than letting an "agent" loop roam freely.  
3. **Leveraging concurrency** via Elixir processes, Reactors, or workflows so multiple "mini-questions" or LLM calls can happen in parallel.  

This approach is especially helpful if you want to keep your AI usage well-structured, testable, and cost-effective (for instance, hitting a cheaper model multiple times rather than once on a very expensive model).

---

## Key Components

### DSL Modeling
A good chunk of the transcript discusses the idea of using "DSL models" to transform YAML/JSON data into typed structures or internal Elixir modules:

- **`DSLModel`-style approach**: The Python concept of something like "Pydantic" or "SQLModel" is adapted here, so you can call `from_yaml` or `from_prompt` to generate Elixir structures.  
- **`to_from_dsl.ex`**: Provides callbacks for reading/writing domain data to or from DSL files.  

### Domain Reasoning
AshSwarm includes a "domain reasoning" feature that can represent resources, relationships, or even entire ontologies in structured YAML, then store them in Ecto schemas. The transcript references:

- **`domain_reasoning.ex` & `ecto_schema/domain_reasoning.ex`**: Where the logic for domain-based transformations lives.  
- **AI Validation**: Possibly calling an LLM to decide whether a given domain model or relationship is "valid" or "helpful," then iterating until it passes.

### Reactors and Oban
The transcript shows examples of:

- **`reactors/qa_saga.ex`**: A Reactor that coordinates question-and-answer tasks with an LLM.  
- **`qa_saga_job.ex`** / `Oban` usage: A periodic job (for instance, every minute) that calls the QA Reactor or attempts a domain reasoning step.  
- **Parallel or iterative flows**: Instead of a single "agent," you define clear steps or "Reactors" triggered by Oban jobs.

### Instructor Helpers
The project uses (or plans to use) an `Instructor` approach, letting you specify small AI tasks ("Is this a good idea?" "Should this resource be related to X?") and then repeating or adjusting them until they produce acceptable results.

---

## Examples and Livebooks

### Streaming Order Bot
A highlighted example is the "StreamingOrderBot," which uses OpenAI or another LLM in a streaming mode to simulate building a pizza order (or any text-based session) step by step.

1. **OpenAI / Groq Key**: You add your LLM API key to Livebook secrets so you can stream answers in real time.  

### Domain Reasoning Livebook
There's also a "Domain Reasoning" Livebook illustrating how to:

- **Load YAML** describing resources, attributes, or relationships.  
- **Convert** them into Ash-like data structures.  
- **Add "reasoning steps"** that can be validated or extended by LLM calls.  

---

## Why Elixir and Ash?

1. **Concurrency & Let-It-Crash**: Elixir's concurrency model (processes, supervision trees) naturally maps to "many small tasks."  
2. **Ash's Abstractions**: Ash reduces the burden of building resources, schemas, or APIs by hand—so you can focus on domain logic.  
3. **Reactor**: Perfect for step-based sagas that might need to call GPT or other AI functionalities at each stage.  
4. **Oban**: Schedule or retry tasks with minimal overhead.  

---

## Roadmap / Future Directions

1. **LLM Validation**: Expand "Instructor" code to judge or rank domain changes across multiple "AI experts" (e.g., database vs. ontology vs. Ash).  
2. **Swarm Intelligence**: Let multiple cheap model calls vote or combine answers, rather than paying for a single expensive LLM pass.  
3. **Service Colonies & MAPE-K**: Incorporate concepts from the *service colonies* paper and "monitor-analyze-plan-execute" loops for adaptive systems.  
4. **Deeper Python Interop**: Possibly share domain data between Python and Elixir purely via DSL files or minimal bridging.

---

## How to Run Locally

1. **Clone the Repo**  
   ```bash
   git clone https://github.com/you/ash_swarm.git
   cd ash_swarm
   ```

2. **Install Dependencies**  
   - Ensure you have Elixir and Erlang installed (e.g., via `asdf`).  
   - Install the project deps:  
     ```bash
     mix deps.get
     ```

3. **Database (If Needed)**  
   - If using `Oban` or Ecto-based domain logic, configure and migrate your Postgres DB:  
     ```bash
     mix ecto.create
     mix ecto.migrate
     ```

4. **Run Phoenix / Oban**  
   ```bash
   mix phx.server
   ```
   Then visit `localhost:4000` if a web interface is enabled.

5. **Check Livebooks**  
   - Launch `livebook server` (or your local environment).  
   - Open the `live_books/` folder to see examples like `StreamingOrderBot.livemd` or `domain_reasoning.livemd`.  
   - Don't forget to set your LLM API key as a Livebook secret if you plan to test streaming.

---

## Livebook Guide

For detailed instructions on setting up and using Livebook with AshSwarm, please refer to our [Livebook Guide](docs/whats_next/livebook_guide.md). The guide covers:

- Installing Livebook through Mix or Homebrew
- Starting the Livebook server with various configurations
- Authentication methods (token and password)
- Importing AshSwarm notebooks
- Setting up the runtime to connect to your project
- Working with the example notebooks
- Troubleshooting common issues

Livebook is an essential tool for exploring AshSwarm's capabilities through interactive notebooks. Our provided notebooks demonstrate key concepts like domain reasoning, reactors, and streaming LLM interactions.

---

## LLM Provider Configuration

AshSwarm uses environment variables to configure LLM providers for the Instructor library. You can customize these settings based on your preferred provider:

### Core Configuration

- `ASH_SWARM_DEFAULT_INSTRUCTOR_ADAPTER`: Sets the default adapter for Instructor (defaults to `Instructor.Adapters.Groq`)
- `ASH_SWARM_DEFAULT_MODEL`: Specifies the default model to use (defaults to `gpt-4o`)

### Provider-Specific Settings

#### Groq Configuration

```bash
GROQ_API_URL=https://api.groq.com/openai  # Default URL for Groq
GROQ_API_KEY=your_groq_api_key
```

#### OpenAI Configuration

```bash
OPENAI_API_URL=https://api.openai.com/v1  # Optional custom URL
OPENAI_API_KEY=your_openai_api_key
```

#### Gemini Configuration

```bash
GEMINI_API_KEY=your_gemini_api_key
```

---

## License

Please see the [LICENSE](./LICENSE) file in this repository for licensing details.  

---

### Notes on AI Costs & Key Management

- **LLM Cost**: The approach encourages multiple small queries instead of large, expensive queries, but you must still track usage if running frequent jobs (e.g., an Oban cron job every minute).
- **API Keys**: The transcript warns that you could accidentally expose your keys. Use Livebook secrets, environment variables, or Docker secrets to keep credentials private.

---

**In summary**, AshSwarm is an ongoing exploration of how to harness Elixir's concurrency and Ash's resource DSL to build *explicit*, domain-driven AI flows, rather than rely on a single monolithic "agent." By combining short, well-defined tasks with LLM calls, we can achieve flexible domain reasoning while staying cost-effective and maintainable.

## Development Setup

### Database Configuration

The project uses PostgreSQL. To set up your local development environment:

1. Copy the example configuration file:
   ```bash
   cp config/dev.exs.example config/dev.exs
   ```

2. Edit the `config/dev.exs` file with your database credentials or set the following environment variables:
   - `POSTGRES_USER` - PostgreSQL username (default: "postgres")
   - `POSTGRES_PASSWORD` - PostgreSQL password (default: "postgres")
   - `POSTGRES_HOST` - PostgreSQL host (default: "localhost")
   - `POSTGRES_DB` - PostgreSQL database name (default: "ash_swarm_dev")

### Running the Application

Use the provided startup script to run both Phoenix and Livebook servers:

```bash
./start_ash_swarm.sh
```

This will start:
- Phoenix server at http://localhost:4000
- Livebook server at http://localhost:8092 (password: livebooksecretpassword)

Available Livebooks:
- streaming_orderbot
- reactor_practice
- ash_domain_reasoning

To stop the servers:
```bash
pkill -f phx.server && pkill -f livebook
```