defmodule AshSwarmTest.DSLModelTest do
  use ExUnit.Case, async: true

  alias AshSwarm.DSLModel

  describe "from_map/1" do
    test "creates a struct from a valid map" do
      data = %{"name" => "Example", "description" => "A test model", "count" => 123}
      model = DSLModel.from_map(data)
      assert model.name == "Example"
      assert model.description == "A test model"
      assert model.count == 123
    end

    test "raises an error when 'name' is missing" do
      data = %{"description" => "No name here"}

      assert_raise RuntimeError, ~r/Field 'name' is required/, fn ->
        DSLModel.from_map(data)
      end
    end
  end

  describe "to_json/2 and from_json/2" do
    test "round trips a struct to JSON and back" do
      model_in = %DSLModel{name: "RoundTrip", description: "Testing JSON", count: 42}

      json = DSLModel.to_json(model_in)
      assert is_binary(json)
      assert String.contains?(json, "RoundTrip")

      model_out = DSLModel.from_json(json)
      assert model_out.name == "RoundTrip"
      assert model_out.description == "Testing JSON"
      assert model_out.count == 42
    end
  end

  describe "to_yaml/2 and from_yaml/2" do
    test "round trips a struct to YAML and back" do
      model_in = %DSLModel{name: "YamlTest", description: "Testing YAML", count: 100}

      yaml = DSLModel.to_yaml(model_in)
      assert is_binary(yaml)
      assert String.contains?(yaml, "YamlTest")

      model_out = DSLModel.from_yaml(yaml)
      assert model_out.name == "YamlTest"
      assert model_out.description == "Testing YAML"
      assert model_out.count == 100
    end
  end

  # describe "to_toml/2 and from_toml/2" do
  #   test "round trips a struct to TOML and back" do
  #     model_in = %DSLModel{name: "TomlTest", description: "Testing TOML", count: 777}

  #     toml_str = DSLModel.to_toml(model_in)
  #     assert is_binary(toml_str)
  #     assert String.contains?(toml_str, "TomlTest")

  #     model_out = DSLModel.from_toml(toml_str)
  #     assert model_out.name == "TomlTest"
  #     assert model_out.description == "Testing TOML"
  #     assert model_out.count == 777
  #   end
  # end

  describe "YAML file I/O" do
    test "writes YAML to a file and reads it back" do
      model_in = %DSLModel{name: "FileYAML", description: "YAML file test", count: 123}
      file_path = "test_output.yaml"

      # Remove the file if it exists
      File.rm(file_path)

      # Write YAML to disk
      DSLModel.to_yaml(model_in, file_path)
      assert File.exists?(file_path)

      # Read YAML from disk and decode
      model_out = DSLModel.from_yaml(nil, file_path)
      assert model_out.name == "FileYAML"
      assert model_out.description == "YAML file test"
      assert model_out.count == 123

      # Clean up
      File.rm(file_path)
    end
  end

  describe "file I/O" do
    test "writes JSON to a file and reads it back" do
      model_in = %DSLModel{name: "FileIO", description: "File test", count: 999}
      file_path = "test_output.json"

      File.rm(file_path)
      DSLModel.to_json(model_in, file_path)
      assert File.exists?(file_path)

      model_out = DSLModel.from_json(nil, file_path)
      assert model_out.name == "FileIO"
      assert model_out.description == "File test"
      assert model_out.count == 999

      File.rm(file_path)
    end
  end
end
