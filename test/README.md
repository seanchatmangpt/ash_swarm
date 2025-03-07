# AshSwarm Test Suite

This directory contains the test suite for the AshSwarm project. The tests are designed to run with mocked API calls to avoid hitting external services during testing.

## Running Tests

To run the tests, use the standard Mix command:

```bash
mix test
```

## API Calls in Tests

The test suite is designed to **not make actual API calls** to external services like Groq, OpenAI, or Gemini. Instead, it uses mocks defined in `test/support/mocks.ex` to provide fake responses.

### How Mocking Works

1. The `AshSwarm.TestHelper` module provides utilities for mocking:
   - `mock_external_services/0` - Replaces the real `InstructorHelper` with a mock version
   - `clear_api_keys/0` - Removes API keys from the environment for the duration of the test

2. The mock implementation in `AshSwarm.Test.Mocks.MockInstructorHelper` returns predefined responses for different types of requests.

3. This approach ensures tests:
   - Run quickly without network dependencies
   - Don't consume API quota unnecessarily
   - Have predictable, consistent behavior

## Running with Real APIs (Not Recommended)

If you need to test with real API calls (not recommended for regular testing):

1. Set the appropriate environment variables:
   ```bash
   export GROQ_API_KEY="your-key-here"
   export OPENAI_API_KEY="your-key-here"
   ```

2. Modify the test setup to skip mocking:
   ```elixir
   # Comment out these lines in the test file
   # on_exit_fn = TestHelper.mock_external_services()
   # on_exit(fn -> on_exit_fn.() end)
   ```

Note: This approach should be used sparingly and is not recommended for CI/CD pipelines or regular development.

## Adding New Tests

When adding new tests that would normally make API calls:

1. Ensure the appropriate mock responses are defined in `AshSwarm.Test.Mocks.MockInstructorHelper.generate_mock_response/2`
2. Use the standard `setup` block that includes `TestHelper.mock_external_services()`
3. Write assertions that match the expected structure of the mock responses

## Example Implementation

```elixir
defmodule MyTest do
  use ExUnit.Case
  import ExUnit.Callbacks, only: [on_exit: 1]
  alias AshSwarm.TestHelper

  setup do
    on_exit_fn = TestHelper.mock_external_services()
    on_exit(fn -> on_exit_fn.() end)
    :ok
  end

  test "my test that would normally call an API" do
    # This call will be intercepted by the mock
    result = SomeModule.function_that_uses_instructor_helper()
    
    # Assert against the mock response structure
    assert is_map(result)
    assert Map.has_key?(result, :expected_field)
  end
end
``` 