defmodule TestCode do
  @doc """
  A naive implementation of the Fibonacci sequence.
  """
  def fibonacci(0), do: 0
  def fibonacci(1), do: 1

  def fibonacci(n) when n > 1 do
    fibonacci(n - 1) + fibonacci(n - 2)
  end
end
