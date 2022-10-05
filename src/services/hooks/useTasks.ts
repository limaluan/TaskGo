import { ITask } from './../mirage/index';
import { useQuery } from "react-query";
import { api } from "../api";

export async function getTasks(): Promise<ITask[]> {
  const { data } = await api.get("/tasks");

  const tasks = data.tasks.map((task: any) => {
    return {
      id: task.id,
      description: task.description,
      state: task.state,
    };
  });

  return tasks;
}

// Retorna todas tarefas ( Direto pelo cache )
export function useTasks() {
  return useQuery("tasks", getTasks, {
    staleTime: 1000 * 5 /* 5 Segundos */,
  });
}
