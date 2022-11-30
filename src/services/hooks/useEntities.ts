import { useQuery } from "react-query";

export interface IEntity {
  id: string;
  name: string;
  type: string;
  created_at: string;
  group: {
    id: string;
    name: string;
  };
  tasks: string[];
}

export async function getEntities(): Promise<IEntity[]> {
  const data = await fetch("http://localhost:3000/api/entity").then(
    (response) => response.json()
  );
  const allEntities = data.data.map((entity: any) => entity.data);

  const entities = allEntities.map((entity: any) => {
    return {
      ...entity,
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
  const users = (await getEntities()).filter(
    (entity) => entity.type === "user"
  );

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
