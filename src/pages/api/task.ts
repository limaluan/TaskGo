import { ITask } from './../../services/mirage/index';
import { NextApiRequest, NextApiResponse } from "next";
import fauna from "../../services/fauna";
import { query as q } from "faunadb";

export default async function task(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const task: ITask = req.body;

    if (!task.description) {
      return res.status(400).json({error: "A tarefa deve conter uma descrição."});
    }

    if (!task.group?.id) {
      return res.status(400).json({error: "A tarefa deve estar associada a um grupo."});
    }
    
    fauna
      .query(q.Create(q.Collection("tasks"), { data: task }))
      .then((response) => res.status(202).json(response))
      .catch((error) => res.status(400).json(error));
  }
}
