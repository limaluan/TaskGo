import { useQuery } from "react-query";
import { api } from "../api";
import { IEntity } from "../mirage";

export async function getEntities(): Promise<IEntity[]> {
  const { data } = await api.get("/entities");

  const entities = data.entities.map((entity: any) => {
    return {
      ...entity,
      createdAt: new Date(entity.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return entities;
}

// Retorna todos os GRUPOS
export async function getGroups() {
  const groups = (await getEntities()).filter(
    (entity) => entity.type === "group"
  );

  return groups;
}

// Retorna todos os USUÁRIOS
export async function getUsers(): Promise<IEntity[]> {
  const { data } = await api.get("/users");

  const users = data.entities;

  return users;
}

// Retorna todas entidades ( Direto pelo cache )
export function useEntities() {
  return useQuery("entities", getEntities, {
    staleTime: 1000 * 5 /* 5 Segundos */,
  });
}

// Retorna todos usuários ( Direto pelo cache )
export function useUsers() {
  return useQuery("users", getUsers, {
    staleTime: 1000 * 5 /* 5 Segundos */,
  });
}
