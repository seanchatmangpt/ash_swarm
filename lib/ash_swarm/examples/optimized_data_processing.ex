defmodule AshSwarm.Examples.OptimizedDataProcessing do
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
    data
    |> Enum.map(&transform_point/1)
    |> Enum.filter(&filter_point(&1, threshold))
    |> Enum.group_by(& &1.category)
    |> Enum.map(&calculate_averages/1)
  end

  defp transform_point(point) do
    %{id: point.id, value: point.value * 2, timestamp: point.timestamp, category: point.category}
  end

  defp filter_point(point, threshold) do
    point.value > threshold
  end

  defp calculate_averages({category, points}) do
    total = Enum.sum(Enum.map(points, & &1.value))
    count = length(points)
    average = total / count

    %{category: category, count: count, average: average, points: points}
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
    if length(data) < window_size do
      []
    else
      data
      |> Enum.chunk_every(window_size, 1, :discard)
      |> Enum.map(&analyze_window/1)
    end
  end

  defp analyze_window(window) do
    values = Enum.map(window, & &1.value)
    sum = Enum.sum(values)
    avg = sum / length(window)
    min = Enum.min(values)
    max = Enum.max(values)

    sorted = Enum.sort(values)

    trend =
      cond do
        values == sorted -> :increasing
        values == Enum.reverse(sorted) -> :decreasing
        true -> :fluctuating
      end

    %{
      start_time: List.first(window).timestamp,
      end_time: List.last(window).timestamp,
      average: avg,
      min: min,
      max: max,
      trend: trend
    }
  end
end
