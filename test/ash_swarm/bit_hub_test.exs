defmodule AshSwarm.BitHubTest do
  use AshSwarm.DataCase

  alias AshSwarm.BitHub

  describe "issues" do
    alias AshSwarm.BitHub.Issues

    import AshSwarm.BitHubFixtures

    @invalid_attrs %{}

    test "list_issues/0 returns all issues" do
      issues = issues_fixture()
      assert BitHub.list_issues() == [issues]
    end

    test "get_issues!/1 returns the issues with given id" do
      issues = issues_fixture()
      assert BitHub.get_issues!(issues.id) == issues
    end

    test "create_issues/1 with valid data creates a issues" do
      valid_attrs = %{}

      assert {:ok, %Issues{} = issues} = BitHub.create_issues(valid_attrs)
    end

    test "create_issues/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = BitHub.create_issues(@invalid_attrs)
    end

    test "update_issues/2 with valid data updates the issues" do
      issues = issues_fixture()
      update_attrs = %{}

      assert {:ok, %Issues{} = issues} = BitHub.update_issues(issues, update_attrs)
    end

    test "update_issues/2 with invalid data returns error changeset" do
      issues = issues_fixture()
      assert {:error, %Ecto.Changeset{}} = BitHub.update_issues(issues, @invalid_attrs)
      assert issues == BitHub.get_issues!(issues.id)
    end

    test "delete_issues/1 deletes the issues" do
      issues = issues_fixture()
      assert {:ok, %Issues{}} = BitHub.delete_issues(issues)
      assert_raise Ecto.NoResultsError, fn -> BitHub.get_issues!(issues.id) end
    end

    test "change_issues/1 returns a issues changeset" do
      issues = issues_fixture()
      assert %Ecto.Changeset{} = BitHub.change_issues(issues)
    end
  end
end
