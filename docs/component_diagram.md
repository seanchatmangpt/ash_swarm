# AshSwarm Component Diagram

This document provides a visual representation of the AshSwarm system architecture. The diagrams are presented in text format using Mermaid markdown, which can be rendered in many Markdown viewers.

## System Overview Diagram

```mermaid
graph TB
    subgraph "AshSwarm"
        DSL[DSL Modeling Layer]
        DR[Domain Reasoning System]
        Reactors[Reactor System]
        LLM[LLM Integration Layer]
        ACE[Adaptive Code Evolution]
        Web[Web Interface]
        
        DSL --- DR
        DR --- Reactors
        Reactors --- LLM
        Web --- Reactors
        Web --- DR
        LLM --- ACE
        
        subgraph "Infrastructure"
            DB[(PostgreSQL)]
            Oban[Oban Jobs]
        end
        
        Reactors --- Oban
        DR --- DB
    end
    
    subgraph "External Services"
        OpenAI[OpenAI API]
        Groq[Groq API]
        Other[Other LLM Providers]
    end
    
    LLM --- OpenAI
    LLM --- Groq
    LLM --- Other
```

## DSL Modeling Components

```mermaid
classDiagram
    class ToFromDSL {
        +from_map(data)
        +from_yaml(content, file_path)
        +from_json(content, file_path)
        +to_yaml(instance, file_path)
        +to_json(instance, file_path)
    }
    
    class DSLModel {
        +name: String
        +description: String
        +count: Integer
        +model_dump(struct): Map
        +model_validate(data): Struct
        +model_dump_json(struct, opts): String
    }
    
    class DomainReasoning {
        +resources: List
        +steps: List
        +final_answer: String
        +model_dump(struct): Map
        +model_validate(data): Struct
        +model_dump_json(struct, opts): String
    }
    
    ToFromDSL <|.. DSLModel: implements
    ToFromDSL <|.. DomainReasoning: implements
```

## Domain Reasoning Components

```mermaid
classDiagram
    class DomainReasoning {
        +resources: List
        +steps: List
        +final_answer: String
    }
    
    class EctoSchema.DomainReasoning {
        +resources: List~DomainResource~
        +steps: List~DomainStep~
        +final_answer: String
        +changeset(domain_reasoning, params)
    }
    
    class EctoSchema.DomainResource {
        +name: String
        +attributes: List~Map~
        +relationships: List~Map~
        +default_actions: List~String~
        +primary_key: Map
        +domain: String
        +extends: List~String~
        +base: String
        +timestamps: Boolean
        +changeset(resource, params)
    }
    
    class EctoSchema.DomainStep {
        +explanation: String
        +output: String
        +changeset(step, params)
    }
    
    DomainReasoning --> EctoSchema.DomainReasoning: maps to
    EctoSchema.DomainReasoning "1" *-- "many" EctoSchema.DomainResource: contains
    EctoSchema.DomainReasoning "1" *-- "many" EctoSchema.DomainStep: contains
```

## Reactor Components

```mermaid
graph TB
    subgraph "Reactor System"
        QASaga[QASaga]
        Question[Question Resource]
        QASagaJob[QASaga Oban Job]
        
        QASaga --> Question: uses
        QASagaJob --> QASaga: runs
    end
    
    subgraph "External Components"
        Oban((Oban))
        Instructor((Instructor))
        LLM((LLM Provider))
    end
    
    QASagaJob --- Oban: scheduled by
    Question --- Instructor: uses
    Instructor --- LLM: calls
```

## LLM Integration Flow

```mermaid
sequenceDiagram
    participant A as Application
    participant IH as InstructorHelper
    participant I as Instructor
    participant LLM as LLM Provider
    
    A->>IH: gen(response_model, sys_msg, user_msg, model)
    IH->>I: chat_completion(params)
    I->>LLM: API Request
    LLM-->>I: API Response
    I-->>IH: Structured Response
    IH-->>A: {:ok, result} or {:error, reason}
```

## Data Flow Diagram

