defmodule AshSwarmWeb.IssuesLiveTest do
  use AshSwarmWeb.ConnCase

  import Phoenix.LiveViewTest
  import AshSwarm.BitHubFixtures

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  defp create_issues(_) do
    issues = issues_fixture()
    %{issues: issues}
  end

  describe "Index" do
    setup [:create_issues]

    test "lists all issues", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, ~p"/issues")

      assert html =~ "Listing Issues"
    end

    test "saves new issues", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, ~p"/issues")

      assert index_live |> element("a", "New Issues") |> render_click() =~
               "New Issues"

      assert_patch(index_live, ~p"/issues/new")

      assert index_live
             |> form("#issues-form", issues: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert index_live
             |> form("#issues-form", issues: @create_attrs)
             |> render_submit()

      assert_patch(index_live, ~p"/issues")

      html = render(index_live)
      assert html =~ "Issues created successfully"
    end

    test "updates issues in listing", %{conn: conn, issues: issues} do
      {:ok, index_live, _html} = live(conn, ~p"/issues")

      assert index_live |> element("#issues-#{issues.id} a", "Edit") |> render_click() =~
               "Edit Issues"

      assert_patch(index_live, ~p"/issues/#{issues}/edit")

      assert index_live
             |> form("#issues-form", issues: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert index_live
             |> form("#issues-form", issues: @update_attrs)
             |> render_submit()

      assert_patch(index_live, ~p"/issues")

      html = render(index_live)
      assert html =~ "Issues updated successfully"
    end

    test "deletes issues in listing", %{conn: conn, issues: issues} do
      {:ok, index_live, _html} = live(conn, ~p"/issues")

      assert index_live |> element("#issues-#{issues.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#issues-#{issues.id}")
    end
  end

  describe "Show" do
    setup [:create_issues]

    test "displays issues", %{conn: conn, issues: issues} do
      {:ok, _show_live, html} = live(conn, ~p"/issues/#{issues}")

      assert html =~ "Show Issues"
    end

    test "updates issues within modal", %{conn: conn, issues: issues} do
      {:ok, show_live, _html} = live(conn, ~p"/issues/#{issues}")

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Issues"

      assert_patch(show_live, ~p"/issues/#{issues}/show/edit")

      assert show_live
             |> form("#issues-form", issues: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert show_live
             |> form("#issues-form", issues: @update_attrs)
             |> render_submit()

      assert_patch(show_live, ~p"/issues/#{issues}")

      html = render(show_live)
      assert html =~ "Issues updated successfully"
    end
  end
end
