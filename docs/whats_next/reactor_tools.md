# Reactor Debugging & Generation Tools

## Overview

This document outlines the recently implemented and upcoming enhancements to AshSwarm's reactor debugging and code generation capabilities. These tools are designed to significantly improve developer productivity, visibility into reactor execution, and the efficiency of creating new business solutions.

## Recently Implemented Features

### Debug Middleware

The Debug Middleware provides comprehensive visibility into reactor execution, making it easier to understand, debug, and optimize reactor workflows.

#### Key Features

- **Complete Execution Visibility**: Logs the start and completion of reactor execution
- **Step-by-Step Monitoring**: Detailed logging of each step's execution, including inputs and outputs
- **Error Tracking**: Comprehensive error logging with context
- **Compensation and Undo Tracking**: Visibility into reactor compensation and undo operations
- **Verbose Mode**: Optional detailed context logging for in-depth debugging

#### Implementation

The Debug Middleware has been implemented as a Reactor middleware that logs various events during reactor execution:

```elixir
defmodule AshSwarm.Reactors.Middlewares.DebugMiddleware do
  use Reactor.Middleware
  
  # Lifecycle events
  def init(context) do
    # Log reactor start
  end
  
  def complete(result, _context) do
    # Log reactor completion
  end
  
  def error(error, _context) do
    # Log reactor errors
  end
  
  # Step events
  def event({:run_start, arguments}, step, _context) do
    # Log step start
  end
  
  def event({:run_complete, result}, step, _context) do
    # Log step completion
  end
  
  # Additional events...
end
```

#### Usage

To use the Debug Middleware in a reactor, add it to the middlewares block:

```elixir
defmodule MyApp.MyReactor do
  use Reactor
  
  middlewares do
    middleware AshSwarm.Reactors.Middlewares.DebugMiddleware
  end
  
  # Reactor definition...
end
```

For more detailed logging, enable verbose mode when running the reactor:

```elixir
Reactor.run(MyApp.MyReactor, inputs, %{verbose: true})
```

### Reactor Generation CLI

The `reactor.gen.reactor` Mix task automates the creation of new reactors and their associated step modules, dramatically reducing development time.

#### Key Features

- **One-Command Reactor Creation**: Generate a complete reactor with a single CLI command
- **Automatic Step Module Generation**: Creates all necessary step modules
- **Input and Type Definition**: Define reactor inputs with their types
- **Return Step Specification**: Configure which step's result should be returned

#### Implementation

The CLI generator uses Igniter to create the necessary modules:

```elixir
defmodule Mix.Tasks.Reactor.Gen.Reactor do
  use Igniter.Mix.Task
  
  # Task configuration
  
  @impl Igniter.Mix.Task
  def igniter(igniter) do
    # Parse inputs, steps, and return step
    # Generate step modules
    # Generate reactor module
  end
  
  # Helper functions...
end
```

#### Usage

Create a new reactor with steps using the command-line interface:

```bash
mix reactor.gen.reactor MyApp.CheckoutReactor \
  --input email:string \
  --input password:string \
  --step register_user:MyApp.RegisterUserStep \
  --step create_stripe_customer:MyApp.CreateStripeCustomerStep \
  --return register_user
```

This command generates:
1. A `MyApp.CheckoutReactor` module with the specified inputs and steps
2. Step modules `MyApp.RegisterUserStep` and `MyApp.CreateStripeCustomerStep`

## Upcoming Enhancements

### Debug Middleware Enhancements

- **Visual Execution Graph**: Generate a visual representation of reactor execution
- **Performance Metrics**: Include execution time for each step
- **Log Aggregation**: Consolidate logs for easier analysis
- **Filter Capabilities**: Configure which events to log

### Reactor Generation Enhancements

- **Template Selection**: Choose from predefined reactor templates
- **Resource Integration**: Generate reactors integrated with Ash resources
- **Testing Generation**: Automatically generate test modules
- **JSON/YAML Definition**: Define reactors in data files for generation

## Business Impact

These tools fundamentally change the development experience for AshSwarm applications:

- **Development Speed**: Reduce development time from weeks to seconds
- **Debugging Efficiency**: Quickly identify and resolve issues
- **Solution Quality**: Improve reliability through better visibility
- **Onboarding**: Lower the learning curve for new developers

## Next Steps

The immediate roadmap for these tools includes:

1. **Documentation**: Comprehensive guides and examples
2. **Integration with IDEs**: Editor plugins for VS Code and IntelliJ
3. **Interactive Dashboard**: Web-based UI for monitoring reactor execution
4. **Advanced Templates**: Industry-specific reactor templates

## Conclusion

The Debug Middleware and Reactor Generation CLI represent significant steps toward making AshSwarm the most developer-friendly platform for building AI-native business solutions. These tools demonstrate our commitment to improving developer experience while enabling the rapid creation of robust, production-ready applications.

By continuing to enhance these capabilities, we aim to further reduce the time and effort required to build complex business applications, allowing developers to focus on delivering value rather than writing boilerplate code. 