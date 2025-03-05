defmodule AshSwarm.Examples.DataProcessing do
  @moduledoc """
  Module containing examples of data processing operations that can be optimized
  using the Adaptive Code Evolution pattern.
  """
  
  @doc """
  Processes a list of data points by applying transformations and filtering.
  
  ## Parameters
  
  - data - The list of data points to process
  - threshold - The threshold for filtering
  
  ## Returns
  
  - The processed data
  """
  @spec process_data(list(map()), number()) :: list(map())
  def process_data(data, threshold) do
    # First transform each data point
    transformed_data = Enum.map(data, fn point ->
      %{
        id: point.id,
        value: point.value * 2,
        timestamp: point.timestamp,
        category: point.category
      }
    end)
    
    # Then filter based on threshold
    filtered_data = Enum.filter(transformed_data, fn point ->
      point.value > threshold
    end)
    
    # Group by category
    grouped_data = Enum.reduce(filtered_data, %{}, fn point, acc ->
      Map.update(acc, point.category, [point], fn existing ->
        [point | existing]
      end)
    end)
    
    # Calculate averages per category
    Enum.map(grouped_data, fn {category, points} ->
      total = Enum.reduce(points, 0, fn point, acc ->
        acc + point.value
      end)
      
      count = length(points)
      average = total / count
      
      %{
        category: category,
        count: count,
        average: average,
        points: points
      }
    end)
  end
  
  @doc """
  Finds patterns in the data using a simple sliding window algorithm.
  
  ## Parameters
  
  - data - The data points in chronological order
  - window_size - The size of the sliding window
  
  ## Returns
  
  - List of identified patterns
  """
  @spec find_patterns(list(map()), pos_integer()) :: list(map())
  def find_patterns(data, window_size) do
    # Ensure we have enough data
    if length(data) < window_size do
      []
    else
      # Create sliding windows
      windows = Enum.chunk_every(data, window_size, 1, :discard)
      
      # Analyze each window
      Enum.map(windows, fn window ->
        # Extract values
        values = Enum.map(window, & &1.value)
        
        # Calculate some statistics
        sum = Enum.sum(values)
        avg = sum / window_size
        min = Enum.min(values)
        max = Enum.max(values)
        
        # Determine if there's a trend
        sorted = Enum.sort(values)
        trend = cond do
          values == sorted -> :increasing
          values == Enum.reverse(sorted) -> :decreasing
          true -> :fluctuating
        end
        
        # Create a pattern record
        %{
          start_time: List.first(window).timestamp,
          end_time: List.last(window).timestamp,
          average: avg,
          min: min,
          max: max,
          trend: trend
        }
      end)
    end
  end
end
