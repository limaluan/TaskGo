import { useQuery } from "react-query";

export interface ITask {
  id: string;
  description: string;
  state: string;
  user: {
    id: string;
    name: string;
  };
  group: {
    id: string;
    name: string;
  };
  created_at: number;
  time_to_finish: string;
  reimaing_time: string;
  expiration_date: number;
}

export async function getTasks(): Promise<ITask[]> {
  const data = await fetch("http://localhost:3000/api/task").then((response) =>
    response.json()
  );

  const allTasks = data.data.map((taskData: any) => taskData.data);

  const tasks = allTasks.map((task: ITask) => {
    return { ...task };
  });

  return tasks;
}

// Retorna todas tarefas ( Direto pelo cache )
export function useTasks() {
  return useQuery("tasks", getTasks);
}
