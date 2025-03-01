defmodule IgniterBehaviour do
  @moduledoc "Behaviour defining functions for mocking Igniter.Project.Module in tests"

  @callback parse(String.t()) :: module()
  @callback module_exists(any(), module()) :: {boolean(), any()}
  @callback create_module(any(), module(), String.t()) :: any()
end
