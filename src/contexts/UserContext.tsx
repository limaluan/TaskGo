import { createContext, ReactNode, useLayoutEffect, useState } from "react";
import { api } from "../services/api";
import { useTasks } from "../services/hooks/useTasks";
import { IEntity, ITask } from "../services/mirage";

interface IAuthContextData {
  signIn(userId: string): Promise<any>;
  user: IEntity;
  userTasks: ITask[];
}

interface IUserAuthProps {
  children: ReactNode;
}

export const UserContext = createContext({} as IAuthContextData);

export function UserAuthProvider({ children }: IUserAuthProps) {
  const [user, setUser] = useState({} as IEntity);
  const { data: tasksData } = useTasks();

  const [userTasks, setUsersTasks] = useState<ITask[]>([]);

  function getUsersTasks() {
    const tasks = tasksData?.filter((task) => task.user?.id === user.id);

    if (tasks) {
      return setUsersTasks(tasks);
    }
  }

  useLayoutEffect(() => {
    getUsersTasks();
  }, [tasksData, user]);

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
    <UserContext.Provider value={{ user, signIn, userTasks }}>
      {children}
    </UserContext.Provider>
  );
}
