import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { UserTaskModal } from "../../components/Modals/UserModal/UserTaskModal";
import { UserContext } from "../../contexts/UserContext";
import { useTasks } from "../../services/hooks/useTasks";
import { ITask } from "../../services/mirage";
import { UsuarioContainer } from "./styles";

export default function Usuario() {
  const { user, userTasks } = useContext(UserContext);

  const [isUserTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Recebe a tarefa Selecionada pelo usuário
  const [taskSelected, setTaskSelected] = useState<ITask>({} as ITask);

  const { refetch: refetchTasks } = useTasks();

  // Abre o menu de Tarefa com a tarefa selecionada ( taskSelected )
  const handleOpenTask = (task: ITask) => {
    setTaskSelected(task);
    return setIsTaskModalOpen(true);
  };

  useEffect(() => {
    refetchTasks();
  }, []);

  return (
    <main className="expanded">
      <Head>
        <title>Usuário | TaskGo</title>
      </Head>
      <UsuarioContainer>
        <h1 className="page-title">Tarefas de {user.name}</h1>

        {/* Cabeçalho */}
        <div className="entity">
          <div className="entity-name entity-header">
            <h3>Descrição</h3>
            <i className="material-icons">arrow_downward</i>
          </div>
          <div className="entity-name entity-header">
            <h3>Estado</h3>
            <i className="material-icons">remove</i>
          </div>
        </div>
        <hr />

        {/* Lista as tarefas do usuário */}
        {userTasks.length >= 1 ? (
          userTasks.map((task) => (
            <div key={task.id} onClick={() => handleOpenTask(task)}>
              <div className="task">
                <div className="task-description">
                  <h3>{task.description}</h3>
                </div>
                <div className={`task-state ${task.state}`}>
                  <h3>{task.state.toUpperCase()}</h3>
                  {task.state === "fazer" || task.state === "fazendo" ? (
                    <p>[ {task.reimaing_time} Min ]</p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <h2>Não foi possível encontrar tarefas do usuário.</h2>
        )}
        <UserTaskModal
          isOpen={isUserTaskModalOpen}
          onRequestClose={() => setIsTaskModalOpen(false)}
          task={taskSelected}
        />
      </UsuarioContainer>
    </main>
  );
}
