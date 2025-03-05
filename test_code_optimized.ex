defmodule TestCode do
  @doc """
  An optimized implementation of the Fibonacci sequence using memoization.
  """
  @fib_cache %{}

  def fibonacci(0), do: 0
  def fibonacci(1), do: 1

  def fibonacci(n) when n > 1 do
    case @fib_cache |> Map.get(n) do
      nil ->
        result = fibonacci(n - 1) + fibonacci(n - 2)
        @fib_cache |> Map.put(n, result)
        result

      result ->
        result
    end
  end
end
