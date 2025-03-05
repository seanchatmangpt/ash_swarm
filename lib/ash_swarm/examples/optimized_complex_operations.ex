defmodule AshSwarm.Examples.OptimizedComplexOperations do
  @moduledoc """
  Module containing examples of operations that can be optimized
  using the Adaptive Code Evolution pattern.

  This module provides more complex examples than the basic
  Fibonacci and prime number functions used in the demo.
  """

  @doc """
  Sorts a list using a more efficient sorting algorithm.

  This implementation uses merge sort instead of bubble sort,
  providing O(n log n) performance compared to O(n²).

  ## Examples

      iex> AshSwarm.Examples.OptimizedComplexOperations.efficient_sort([3, 1, 4, 1, 5, 9, 2, 6, 5])
      [1, 1, 2, 3, 4, 5, 5, 6, 9]

  """
  def efficient_sort([]), do: []
  def efficient_sort([x]), do: [x]

  def efficient_sort(list) do
    half_size = div(length(list), 2)
    {left, right} = Enum.split(list, half_size)

    # Sort each half and merge
    merge(efficient_sort(left), efficient_sort(right))
  end

  @doc false
  defp merge([], right), do: right
  defp merge(left, []), do: left

  defp merge([x | left_tail], [y | right_tail]) when x <= y do
    [x | merge(left_tail, [y | right_tail])]
  end

  defp merge([x | left_tail], [y | right_tail]) do
    [y | merge([x | left_tail], right_tail)]
  end

  @doc """
  Calculates the Levenshtein distance between two strings.

  This is an optimized implementation that uses a matrix approach
  with O(m*n) time complexity.

  ## Examples

      iex> AshSwarm.Examples.OptimizedComplexOperations.levenshtein_distance("kitten", "sitting")
      3

  """
  def levenshtein_distance(str1, str2) do
    # Convert strings to charlist
    s1 = String.to_charlist(str1)
    s2 = String.to_charlist(str2)

    # Create a matrix of size (length(s1)+1) x (length(s2)+1)
    matrix =
      for i <- 0..length(s1), into: %{} do
        {i, 0, i}
      end

    matrix =
      for j <- 0..length(s2), into: matrix do
        {0, j, j}
      end

    # Fill the matrix
    matrix =
      for i <- 1..length(s1), j <- 1..length(s2), into: matrix do
        cost = if Enum.at(s1, i - 1) == Enum.at(s2, j - 1), do: 0, else: 1
        deletion = Map.get(matrix, {i - 1, j}) + 1
        insertion = Map.get(matrix, {i, j - 1}) + 1
        substitution = Map.get(matrix, {i - 1, j - 1}) + cost
        {i, j, Enum.min([deletion, insertion, substitution])}
      end

    # Return the distance
    Map.get(matrix, {length(s1), length(s2)})
  end

  @doc """
  Finds prime numbers in a given range using an optimized algorithm.

  ## Examples

      iex> AshSwarm.Examples.OptimizedComplexOperations.find_primes(1, 20)
      [2, 3, 5, 7, 11, 13, 17, 19]

  """
  def find_primes(start, finish) when start > 0 and finish >= start do
    max(start, 2)..finish
    |> Enum.filter(&prime?/1)
  end

  @doc false
  defp prime?(num) do
    # Use Erlang's :math module instead of Math
    Enum.all?(2..Kernel.trunc(:math.sqrt(num)), fn i ->
      rem(num, i) != 0
    end)
  end
end
