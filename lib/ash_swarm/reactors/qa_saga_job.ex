defmodule AshSwarm.Reactors.QASagaJob do
  use Oban.Worker, queue: :default, max_attempts: 3
  require Logger

  # Adjust this to your actual Repo module
  alias AshSwarm.Repo

  @impl Oban.Worker
  def perform(%Oban.Job{args: %{"question" => question}} = job) do
    result =
      case Reactor.run(AshSwarm.Reactors.QASaga, question: question) do
        {:ok, answer} ->
          Logger.info("QASaga completed successfully: #{answer}")
          answer

        {:error, error} ->
          Logger.error("QASaga encountered an error: #{inspect(error)}")
          error
      end

    # Transform result to something JSON-encodable (like a string)
    encoded_result = encode_result(result)

    job
    |> update_job_meta(%{"result" => encoded_result})

    :ok
  end

  defp encode_result(result) do
    cond do
      is_struct(result) -> inspect(result)
      true -> result
    end
  end

  defp update_job_meta(job, new_meta) do
    meta = Map.merge(job.meta || %{}, new_meta)

    job
    |> Ecto.Changeset.change(%{meta: meta})
    |> Repo.update()
  end
end
