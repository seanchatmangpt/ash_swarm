# AshSwarm Architecture

## System Overview

AshSwarm is an Elixir-based system that combines the Ash Framework with concurrent processing patterns and AI-driven logic to create domain-specific "swarms" that coordinate multiple steps and LLM (Large Language Model) interactions.

## Core Architecture Principles

1. **Explicit Task Definition**: Tasks are clearly defined with specific boundaries rather than using open-ended "agent" loops.
2. **Bounded LLM Reasoning**: AI reasoning occurs at well-defined points in the process.
3. **Concurrency-First Design**: Leverages Elixir's concurrency model for parallel processing.
4. **Cost-Effective AI Usage**: Prefers multiple targeted LLM calls over single large, expensive ones.

## Key System Components

### 1. DSL Modeling Layer

The DSL (Domain-Specific Language) modeling layer provides functionality to transform data between YAML/JSON formats and Elixir structures.

**Key Components:**
- `AshSwarm.DSLModel`: Sample implementation that demonstrates the pattern
- `ToFromDSL`: Behaviour module that provides serialization capabilities
- Serialization/deserialization functions for YAML, JSON, and (commented out) TOML

**Interactions:**
- Domain models implement the `ToFromDSL` behaviour
- Models use `from_yaml/2`, `from_json/2` methods to deserialize data
- Models use `to_yaml/2`, `to_json/2` methods to serialize data

### 2. Domain Reasoning System

The Domain Reasoning system represents resources, relationships, and ontologies in structured formats that can be validated by AI.

**Key Components:**
- `AshSwarm.DomainReasoning`: Core module representing the domain reasoning process
- `AshSwarm.EctoSchema.DomainReasoning`: Ecto schema for storing domain reasoning data
- `AshSwarm.EctoSchema.DomainResource`: Represents individual domain resources
- `AshSwarm.EctoSchema.DomainStep`: Represents steps in the reasoning process

**Interactions:**
- Domain models can be loaded from or saved to YAML/JSON
- Domain models can be validated using AI through the Instructor interface
- Steps are recorded throughout the reasoning process

### 3. Reactor System

The Reactor system defines clear, step-based workflows that can invoke AI reasoning at specific points.

**Key Components:**
- `AshSwarm.Reactors`: Module for defining reactors
- `AshSwarm.Reactors.QASaga`: Example reactor for question-answer interactions
- `AshSwarm.Reactors.Question`: Resource for handling questions
- `AshSwarm.Reactors.QASagaJob`: Oban job implementation for QA processes

**Interactions:**
- Reactors define inputs, steps, and outputs
- Oban jobs schedule and execute reactors
- Reactors can call LLMs via the Instructor Helper

### 4. LLM Integration Layer

Provides structured interaction with Large Language Models (LLMs).

**Key Components:**
- `AshSwarm.InstructorHelper`: Wrapper for Instructor interactions with LLMs
- Integration with various LLM providers (OpenAI, Groq, etc.)

**Interactions:**
- Provides the `gen/4` function for generating LLM completions
- Configurable via environment variables for different LLM providers

### 5. Adaptive Code Evolution System

Enables continuous, AI-driven optimization of code based on usage patterns.

**Key Components:**
- `AshSwarm.Foundations.AICodeAnalysis`: Analyzes code to identify optimization opportunities
- `AshSwarm.Foundations.AIAdaptationStrategies`: Generates optimized implementations
- `AshSwarm.Foundations.AIExperimentEvaluation`: Evaluates optimization experiments

**Interactions:**
- Analyzes usage patterns to identify optimization opportunities
- Uses LLM integration to generate optimized implementations
- Evaluates implementations against metrics (performance, maintainability, etc.)
- Creates a continuous feedback loop for code improvement

### 6. Web Interface (Phoenix)

Provides web interfaces for interacting with the system.

**Key Components:**
- Phoenix controllers, views, and templates
- Ash Phoenix integration
- Ash Admin for administrative interfaces

**Interactions:**
- Exposes APIs and web interfaces for system interaction
- Integrates with LiveView for real-time updates

## Data Flow

1. **Input Phase**: Data enters the system through APIs, LiveBooks, or scheduled jobs
2. **Processing Phase**: 
   - Data is transformed into appropriate structures
   - Reactors orchestrate the processing steps
   - LLM queries are made at specific points
3. **Output Phase**: Results are returned as API responses, stored in the database, or displayed in the UI

## Infrastructure Components

- **Database**: PostgreSQL via Ash.Postgres
- **Job Processing**: Oban for background processing
- **API Layer**: Phoenix and Ash.JsonApi
- **Deployment**: Docker with Fly.io configuration

## Cross-Cutting Concerns

- **Configuration**: Environment variables for different environments
- **Error Handling**: Let-it-crash philosophy with proper supervision
- **Logging**: Elixir Logger integrated throughout the system
- **Security**: API keys managed through environment variables or LiveBook secrets

## Architectural Decisions

1. **Why Elixir & Ash**: Provides excellent concurrency and reliable process model
2. **Reactor Pattern**: Enables explicit, step-based processing with clear boundaries
3. **DSL Approach**: Facilitates interchange between different systems and formats
4. **LLM Integration Strategy**: Structured around specific tasks rather than general "agents"

## Future Architecture Evolution

1. **LLM Validation**: Multiple "AI experts" judging domain changes
2. **Swarm Intelligence**: Combining multiple LLM responses
3. **Service Colonies & MAPE-K**: Monitor-analyze-plan-execute loops
4. **Python Interoperability**: DSL-based sharing between Elixir and Python 