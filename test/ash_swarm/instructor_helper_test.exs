defmodule AshSwarm.InstructorHelperTest do
  use ExUnit.Case
  doctest AshSwarm.InstructorHelper

  alias AshSwarm.InstructorHelper

  # Define a simple response model for testing
  defmodule TestResponse do
    defstruct [:message, :confidence]
  end

  describe "gen/4 with Groq" do
    test "generates completion with Groq model" do
      # Only run this test if GROQ_API_KEY is present
      if InstructorHelper.groq_api_key_present?() do
        response_model = %TestResponse{}
        sys_msg = "You are a helpful assistant. Please respond in JSON format with a message and confidence level."
        user_msg = "Say hello and express your confidence level as a number between 0 and 1. Respond in JSON with fields: message (string) and confidence (number)."
        model = "llama3-70b-8192"  # Using Groq's Llama model

        assert {:ok, result} = InstructorHelper.gen(response_model, sys_msg, user_msg, model)
        
        # Print the actual response
        IO.puts("\nGroq Response:")
        IO.puts("Message: #{result.message}")
        IO.puts("Confidence: #{result.confidence}")
        
        assert %TestResponse{} = result
        assert is_binary(result.message)
        assert is_number(result.confidence)
        assert result.confidence >= 0 and result.confidence <= 1
      else
        IO.puts("\nSkipping Groq test - GROQ_API_KEY not set")
        :ok
      end
    end

    test "handles error when API key is invalid" do
      # Temporarily set an invalid API key
      System.put_env("GROQ_API_KEY", "invalid_key")

      response_model = %TestResponse{}
      sys_msg = "You are a helpful assistant. Please respond in JSON format."
      user_msg = "Say hello in JSON format"
      model = "llama3-70b-8192"

      assert {:error, error_message} = InstructorHelper.gen(response_model, sys_msg, user_msg, model)
      assert is_binary(error_message)

      # Reset environment
      if original_key = System.get_env("GROQ_API_KEY_BACKUP") do
        System.put_env("GROQ_API_KEY", original_key)
      else
        System.delete_env("GROQ_API_KEY")
      end
    end
  end
end 