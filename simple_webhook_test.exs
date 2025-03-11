#!/usr/bin/env elixir

# A simpler webhook test script with more debugging

require Logger
Logger.configure(level: :debug)

Logger.info("Starting simple webhook test...")

# Simple issue payload
payload = Jason.encode!(%{
  "action" => "opened",
  "issue" => %{
    "title" => "Simple Test Issue",
    "body" => "This is a test issue with minimal fields"
  },
  "repository" => %{
    "full_name" => "test/repo"
  }
})

url = "http://localhost:4000/webhooks/github"
headers = [
  {"Content-Type", "application/json"},
  {"X-GitHub-Event", "issues"}
]

Logger.info("Sending request to #{url}")
Logger.debug("Payload: #{payload}")

try do
  {:ok, response} = :httpc.request(
    :post,
    {String.to_charlist(url), 
     Enum.map(headers, fn {k, v} -> {String.to_charlist(k), String.to_charlist(v)} end),
     'application/json',
     String.to_charlist(payload)},
    [],
    []
  )
  
  {{_, status, _}, response_headers, response_body} = response
  
  Logger.info("Response status: #{status}")
  Logger.info("Response headers: #{inspect(response_headers)}")
  Logger.info("Response body: #{response_body}")
rescue
  e -> Logger.error("Error: #{inspect(e)}")
catch
  kind, reason -> Logger.error("Caught #{kind}: #{inspect(reason)}")
end 