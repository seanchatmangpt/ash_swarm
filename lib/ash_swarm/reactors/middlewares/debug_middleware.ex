defmodule AshSwarm.Reactors.Middlewares.DebugMiddleware do
  @moduledoc """
  A Reactor middleware that logs debug information.

  This middleware logs the start and stop of the Reactor execution, as well as the
  execution of individual steps, including their inputs, results, errors, and retries.

  Add verbose to the context to log the context and step details.
  """

  use Reactor.Middleware
  require Logger

  @doc false
  @impl true
  def init(context) do
    verbose = Map.get(context, :verbose, false)

    log_message =
      if verbose do
        """
        🚀 Reactor started execution.

        📌 Context:
        #{inspect(context, pretty: true)}
        """
      else
        "🚀 Reactor started execution."
      end

    Logger.info(log_message)
    {:ok, context}
  end

  @doc false
  @impl true
  def complete(result, _context) do
    Logger.debug("✅ Reactor execution completed successfully.")
    {:ok, result}
  end

  @doc false
  @impl true
  def error(error, _context) do
    Logger.error("❌ Reactor execution encountered an error: #{inspect(error)}")
    :ok
  end

  @doc false
  @impl true
  def halt(_context) do
    Logger.warning("⚠️ Reactor execution was halted.")
    :ok
  end

  @doc false
  @impl true
  def event({:run_start, arguments}, step, _context) do
    Logger.info("▶️ Step `#{step.name}` started with arguments: #{inspect(arguments)}")
  end

  def event({:run_complete, result}, step, _context) do
    Logger.info("✅ Step `#{step.name}` completed successfully with result: #{inspect(result)}")
  end

  def event({:run_error, errors}, step, _context) do
    Logger.error("❌ Step `#{step.name}` encountered an error: #{inspect(errors)}")
  end

  def event({:run_retry, value}, step, _context) do
    Logger.warning("🔄 Step `#{step.name}` is retrying with value: #{inspect(value)}")
  end

  def event({:compensate_start, reason}, step, _context) do
    Logger.warning("♻️ Step `#{step.name}` is compensating due to: #{inspect(reason)}")
  end

  def event({:compensate_complete, _result}, step, _context) do
    Logger.info("🔄 Step `#{step.name}` compensation completed.")
  end

  def event({:undo_start, _}, step, _context) do
    Logger.warning("⏪ Step `#{step.name}` undo process started.")
  end

  def event({:undo_complete, _}, step, _context) do
    Logger.info("⏩ Step `#{step.name}` undo process completed.")
  end

  def event({:process_start, pid}, step, _context) do
    Logger.info("▶️ Step `#{step.name}` process started for PID: #{inspect(pid)}")
  end

  def event({:process_terminate, pid}, step, context) do
    verbose = Map.get(context, :verbose, false)

    log_message =
      if verbose do
        """
        🛑 Step `#{step.name}` process terminated for PID: #{inspect(pid)}

        📌 Step:
        #{inspect(step, pretty: true)}

        🎯 Context:
        #{inspect(context, pretty: true)}
        """
      else
        "🛑 Step `#{step.name}` process terminated for PID: #{inspect(pid)}"
      end

    Logger.info(log_message)
  end
end
