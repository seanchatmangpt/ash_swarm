defmodule ToFromDSL do
  @moduledoc """
  A behaviour + macro providing to/from YAML, JSON, and TOML functionality.

  YAML encoding is done with Ymlr.document!/2,
  while YAML decoding uses YamlElixir.read_from_string/1.
  """

  @callback model_dump(struct()) :: map()
  @callback model_validate(map()) :: struct()
  @callback model_dump_json(struct(), keyword()) :: String.t()

  defmacro __using__(_opts) do
    quote do
      @behaviour ToFromDSL

      # from_map/1 (idiomatic Elixir, not "from_dict")
      def from_map(data) when is_map(data) do
        try do
          __MODULE__.model_validate(data)
        rescue
          e in RuntimeError ->
            raise "Validation error while creating #{inspect(__MODULE__)} instance: #{inspect(e)}"
        end
      end

      # from_yaml/2 uses YamlElixir to read YAML
      def from_yaml(content \\ nil, file_path \\ nil) do
        content = ensure_content(content, file_path, "YAML")

        case YamlElixir.read_from_string(content) do
          {:ok, data} when is_map(data) ->
            from_map(data)

          {:ok, other} ->
            raise "Expected YAML to decode into a map, got: #{inspect(other)}"

          {:error, reason} ->
            raise "Error parsing YAML content: #{inspect(reason)}"
        end
      end

      # from_json/2
      def from_json(content \\ nil, file_path \\ nil) do
        content = ensure_content(content, file_path, "JSON")

        case Jason.decode(content) do
          {:ok, data} when is_map(data) ->
            from_map(data)

          {:ok, other} ->
            raise "Expected JSON to decode into a map, got: #{inspect(other)}"

          {:error, reason} ->
            raise "Error parsing JSON content: #{inspect(reason)}"
        end
      end

      # from_toml/2 using Bitwalker TOML library
      # def from_toml(content \\ nil, file_path \\ nil) do
      #   content = ensure_content(content, file_path, "TOML")

      #   case Toml.decode(content) do
      #     {:ok, data} when is_map(data) ->
      #       from_map(data)

      #     {:ok, other} ->
      #       raise "Expected TOML to decode into a map, got: #{inspect(other)}"

      #     {:error, reason} ->
      #       raise "Error parsing TOML content: #{inspect(reason)}"
      #   end
      # end

      # to_yaml/2 using Ymlr for encoding
      def to_yaml(instance, file_path \\ nil) do
        data = __MODULE__.model_dump(instance)

        yaml_content =
          try do
            Ymlr.document!(data)
          rescue
            e -> raise "Failed to serialize to YAML: #{inspect(e)}"
          end

        write_content(file_path, yaml_content)
        yaml_content
      end

      # to_json/2
      def to_json(instance, file_path \\ nil) do
        json_content =
          try do
            __MODULE__.model_dump_json(instance, indent: 4)
          rescue
            e -> raise "Failed to serialize to JSON: #{inspect(e)}"
          end

        write_content(file_path, json_content)
        json_content
      end

      # to_toml/2 using Toml.encode_to_iodata/1
      # def to_toml(instance, file_path \\ nil) do
      #   data = __MODULE__.model_dump(instance)

      #   toml_content =
      #     try do
      #       case Toml.encode_to_iodata(data) do
      #         {:ok, iodata} -> IO.iodata_to_binary(iodata)
      #         {:error, reason} -> raise "Failed to encode TOML: #{inspect(reason)}"
      #       end
      #     rescue
      #       e -> raise "Failed to serialize to TOML: #{inspect(e)}"
      #     end

      #   write_content(file_path, toml_content)
      #   toml_content
      # end

      # Internal helper functions
      defp ensure_content(content, file_path, label) do
        cond do
          is_binary(content) and content != "" ->
            content

          file_path ->
            File.read!(file_path)

          true ->
            raise ArgumentError,
                  "Either content or file_path must be provided for #{label} parsing"
        end
      end

      defp write_content(nil, _str), do: :ok

      defp write_content(path, str) do
        File.write!(to_string(path), str)
      end
    end
  end
end
