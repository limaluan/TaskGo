import { ITask } from "./../mirage/index";
import { useQuery } from "react-query";

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
