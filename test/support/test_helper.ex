defmodule AshSwarm.TestHelper do
  @moduledoc """
  Helper module for test setup and utilities.

  This module provides common functionality needed across multiple tests,
  including mocking external services and APIs.
  """

  @doc """
  Apply mocks for external services to avoid actual API calls in tests.

  This function should be called in setup blocks of tests that would 
  otherwise make real API calls to external services.
  """
  def mock_external_services do
    # Using direct mocks is more reliable than Mox
    AshSwarm.Test.MockImplementations.setup_direct_mocks()
    
    # Store original values to restore later
    original_ai_code_analysis = Application.get_env(:ash_swarm, :ai_code_analysis_module)
    original_ai_adaptation_strategies = Application.get_env(:ash_swarm, :ai_adaptation_strategies_module)
    original_ai_experiment_evaluation = Application.get_env(:ash_swarm, :ai_experiment_evaluation_module)
    original_instructor_helper = Application.get_env(:ash_swarm, :instructor_helper_module)
    
    # Also set the mock instructor helper
    Application.put_env(:ash_swarm, :instructor_helper_module, AshSwarm.Test.Mocks.MockInstructorHelper)

    # Return a function to perform cleanup
    fn ->
      # Restore original values if they existed
      if original_ai_code_analysis do
        Application.put_env(:ash_swarm, :ai_code_analysis_module, original_ai_code_analysis)
      else
        Application.delete_env(:ash_swarm, :ai_code_analysis_module)
      end
      
      if original_ai_adaptation_strategies do
        Application.put_env(:ash_swarm, :ai_adaptation_strategies_module, original_ai_adaptation_strategies)
      else
        Application.delete_env(:ash_swarm, :ai_adaptation_strategies_module)
      end
      
      if original_ai_experiment_evaluation do
        Application.put_env(:ash_swarm, :ai_experiment_evaluation_module, original_ai_experiment_evaluation)
      else
        Application.delete_env(:ash_swarm, :ai_experiment_evaluation_module)
      end
      
      if original_instructor_helper do
        Application.put_env(:ash_swarm, :instructor_helper_module, original_instructor_helper)
      else
        Application.delete_env(:ash_swarm, :instructor_helper_module)
      end
    end
  end
  
  @doc """
  Clears all environment variables that would trigger real API calls.
  
  Use this in setup_all to ensure no real API calls can be made during tests.
  """
  def clear_api_keys do
    # Save the current values
    original_groq_key = System.get_env("GROQ_API_KEY")
    original_openai_key = System.get_env("OPENAI_API_KEY")
    original_gemini_key = System.get_env("GEMINI_API_KEY")
    
    # Clear the environment variables
    System.delete_env("GROQ_API_KEY")
    System.delete_env("OPENAI_API_KEY")
    System.delete_env("GEMINI_API_KEY")
    
    # Return a function to restore the original values
    fn ->
      if original_groq_key, do: System.put_env("GROQ_API_KEY", original_groq_key)
      if original_openai_key, do: System.put_env("OPENAI_API_KEY", original_openai_key)
      if original_gemini_key, do: System.put_env("GEMINI_API_KEY", original_gemini_key)
    end
  end
end 