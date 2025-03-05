defmodule AshSwarm.Foundations.UsageStats do
  @moduledoc """
  Tracks usage statistics for modules and actions to inform adaptive optimizations.
  
  This module provides the ability to record, retrieve, and analyze usage patterns
  of code, which is a critical component of the Adaptive Code Evolution Pattern.
  """
  
  use GenServer
  
  require Logger
  
  # Client API
  
  @doc """
  Starts the UsageStats server.
  """
  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end
  
  @doc """
  Updates usage statistics for a module and action.
  
  ## Parameters
  
    - `module`: The module being used.
    - `action`: The action being performed.
    - `context`: Additional context about the usage.
  
  ## Returns
  
    - `:ok`
  """
  def update_stats(module, action, context \\ %{}) do
    GenServer.cast(__MODULE__, {:update_stats, module, action, context})
  end
  
  @doc """
  Gets usage statistics for a module and action.
  
  ## Parameters
  
    - `module`: The module to get statistics for.
    - `action_key`: The action key, typically "function_name/arity".
  
  ## Returns
  
    - A map containing usage statistics.
  """
  def get_stats(module, action_key) do
    GenServer.call(__MODULE__, {:get_stats, module, action_key})
  end
  
  @doc """
  Gets all usage statistics.
  
  ## Returns
  
    - A map containing all recorded usage statistics.
  """
  def get_all_stats do
    GenServer.call(__MODULE__, :get_all_stats)
  end
  
  @doc """
  Resets all usage statistics.
  
  ## Returns
  
    - `:ok`
  """
  def reset_stats do
    GenServer.cast(__MODULE__, :reset_stats)
  end
  
  @doc """
  Gets the most frequently used functions for a module.
  
  ## Parameters
  
    - `module`: The module to get statistics for.
    - `limit`: The maximum number of functions to return (default: 10).
  
  ## Returns
  
    - A list of {action_key, call_count} tuples sorted by call count.
  """
  def most_used_functions(module, limit \\ 10) do
    GenServer.call(__MODULE__, {:most_used_functions, module, limit})
  end
  
  @doc """
  Gets the slow functions for a module based on average execution time.
  
  ## Parameters
  
    - `module`: The module to get statistics for.
    - `limit`: The maximum number of functions to return (default: 10).
  
  ## Returns
  
    - A list of {action_key, avg_exec_time} tuples sorted by execution time.
  """
  def slow_functions(module, limit \\ 10) do
    GenServer.call(__MODULE__, {:slow_functions, module, limit})
  end
  
  # Server callbacks
  
  @impl true
  def init(_opts) do
    # State structure:
    # %{
    #   stats: %{
    #     {Module, "function/arity"} => %{
    #       call_count: 0,
    #       first_call: nil,
    #       last_call: nil,
    #       execution_times: [],
    #       avg_exec_time: 0,
    #       contexts: []
    #     }
    #   }
    # }
    
    state = %{
      stats: %{}
    }
    
    {:ok, state}
  end
  
  @impl true
  def handle_cast({:update_stats, module, action, context}, state) do
    # Get the action key
    action_key = if is_atom(action) do
      to_string(action)
    else
      action
    end
    
    # Get current stats for this action, or initialize if not exists
    current_stats = Map.get(
      state.stats,
      {module, action_key},
      %{
        call_count: 0,
        first_call: nil,
        last_call: nil,
        execution_times: [],
        avg_exec_time: 0,
        contexts: []
      }
    )
    
    # Update stats
    now = DateTime.utc_now()
    execution_time = Map.get(context, :execution_time)
    
    new_stats = %{
      call_count: current_stats.call_count + 1,
      first_call: current_stats.first_call || now,
      last_call: now,
      execution_times: if(execution_time, do: [execution_time | current_stats.execution_times], else: current_stats.execution_times),
      avg_exec_time: if(execution_time, do: calculate_avg(current_stats.avg_exec_time, current_stats.call_count, execution_time), else: current_stats.avg_exec_time),
      contexts: [context | current_stats.contexts] |> Enum.take(100)  # Keep only the last 100 contexts
    }
    
    # Update state
    new_stats_map = Map.put(state.stats, {module, action_key}, new_stats)
    
    {:noreply, %{state | stats: new_stats_map}}
  end
  
  @impl true
  def handle_cast(:reset_stats, _state) do
    # Reset all stats
    new_state = %{
      stats: %{}
    }
    
    {:noreply, new_state}
  end
  
  @impl true
  def handle_call({:get_stats, module, action_key}, _from, state) do
    # Get stats for this module and action
    stats = Map.get(
      state.stats,
      {module, action_key},
      %{
        call_count: 0,
        first_call: nil,
        last_call: nil,
        execution_times: [],
        avg_exec_time: 0,
        contexts: []
      }
    )
    
    {:reply, stats, state}
  end
  
  @impl true
  def handle_call(:get_all_stats, _from, state) do
    {:reply, state.stats, state}
  end
  
  @impl true
  def handle_call({:most_used_functions, module, limit}, _from, state) do
    # Get all functions for this module
    module_functions = Enum.filter(state.stats, fn {{mod, _action}, _stats} ->
      mod == module
    end)
    
    # Sort by call count
    sorted = Enum.sort_by(module_functions, fn {_key, stats} ->
      stats.call_count
    end, :desc)
    
    # Take the top N
    result = Enum.take(sorted, limit)
    |> Enum.map(fn {{_mod, action}, stats} ->
      {action, stats.call_count}
    end)
    
    {:reply, result, state}
  end
  
  @impl true
  def handle_call({:slow_functions, module, limit}, _from, state) do
    # Get all functions for this module
    module_functions = Enum.filter(state.stats, fn {{mod, _action}, _stats} ->
      mod == module
    end)
    
    # Sort by average execution time
    sorted = Enum.sort_by(module_functions, fn {_key, stats} ->
      stats.avg_exec_time
    end, :desc)
    
    # Take the top N
    result = Enum.take(sorted, limit)
    |> Enum.map(fn {{_mod, action}, stats} ->
      {action, stats.avg_exec_time}
    end)
    
    {:reply, result, state}
  end
  
  # Helper functions
  
  defp calculate_avg(current_avg, count, new_value) do
    ((current_avg * count) + new_value) / (count + 1)
  end
end