import { NextApiRequest, NextApiResponse } from "next";
import fauna from "../../services/fauna";
import { query as q } from "faunadb";
import { ITask } from "../../services/hooks/useTasks";

export default async function task(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return fauna
      .query(
        q.Map(
          q.Paginate(q.Documents(q.Collection("tasks"))),
          q.Lambda((entity) => q.Get(entity))
        )
      )
      .then((tasks) => res.json(tasks))
      .catch((error) => res.status(400).json({ error }));
  }

  if (req.method === "POST") {
    const task: ITask = req.body;

    if (!task.description) {
      return res
        .status(400)
        .json({ error: "A tarefa deve conter uma descrição." });
    }

    if (!task.group?.id) {
      return res
        .status(400)
        .json({ error: "A tarefa deve estar associada a um grupo." });
    }

    fauna
      .query(q.Create(q.Collection("tasks"), { data: task }))
      .then((response) => res.status(202).json(response))
      .catch((error) => res.status(400).json(error));
  }

  if (req.method === "DELETE") {
    const taskId = req.body;

    await fauna
      .query(q.Get(q.Match(q.Index("task_by_id"), q.Casefold(taskId))))
      .then(
        async (entity: any) => await fauna.query(q.Delete(q.Ref(entity.ref)))
      )
      .catch((error) => {
        return res.status(400).json({ error });
      });

    return res.status(202).json({ message: "Entidade deletada com Êxito." });
  }
}
