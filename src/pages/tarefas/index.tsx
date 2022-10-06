import Head from "next/head";
import { useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { CreateTaskModal } from "../../components/Modals/TaskModal/CreateTaskModal";
import { EditTaskModal } from "../../components/Modals/TaskModal/TaskModal";
import { getUserById } from "../../services/hooks/useEntities";
import { useTasks } from "../../services/hooks/useTasks";
import { ITask } from "../../services/mirage";
import { TarefasContainer } from "./styles";

export default function Tarefas() {
  const { data: tasks, isLoading, error } = useTasks();

  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const [taskSelected, setTaskSelected] = useState<ITask>();

  function handleEditTask(task: ITask) {
    setTaskSelected(task);
    return setIsEditTaskModalOpen(true);
  }

  return (
    <main className="expanded">
      <Head>
        <title>Tarefas | TaskGo</title>
      </Head>
      <TarefasContainer>
        <h1 className="page-title">Tarefas</h1>

        <button
          className="green-button"
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          <i className="material-icons">add</i>
          Criar Nova
        </button>

        <input type="text" placeholder="Pesquisar Tarefa" />

        {/* Cabeçalho */}
        <div className="task">
          <div className="task-header">
            <h3>Tarefa</h3>
            <i className="material-icons">arrow_downward</i>
          </div>
          <div className="task-header">
            <h3>Estado</h3>
            <i className="material-icons">arrow_downward</i>
          </div>
          <div className="task-header">
            <h3>Usuário</h3>
            <i className="material-icons">arrow_downward</i>
          </div>
          <div className="task-header">
            <h3>Grupo</h3>
            <i className="material-icons">arrow_downward</i>
          </div>
        </div>
        <hr />

        {/* Lista as Tarefas */}
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <h1>Não foi possível carregar a lista de Entidades.</h1>
        ) : (
          <>
            {tasks?.map((task) => (
              <div key={task.id} onClick={() => handleEditTask(task)}>
                <div className="task">
                  <div className="task-description">
                    <h3>{task.description}</h3>
                  </div>
                  <div className={`task-state ${task.state}`}>
                    <h3>{task.state}</h3>
                    {task.state === "afazer" ? (
                      <p>[ {task.time_to_finish} Min ]</p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="task-user">
                    <h3>Usuário</h3>
                  </div>
                  <div className="task-description">
                    <h3>Grupo</h3>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </>
        )}

        <CreateTaskModal
          isOpen={isCreateTaskModalOpen}
          onRequestClose={() => setIsCreateTaskModalOpen(false)}
        />
        <EditTaskModal
          isOpen={isEditTaskModalOpen}
          onRequestClose={() => setIsEditTaskModalOpen(false)}
          task={taskSelected}
        />
      </TarefasContainer>
    </main>
  );
}
