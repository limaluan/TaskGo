import { IEntity } from "./../../services/mirage/index";
import fauna from "../../services/fauna";
import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";

interface IEntityInDb {
  ref: any; // Temporariamente Inutilizado
  ts: number;
  data: {
    name: string;
    type: string;
    id: string;
    group: {
      id: string;
      name: string;
    };
  };
}

export default async function entity(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;
    const entity: IEntity = { ...data } as IEntity;
    let entityInDb: IEntityInDb = {} as IEntityInDb;

    await fauna
      .query(q.Get(q.Match(q.Index("entity_by_id"), q.Casefold(entity.id))))
      .then((entity) => (entityInDb = entity as IEntityInDb))
      .catch((error) => {
        return;
      });

    if (entity.name === "") {
      return res.status(400).json({ error: "A Entidade deve conter um nome." });
    }

    if (!entity.id || entityInDb?.data) {
      return res.status(400).json({ error: "ID Inválido ou já está em uso." });
    }

    if (entity.type === "user" && !entity.group.id) {
      return res.status(400).json({ error: "Deve associar Usuário com um Grupo." });
    }

    await fauna.query(
      q.Create(q.Collection("entities"), {
        data,
      })
    );

    return res.status(202).json({ message: "Entidade Criada com Êxito." });
  }
}