```mermaid
graph LR
    Input[/Input Data/] --> DSL[DSL Parsing]
    DSL --> DomainModel[Domain Model]
    DomainModel --> Validation[AI Validation]
    Validation --> ReactorSystem[Reactor System]
    ReactorSystem --> LLM[LLM Queries]
    LLM --> Processing[Response Processing]
    Processing --> Output[/Output Data/]
    
    subgraph "Storage"
        DB[(PostgreSQL)]
    end
    
    DomainModel -.-> DB: persist
    ReactorSystem -.-> DB: persist jobs
```

## Deployment View

```mermaid
graph TB
    subgraph "Server"
        App[AshSwarm Application]
        Phoenix[Phoenix Web Server]
        PG[(PostgreSQL)]
        
        App --- Phoenix
        App --- PG
    end
    
    subgraph "Development"
        LiveBook[LiveBook Server]
    end
    
    subgraph "External Services"
        LLMProviders[LLM API Providers]
    end
    
    App --- LLMProviders
    LiveBook --- App: development only
    
    Browser[Web Browser] --- Phoenix
    Browser --- LiveBook
```

## Streaming OrderBot Interaction

```mermaid
sequenceDiagram
    participant User
    participant LiveBook
    participant StreamingOrderbot
    participant OpenAI
    
    User->>LiveBook: Opens StreamingOrderbot.livemd
    LiveBook->>User: Displays UI with chat frame
    
    User->>LiveBook: Enters API key
    LiveBook->>StreamingOrderbot: Initialize
    StreamingOrderbot->>OpenAI: Create streaming connection
    OpenAI-->>StreamingOrderbot: Initial greeting message
    StreamingOrderbot-->>LiveBook: Display greeting
    
    User->>LiveBook: Enters order message
    LiveBook->>StreamingOrderbot: Process message
    StreamingOrderbot->>OpenAI: Stream request
    
    loop Streaming Response
        OpenAI-->>StreamingOrderbot: Token chunks
        StreamingOrderbot-->>LiveBook: Update display in real-time
    end
    
    LiveBook-->>User: Complete response displayed
    
    User->>LiveBook: Optional: press Cancel
    LiveBook->>StreamingOrderbot: Cancel stream
    StreamingOrderbot->>OpenAI: Close connection
```

## Adaptive Code Evolution Components

```mermaid
classDiagram
    class AICodeAnalysis {
        +analyze_code(code, options)
        +identify_optimization_opportunities(code, options)
    }
    
    class AIAdaptationStrategies {
        +generate_optimized_implementation(original_code, usage_patterns, options)
    }
    
    class AIExperimentEvaluation {
        +evaluate_experiment(original_code, optimized_code, metrics, options)
    }
    
    class OptimizationResponse {
        +optimized_code: String
        +explanation: String
        +success_rating: Float
    }
    
    class AnalysisResponse {
        +optimization_opportunities: List
        +improvement_suggestions: List
    }
    
    class EvaluationResponse {
        +success_rating: Float
        +metrics_comparison: Map
        +recommendations: List
    }
    
    AICodeAnalysis --> AnalysisResponse: produces
    AIAdaptationStrategies --> OptimizationResponse: produces
    AIExperimentEvaluation --> EvaluationResponse: produces
    
    AICodeAnalysis ..> AIAdaptationStrategies: informs
    AIAdaptationStrategies ..> AIExperimentEvaluation: feeds into
    AIExperimentEvaluation ..> AICodeAnalysis: feedback loop
```

## Domain Reasoning Components

```mermaid
classDiagram
    class DomainReasoning {
        +resources: List
        +steps: List
        +final_answer: String
    }
    
    class EctoSchema.DomainReasoning {
        +resources: List~DomainResource~
        +steps: List~DomainStep~
        +final_answer: String
        +changeset(domain_reasoning, params)
    }
    
    class EctoSchema.DomainResource {
        +name: String
        +attributes: List~Map~
        +relationships: List~Map~
        +default_actions: List~String~
        +primary_key: Map
        +domain: String
        +extends: List~String~
        +base: String
        +timestamps: Boolean
        +changeset(resource, params)
    }
    
    class EctoSchema.DomainStep {
        +explanation: String
        +output: String
        +changeset(step, params)
    }
    
    DomainReasoning --> EctoSchema.DomainReasoning: maps to
    EctoSchema.DomainReasoning "1" *-- "many" EctoSchema.DomainResource: contains
    EctoSchema.DomainReasoning "1" *-- "many" EctoSchema.DomainStep: contains