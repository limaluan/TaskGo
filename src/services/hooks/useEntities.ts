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

export async function getGroups() {
  const groups = (await getEntities()).filter(
    (entity) => entity.type === "group"
  );

  return groups;
}

export async function getGroupById(groupId: string) {
  const groups = (await getEntities()).filter(
    (entity) => entity.type === "group" && entity.id === groupId
  );

  return groups;
}

export async function getUsers() {
  const users = (await getEntities()).filter(
    (entity) => entity.type !== "group"
  );

  return users;
}

export async function getUserById(userId: string) {
  const users = (await getEntities()).filter(
    (entity) => entity.type !== "group" && entity.id === userId
  );

  return users;
}

// Retorna todas entidades ( Direto pelo cache )
export function useEntities() {
  return useQuery("users", getEntities, {
    staleTime: 1000 * 5 /* 5 Segundos */,
  });
}
