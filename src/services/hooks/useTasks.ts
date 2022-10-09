import { ITask } from "./../mirage/index";
import { useQuery } from "react-query";
import { api } from "../api";

export async function getTasks(): Promise<ITask[]> {
  const { data } = await api.get("/tasks");

  const tasks = data.tasks.map((task: ITask) => {
    // Tratamento para obter o tempo restante parta fazer a tarefa
    const date1: any = new Date();
    const date2: any = new Date(task.time_to_finish);
    const diffTime = Math.ceil(date2 - date1);

    let newState;

    if (
      (task.state === "fazer" || task.state === "fazendo") &&
      Math.floor(diffTime) <= 1
    ) {
      console.log(task.state);
      console.log(Math.floor(diffTime / (1000 * 60)));
      newState = "atrasada";
    } else {
      newState = task.state;
    }

    return {
      ...task,
      id: task.id,
      description: task.description,
      state: newState,
      reimaing_time: Math.floor(diffTime / (1000 * 60)),
    };
  });

  return tasks;
}

export async function getTasksByGroup(groupId: string) {
  const tasks = (await getTasks()).filter((task) => task.group.id === groupId);

  return tasks;
}

// Retorna todas tarefas ( Direto pelo cache )
export function useTasks() {
  return useQuery("tasks", getTasks, {
    staleTime: 1000 * 5 /* 5 Segundos */,
    refetchInterval: 1000 * 60 /* 1 Minuto */,
  });
}
