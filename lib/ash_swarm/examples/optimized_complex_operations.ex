defmodule AshSwarm.Examples.OptimizedComplexOperations do
  @moduledoc """
  Module containing examples of operations that can be optimized
  using the Adaptive Code Evolution pattern.
  
  This module provides more complex examples than the basic
  Fibonacci and prime number functions used in the demo.
  """
  
  @doc """
  Sorts a list using a more efficient sorting algorithm.
  This is optimized for high-volume computation.
  
  ## Parameters
  
  - list - The list to sort
  
  ## Returns
  
  - The sorted list
  """
  @spec bubble_sort(list()) :: list()
  def bubble_sort(list) do
    Enum.sort(list)
  end
  
  @doc """
  Checks if a string is a palindrome.
  Uses a more efficient implementation for high-volume computation.
  
  ## Parameters
  
  - str - The string to check
  
  ## Returns
  
  - true if the string is a palindrome, false otherwise
  """
  @spec is_palindrome?(String.t()) :: boolean()
  def is_palindrome?(str) do
    # Clean the string: remove spaces, punctuation, and convert to lowercase
    clean_str = String.downcase(str)
    |> String.replace(~r/[^\w]/, "")
    
    # More efficient implementation: use String.reverse/1 and String.codepoints/1
    clean_str == String.reverse(clean_str)
  end
  
  @doc """
  Computes the Levenshtein distance between two strings.
  Uses a more efficient implementation for high-volume computation.
  
  ## Parameters
  
  - str1 - The first string
  - str2 - The second string
  
  ## Returns
  
  - The Levenshtein distance between the two strings
  """
  @spec levenshtein_distance(String.t(), String.t()) :: non_neg_integer()
  def levenshtein_distance(str1, str2) do
    levenshtein_distance_impl(String.graphemes(str1), String.graphemes(str2))
  end
  
  @doc false
  defp levenshtein_distance_impl([], []), do: 0
  defp levenshtein_distance_impl([], [_h2 | t2]), do: 1 + levenshtein_distance_impl([], t2)
  defp levenshtein_distance_impl([_h1 | t1], []), do: 1 + length(t1)
  defp levenshtein_distance_impl([h1 | t1], [h2 | t2]) do
    if h1 == h2 do
      levenshtein_distance_impl(t1, t2)
    else
      Enum.min([
        levenshtein_distance_impl(t1, [h2 | t2]) + 1,
        levenshtein_distance_impl([h1 | t1], t2) + 1,
        levenshtein_distance_impl(t1, t2) + 1
      ])
    end
  end
  
  @doc """
  Finds all prime numbers up to n using the Sieve of Eratosthenes.
  Uses a more efficient implementation for high-volume computation.
  
  ## Parameters
  
  - n - The upper bound
  
  ## Returns
  
  - A list of prime numbers up to n
  """
  @spec sieve_of_eratosthenes(non_neg_integer()) :: list(non_neg_integer())
  def sieve_of_eratosthenes(n) when n < 2, do: []
  def sieve_of_eratosthenes(n) do
    # Create a list from 2 to n
    2..n
    |> Enum.to_list()
    |> Enum.filter(&prime?/1)
  end
  
  @doc false
  defp prime?(num) do
    # Use Erlang's :math module instead of Math
    Enum.all?(2..trunc(:math.sqrt(num)), fn i ->
      rem(num, i) != 0
    end)
  end
end