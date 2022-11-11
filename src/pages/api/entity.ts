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
  // Método GET que retorna todos as Entidades
  if (req.method === "GET") {
    const entities = await fauna.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("entities"))),
        q.Lambda((entity) => q.Get(entity))
      )
    );

    return res.status(200).json(entities);
  }

  // Método POST que cria uma nova entidade
  if (req.method === "POST") {
    const data = req.body;
    const entity: IEntity = { ...data } as IEntity;
    let entityInDb: IEntityInDb = {} as IEntityInDb;

    await fauna
      .query(q.Get(q.Match(q.Index("entity_by_id"), q.Casefold(entity.id))))
      .then((entity) => (entityInDb = entity as IEntityInDb))
      .catch(() => {
        return;
      });

    // Verifica se a entidade possui nome
    if (entity.name === "") {
      return res.status(400).json({ error: "A Entidade deve conter um nome." });
    }

    // Verifica se existe alguma entidade com o mesmo ID
    if (!entity.id || entityInDb?.data) {
      return res.status(400).json({ error: "ID Inválido ou já está em uso." });
    }

    // Verifica, caso a entidade for um usuário, se está asssociado a algum grupo
    if (entity.type === "user" && !entity.group.id) {
      return res
        .status(400)
        .json({ error: "Deve associar Usuário com um Grupo." });
    }

    // Cria a entidade no banco de dados
    await fauna.query(
      q.Create(q.Collection("entities"), {
        data: { ...data, created_at: Date.now() },
      })
    );

    return res.status(202).json({ message: "Entidade Criada com Êxito." });
  }

  // Método DELETE que deleta uma entidade
  if (req.method === "DELETE") {
    const entity = req.body;

    await fauna
      .query(q.Get(q.Match(q.Index("entity_by_id"), q.Casefold(entity.id))))
      .then(
        async (entity: any) => await fauna.query(q.Delete(q.Ref(entity.ref)))
      )
      .catch((error) => {
        return res.status(400).json({ error });
      });

    return res.status(202).json({ message: "Entidade deletada com Êxito." });
  }
}
