defmodule AshSwarm.Examples.ComplexOperations do
  @moduledoc """
  Module containing examples of operations that can be optimized
  using the Adaptive Code Evolution pattern.
  
  This module provides more complex examples than the basic
  Fibonacci and prime number functions used in the demo.
  """
  
  @doc """
  Sorts a list using naive bubble sort.
  This is intentionally inefficient for demonstration purposes.
  
  ## Parameters
  
  - list - The list to sort
  
  ## Returns
  
  - The sorted list
  """
  @spec bubble_sort(list()) :: list()
  def bubble_sort([]), do: []
  def bubble_sort([x]), do: [x]
  def bubble_sort(list) do
    {new_list, swapped} = bubble_sort_pass(list, [], false)
    if swapped, do: bubble_sort(new_list), else: new_list
  end
  
  @doc false
  defp bubble_sort_pass([], acc, swapped), do: {Enum.reverse(acc), swapped}
  defp bubble_sort_pass([x], acc, swapped), do: {Enum.reverse([x | acc]), swapped}
  defp bubble_sort_pass([x, y | rest], acc, _swapped) when x > y do
    bubble_sort_pass([x | rest], [y | acc], true)
  end
  defp bubble_sort_pass([x, y | rest], acc, swapped) do
    bubble_sort_pass([y | rest], [x | acc], swapped)
  end
  
  @doc """
  Checks if a string is a palindrome.
  Uses a naive implementation for demonstration purposes.
  
  ## Parameters
  
  - str - The string to check
  
  ## Returns
  
  - true if the string is a palindrome, false otherwise
  """
  @spec is_palindrome?(String.t()) :: boolean()
  def is_palindrome?(str) do
    # Clean the string: remove spaces, punctuation, and convert to lowercase
    clean_str = str
    |> String.downcase()
    |> String.replace(~r/[^\w]/, "")
    
    # Naive implementation: reverse and compare
    clean_str == String.reverse(clean_str)
  end
  
  @doc """
  Computes the Levenshtein distance between two strings.
  Uses a naive recursive implementation for demonstration purposes.
  
  ## Parameters
  
  - str1 - The first string
  - str2 - The second string
  
  ## Returns
  
  - The Levenshtein distance between the two strings
  """
  @spec levenshtein_distance(String.t(), String.t()) :: non_neg_integer()
  def levenshtein_distance(str1, str2) do
    levenshtein_distance(String.graphemes(str1), String.graphemes(str2))
  end
  
  @doc false
  defp levenshtein_distance([], str2), do: length(str2)
  defp levenshtein_distance(str1, []), do: length(str1)
  defp levenshtein_distance([h | t1], [h | t2]), do: levenshtein_distance(t1, t2)
  defp levenshtein_distance([_h1 | t1], [_h2 | t2]) do
    [
      levenshtein_distance(t1, [_h2 | t2]) + 1,
      levenshtein_distance([_h1 | t1], t2) + 1,
      levenshtein_distance(t1, t2) + 1
    ] |> Enum.min()
  end
  
  @doc """
  Finds all prime numbers up to n using the Sieve of Eratosthenes.
  Uses a naive implementation for demonstration purposes.
  
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
    |> sieve([])
  end
  
  @doc false
  defp sieve([], primes), do: Enum.reverse(primes)
  defp sieve([prime | rest], primes) do
    # Remove all multiples of the prime
    new_rest = Enum.filter(rest, fn num -> rem(num, prime) != 0 end)
    sieve(new_rest, [prime | primes])
  end
end
