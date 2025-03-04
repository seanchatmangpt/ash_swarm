defmodule AshSwarm.Reactors.Middlewares.DebugMiddlewareTest do
  use ExUnit.Case
  import ExUnit.CaptureLog
  require Logger

  alias AshSwarm.Reactors.Middlewares.DebugMiddleware

  setup do
    :ok = Logger.configure(level: :debug)
    :ok
  end

  # Scenario: Reactor starts with verbose mode
  test "init/1 logs start message with context in verbose mode" do
    context = %{verbose: true}

    log = capture_log(fn ->
      {:ok, _} = DebugMiddleware.init(context)
    end)

    assert log =~ "🚀 Reactor started execution."
    assert log =~ "📌 Context:"
    assert log =~ inspect(context, pretty: true)
  end

  # Scenario: Reactor starts without verbose mode
  test "init/1 logs start message without context in non-verbose mode" do
    context = %{verbose: false}

    log = capture_log(fn ->
      {:ok, _} = DebugMiddleware.init(context)
    end)

    assert log =~ "🚀 Reactor started execution."
    refute log =~ "📌 Context:"
  end

  # Scenario: Reactor completes successfully
  test "complete/2 logs completion message" do
    log = capture_log(fn ->
      {:ok, _} = DebugMiddleware.complete(:result, %{})
    end)

    assert log =~ "✅ Reactor execution completed successfully."
  end

  # Scenario: Reactor encounters an error
  test "error/2 logs error message" do
    error = %RuntimeError{message: "Some error"}

    log = capture_log(fn ->
      :ok = DebugMiddleware.error(error, %{})
    end)

    assert log =~ "❌ Reactor execution encountered an error: %RuntimeError{message: \"Some error\"}"
  end

  # Scenario: Reactor is halted
  test "halt/1 logs halt message" do
    log = capture_log(fn ->
      :ok = DebugMiddleware.halt(%{})
    end)

    assert log =~ "⚠️ Reactor execution was halted."
  end

  # Scenario: Step execution starts
  test "event/3 logs step start" do
    step = %{name: "Step1"}
    arguments = %{input: 42}

    log = capture_log(fn ->
      DebugMiddleware.event({:run_start, arguments}, step, %{})
    end)

    assert log =~ "▶️ Step `Step1` started with arguments: #{inspect(arguments)}"
  end

  # Scenario: Step completes successfully
  test "event/3 logs step completion" do
    step = %{name: "Step1"}
    result = "Success"

    log = capture_log(fn ->
      DebugMiddleware.event({:run_complete, result}, step, %{})
    end)

    assert log =~ "✅ Step `Step1` completed successfully with result: #{inspect(result)}"
  end

  # Scenario: Step encounters an error
  test "event/3 logs step error" do
    step = %{name: "Step1"}
    errors = [%RuntimeError{message: "Step1 failed"}]

    log = capture_log(fn ->
      DebugMiddleware.event({:run_error, errors}, step, %{})
    end)

    assert log =~ "❌ Step `Step1` encountered an error: #{inspect(errors)}"
  end

  # Scenario: Step retries execution
  test "event/3 logs step retry" do
    step = %{name: "Step1"}
    value = "Retry Value"

    log = capture_log(fn ->
      DebugMiddleware.event({:run_retry, value}, step, %{})
    end)

    assert log =~ "🔄 Step `Step1` is retrying with value: #{inspect(value)}"
  end

  # Scenario: Step compensation starts
  test "event/3 logs compensation start" do
    step = %{name: "Step1"}
    reason = "Compensate Reason"

    log = capture_log(fn ->
      DebugMiddleware.event({:compensate_start, reason}, step, %{})
    end)

    assert log =~ "♻️ Step `Step1` is compensating due to: #{inspect(reason)}"
  end

  # Scenario: Step compensation completes
  test "event/3 logs compensation completion" do
    step = %{name: "Step1"}

    log = capture_log(fn ->
      DebugMiddleware.event({:compensate_complete, :ok}, step, %{})
    end)

    assert log =~ "🔄 Step `Step1` compensation completed."
  end

  # Scenario: Step undo starts
  test "event/3 logs undo start" do
    step = %{name: "Step1"}

    log = capture_log(fn ->
      DebugMiddleware.event({:undo_start, :ok}, step, %{})
    end)

    assert log =~ "⏪ Step `Step1` undo process started."
  end

  # Scenario: Step undo completes
  test "event/3 logs undo completion" do
    step = %{name: "Step1"}

    log = capture_log(fn ->
      DebugMiddleware.event({:undo_complete, :ok}, step, %{})
    end)

    assert log =~ "⏩ Step `Step1` undo process completed."
  end

  # Scenario: Step process starts
  test "event/3 logs process start" do
    step = %{name: "Step1"}
    pid = self()

    log = capture_log(fn ->
      DebugMiddleware.event({:process_start, pid}, step, %{})
    end)

    assert log =~ "▶️ Step `Step1` process started for PID: #{inspect(pid)}"
  end

  # Scenario: Step process terminates without verbose mode
  test "event/3 logs process termination without verbose details" do
    step = %{name: "Step1"}
    pid = self()
    context = %{verbose: false}

    log = capture_log(fn ->
      DebugMiddleware.event({:process_terminate, pid}, step, context)
    end)

    assert log =~ "🛑 Step `Step1` process terminated for PID: #{inspect(pid)}"
    refute log =~ "📌 Step:"
  end

  # Scenario: Step process terminates with verbose mode
  test "event/3 logs process termination with verbose details" do
    step = %{name: "Step1"}
    pid = self()
    context = %{verbose: true}

    log = capture_log(fn ->
      DebugMiddleware.event({:process_terminate, pid}, step, context)
    end)

    assert log =~ "🛑 Step `Step1` process terminated for PID: #{inspect(pid)}"
    assert log =~ "📌 Step:"
    assert log =~ inspect(step, pretty: true)
    assert log =~ "🎯 Context:"
    assert log =~ inspect(context, pretty: true)
  end
end
