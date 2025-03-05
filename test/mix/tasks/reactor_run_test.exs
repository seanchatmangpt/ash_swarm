defmodule Mix.Tasks.Reactor.Gen.ReactorRunTest do
  use ExUnit.Case, async: false
  import ExUnit.CaptureIO

  test "runs mix reactor.gen.reactor but does not proceed with changes" do
    # ✅ Simulate pressing "n" to decline changes
    output =
      capture_io("n\n", fn ->
        Mix.Task.rerun("reactor.gen.reactor", [
          "MyApp.CheckoutReactor",
          "--input",
          "email:string,password:string",
          "--step",
          "register_user:MyApp.RegisterUserStep,create_stripe_customer:MyApp.CreateStripeCustomerStep",
          "--return",
          "register_user"
        ])
      end)

    # ✅ Ensure that Igniter asks for confirmation
    assert output =~ "Proceed with changes?"

    # ✅ Ensure that no files are created (Igniter should abort)
    assert output =~ "Create: lib/my_app/checkout_reactor.ex"
    assert output =~ "Create: lib/my_app/register_user_step.ex"
    assert output =~ "Create: lib/my_app/create_stripe_customer_step.ex"
  end
end
