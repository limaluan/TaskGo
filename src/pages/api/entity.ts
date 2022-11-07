import { IEntity } from './../../services/mirage/index';
import { NextRequest, NextResponse } from "next/server";
import fauna from "../../services/fauna";
import { query as q } from "faunadb";

export default async function entity(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const data = req.body;

    // if (data) {
    //   if (data.name === "") {
    //     throw Error("A Entidade deve conter um nome.");
    //   }

    //   if (!data.id || schema.findBy("entity", { id: data.id })) {
    //     throw Error("ID Inválido ou já está em uso.");
    //   }

    //   if (data.type === "user" && !data.group.id) {
    //     throw Error("Deve associar Usuário com um Grupo.");
    //   }
    // }

    await fauna.query(
      q.Create(q.Collection("entities"), {
        data,
      })
    );

    await res.json();
  }
}
