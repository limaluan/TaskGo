import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { getTasksByUser, useTasks } from "../services/hooks/useTasks";
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

  useEffect(() => {
    getTasksByUser(user.id).then((response) => {
      setUsersTasks(response);
    });
  }, [tasksData]);

  async function signIn(userId: string): Promise<any> {
    try {
      const user = await api.get(`/user/${userId}`);
      setUser(user.data.entity);
    } catch (e: any) {
      return e.response.data.message;
    }
    
    return user;
  }

  return (
    <UserContext.Provider value={{ user, signIn, userTasks }}>
      {children}
    </UserContext.Provider>
  );
}
