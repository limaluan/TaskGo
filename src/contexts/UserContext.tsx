import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { useTasks } from "../services/hooks/useTasks";
import { IEntity, ITask } from "../services/mirage";

interface IAuthContextData {
  signIn(userId: string): Promise<any>;
  user: IEntity;
  userTasks: ITask[];
  groupTasks: ITask[];
}

interface IUserAuthProps {
  children: ReactNode;
}

export const UserContext = createContext({} as IAuthContextData);

export function UserAuthProvider({ children }: IUserAuthProps) {
  const [user, setUser] = useState({} as IEntity);
  const { data: tasksData } = useTasks();

  const [userTasks, setUsersTasks] = useState<ITask[]>([]);
  const [groupTasks, setGroupTasks] = useState<ITask[]>([]);

  function getUsersTasks() {
    const userTasks = tasksData?.filter((task) => task.user?.id === user.id);

    if (userTasks) {
      return setUsersTasks(userTasks);
    }
  }

  function getTasksByGroup() {
    const groupTasks = tasksData?.filter(
      (task) => task.group?.id === user.group?.id
    );

    if (groupTasks) {
      return setGroupTasks(groupTasks);
    }
  }

  // Atualiza as tarefas do grupo e do usuário sempre que houver mudanças nas tarefas ou usuário
  useEffect(() => {
    getUsersTasks();
    getTasksByGroup();
  }, [tasksData, user]);

  // Faz a autenticação do usuário
  async function signIn(userId: string): Promise<any> {
    try {
      const user = await api.get(`/user/${userId}`);
      setUser(user.data.entity);
    } catch (e: any) {
      throw Error(e);
    }

    return user;
  }

  return (
    <UserContext.Provider value={{ user, signIn, userTasks, groupTasks }}>
      {children}
    </UserContext.Provider>
  );
}
