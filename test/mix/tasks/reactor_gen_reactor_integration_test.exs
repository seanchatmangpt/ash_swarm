# defmodule Mix.Tasks.Reactor.Gen.ReactorIntegrationTest do
#   use ExUnit.Case, async: false # Prevent parallel file writes
#   import ExUnit.CaptureIO

#   setup do
#     tmp_dir = Path.join(System.tmp_dir!(), "reactor_test")
#     File.rm_rf!(tmp_dir) # Clean previous runs
#     File.mkdir_p!(tmp_dir)
#     {:ok, tmp_dir: tmp_dir}
#   end

#   test "generates Reactor module and steps", %{tmp_dir: tmp_dir} do
#     in_tmp(tmp_dir, fn ->
#       output = capture_io(fn ->
#         System.cmd("mix", [
#           "reactor.gen.reactor",
#           "MyApp.CheckoutReactor",
#           "--inputs", "email:string,password:string",
#           "--steps", "register_user:MyApp.RegisterUserStep,charge_card:Payments.ChargeCardStep",
#           "--return", "register_user"
#         ])
#       end)

#       # Verify console output
#       assert output =~ "Generating Step module: Elixir.MyApp.RegisterUserStep"
#       assert output =~ "Create: lib/my_app/checkout_reactor.ex"

#       # Verify files exist
#       assert File.exists?("lib/my_app/checkout_reactor.ex")
#       assert File.exists?("lib/my_app/register_user_step.ex")

#       # Verify Reactor module content
#       reactor_content = File.read!("lib/my_app/checkout_reactor.ex")
#       assert reactor_content =~ "defmodule MyApp.CheckoutReactor"
#       assert reactor_content =~ "step :register_user, MyApp.RegisterUserStep"
#     end)
#   end

#   test "skips existing modules when --ignore-if-exists is passed", %{tmp_dir: tmp_dir} do
#     in_tmp(tmp_dir, fn ->
#       File.write!("lib/my_app/checkout_reactor.ex", "defmodule MyApp.CheckoutReactor do end")

#       output = capture_io(fn ->
#         System.cmd("mix", [
#           "reactor.gen.reactor",
#           "MyApp.CheckoutReactor",
#           "--inputs", "email:string,password:string",
#           "--steps", "register_user:MyApp.RegisterUserStep",
#           "--return", "register_user",
#           "--ignore-if-exists"
#         ])
#       end)

#       assert output =~ "Skipping Reactor generation: MyApp.CheckoutReactor already exists."
#     end)
#   end
# end
