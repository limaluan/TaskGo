import { useQuery } from "react-query";
import { api } from "../api";
import { IEntity } from "../mirage";

export async function getEntities(): Promise<IEntity[]> {
  const { data } = await api.get("/entities");

  const entities = data.entities.map((entity: any) => {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      createdAt: new Date(entity.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      group: entity.group,
      tasks: entity.tasks,
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

export async function getUsers() {
  const users = (await getEntities()).filter(
    (entity) => entity.type !== "group"
  );

  return users;
}

// Retorna todas entidades ( Direto pelo cache )
export function useEntities() {
  return useQuery("users", getEntities, {
    staleTime: 1000 * 5 /* 5 Segundos */,
  });
}
