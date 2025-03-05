defmodule AshSwarm.Foundations.AdaptiveScheduler do
  @moduledoc """
  Manages scheduled adaptive evolution of code.

  This module provides the ability to schedule periodic adaptive evolution
  of code, ensuring that code continuously improves over time based on
  actual usage patterns.
  """

  use GenServer

  require Logger

  # One day in milliseconds
  @one_day_ms 24 * 60 * 60 * 1000

  # Client API

  @doc """
  Starts the AdaptiveScheduler server.
  """
  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  @doc """
  Schedules a module for adaptive evolution at the specified interval.

  ## Parameters

    - `module`: The module to evolve.
    - `schedule`: When to run the evolution ("daily", "hourly", or a specific time).
    - `evolution_type`: The type of evolution to perform (default: :query).

  ## Returns

    - `:ok`
  """
  def schedule_evolution(module, schedule \\ "daily", evolution_type \\ :query) do
    GenServer.cast(__MODULE__, {:schedule, module, schedule, evolution_type})
  end

  @doc """
  Lists all scheduled evolutions.

  ## Returns

    - A list of scheduled evolutions.
  """
  def list_scheduled do
    GenServer.call(__MODULE__, :list_scheduled)
  end

  @doc """
  Runs all scheduled evolutions immediately.

  ## Returns

    - `:ok`
  """
  def run_all_now do
    GenServer.cast(__MODULE__, :run_all)
  end

  # Server callbacks

  @impl true
  def init(_opts) do
    # State structure:
    # %{
    #   scheduled: [
    #     %{module: Module, schedule: "daily", type: :query, last_run: DateTime}
    #   ],
    #   timers: %{
    #     Module => reference
    #   }
    # }

    state = %{
      scheduled: [],
      timers: %{}
    }

    # Start checking scheduled tasks
    schedule_check()

    {:ok, state}
  end

  @impl true
  def handle_cast({:schedule, module, schedule, evolution_type}, state) do
    # Check if module is already scheduled
    already_scheduled = Enum.any?(state.scheduled, fn item -> item.module == module end)

    if already_scheduled do
      # Update existing schedule
      new_scheduled =
        Enum.map(state.scheduled, fn item ->
          if item.module == module do
            %{item | schedule: schedule, type: evolution_type}
          else
            item
          end
        end)

      # Cancel existing timer
      if Map.has_key?(state.timers, module) do
        timer_ref = Map.get(state.timers, module)
        Process.cancel_timer(timer_ref)
      end

      # Create new timer
      timer_ref = schedule_evolution_timer(module, evolution_type, schedule)

      new_state = %{
        state
        | scheduled: new_scheduled,
          timers: Map.put(state.timers, module, timer_ref)
      }

      {:noreply, new_state}
    else
      # Add new schedule
      new_scheduled = [
        %{
          module: module,
          schedule: schedule,
          type: evolution_type,
          last_run: nil
        }
        | state.scheduled
      ]

      # Create timer
      timer_ref = schedule_evolution_timer(module, evolution_type, schedule)

      new_state = %{
        state
        | scheduled: new_scheduled,
          timers: Map.put(state.timers, module, timer_ref)
      }

      {:noreply, new_state}
    end
  end

  @impl true
  def handle_cast(:run_all, state) do
    # Run all scheduled evolutions
    Enum.each(state.scheduled, fn item ->
      run_evolution(item.module, item.type)
    end)

    # Update last_run for all items
    now = DateTime.utc_now()

    new_scheduled =
      Enum.map(state.scheduled, fn item ->
        %{item | last_run: now}
      end)

    {:noreply, %{state | scheduled: new_scheduled}}
  end

  @impl true
  def handle_call(:list_scheduled, _from, state) do
    {:reply, state.scheduled, state}
  end

  @impl true
  def handle_info({:run_evolution, module, type}, state) do
    # Run the evolution
    run_evolution(module, type)

    # Update last_run for this module
    now = DateTime.utc_now()

    new_scheduled =
      Enum.map(state.scheduled, fn item ->
        if item.module == module do
          %{item | last_run: now}
        else
          item
        end
      end)

    # Reschedule
    schedule_item = Enum.find(new_scheduled, fn item -> item.module == module end)

    if schedule_item do
      timer_ref = schedule_evolution_timer(module, type, schedule_item.schedule)

      new_state = %{
        state
        | scheduled: new_scheduled,
          timers: Map.put(state.timers, module, timer_ref)
      }

      {:noreply, new_state}
    else
      {:noreply, %{state | scheduled: new_scheduled}}
    end
  end

  @impl true
  def handle_info(:check_scheduled, state) do
    # Check if any scheduled evolutions should run
    now = DateTime.utc_now()

    Enum.each(state.scheduled, fn item ->
      if should_run_now?(item, now) do
        run_evolution(item.module, item.type)
      end
    end)

    # Schedule next check
    schedule_check()

    {:noreply, state}
  end

  # Helper functions

  defp schedule_check do
    # Check scheduled tasks every hour
    Process.send_after(self(), :check_scheduled, 60 * 60 * 1000)
  end

  defp schedule_evolution_timer(module, type, schedule) do
    # Calculate when to run
    delay_ms = calculate_delay(schedule)

    # Schedule the evolution
    Process.send_after(self(), {:run_evolution, module, type}, delay_ms)
  end

  defp calculate_delay("daily") do
    # Run daily at 2 AM
    now = DateTime.utc_now()
    target = %{now | hour: 2, minute: 0, second: 0, microsecond: {0, 0}}

    target_in_future =
      if DateTime.compare(target, now) == :lt do
        # Target time is in the past, so schedule for tomorrow
        DateTime.add(target, 1, :day)
      else
        target
      end

    DateTime.diff(target_in_future, now, :millisecond)
  end

  defp calculate_delay("hourly") do
    # Run at the start of every hour
    60 * 60 * 1000
  end

  defp calculate_delay(time) when is_binary(time) do
    # Parse time string of format "HH:MM"
    # This is a simplified implementation
    now = DateTime.utc_now()

    case String.split(time, ":") do
      [hour_str, minute_str] ->
        hour = String.to_integer(hour_str)
        minute = String.to_integer(minute_str)

        target = %{now | hour: hour, minute: minute, second: 0, microsecond: {0, 0}}

        target_in_future =
          if DateTime.compare(target, now) == :lt do
            # Target time is in the past, so schedule for tomorrow
            DateTime.add(target, 1, :day)
          else
            target
          end

        DateTime.diff(target_in_future, now, :millisecond)

      _ ->
        # Invalid time format, use daily default
        @one_day_ms
    end
  end

  defp calculate_delay(_) do
    # Default to daily
    @one_day_ms
  end

  defp should_run_now?(item, now) do
    # Check if the scheduled item should run now
    # This is a simplified implementation

    case item.last_run do
      # Never run before
      nil ->
        true

      last_run ->
        # Check based on schedule
        case item.schedule do
          "daily" ->
            DateTime.diff(now, last_run, :second) >= 24 * 60 * 60

          "hourly" ->
            DateTime.diff(now, last_run, :second) >= 60 * 60

          time when is_binary(time) ->
            # Specific time
            DateTime.diff(now, last_run, :second) >= 24 * 60 * 60

          _ ->
            false
        end
    end
  end

  defp run_evolution(module, :query) do
    Logger.info("Running query evolution for module: #{inspect(module)}")

    # Delegate to the module-specific evolution implementation
    # This is a placeholder for actual evolution logic
    case Code.ensure_loaded(AshSwarm.Foundations.QueryEvolution) do
      {:module, _} ->
        apply(AshSwarm.Foundations.QueryEvolution, :evolve_queries, [module])

      _ ->
        Logger.warning(
          "QueryEvolution module not loaded. Unable to evolve queries for #{inspect(module)}"
        )
    end
  end

  defp run_evolution(module, type) do
    Logger.info("Running #{type} evolution for module: #{inspect(module)}")

    # In a real implementation, this would dispatch to other evolution types
    # This is a placeholder for actual evolution logic
    Logger.warning(
      "No evolution implementation found for type #{type} on module #{inspect(module)}"
    )
  end
end
