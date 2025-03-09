#!/usr/bin/env elixir

# Read the file
content = File.read!("lib/ash_swarm/instructor_helper.ex")

# Find the function definition
if String.contains?(content, "defp convert_to_simple_json_schema") do
  # Add @doc false before the function but keep the function name
  updated_content =
    String.replace(
      content,
      "defp convert_to_simple_json_schema",
      "@doc false\n  defp convert_to_simple_json_schema"
    )

  # Write the updated content back
  File.write!("lib/ash_swarm/instructor_helper.ex", updated_content)
  IO.puts("Added @doc false to convert_to_simple_json_schema")
else
  IO.puts("Function not found in file")
end
