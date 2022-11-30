import Head from "next/head";
import { useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { CreateTaskModal } from "../../components/Modals/TaskModal/CreateTaskModal";
import { EditTaskModal } from "../../components/Modals/TaskModal/TaskModal";
import { ITask, useTasks } from "../../services/hooks/useTasks";
import { convertMsToTime } from "../../services/utils";
import { TarefasContainer } from "./styles";

export default function Tarefas() {
  const { data: tasks, isLoading, error } = useTasks();

  // Estados de Controle de Modal
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  // Tarefa Selecionada para o Modal
  const [taskSelected, setTaskSelected] = useState<ITask>();

  function handleEditTask(task: ITask) {
    setTaskSelected(task);
    return setIsEditTaskModalOpen(true);
  }

  const [search, setSearch] = useState("");

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

        <input
          type="text"
          placeholder="Pesquisar Tarefa"
          className="task-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Cabeçalho */}
        <div className="task">
          <div className="task-header">
            <h3>Tarefa</h3>
            <i className="material-icons">arrow_downward</i>
          </div>
          <div className="task-header">
            <h3>Estado</h3>
            <i className="material-icons">remove</i>
          </div>
          <div className="task-header">
            <h3>Usuário</h3>
            <i className="material-icons">remove</i>
          </div>
          <div className="task-header">
            <h3>Grupo</h3>
            <i className="material-icons">remove</i>
          </div>
        </div>
        <hr />

        {/* Lista as Tarefas */}
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <h1 className="not-found">
            Não foi possível carregar a lista de Entidades.
          </h1>
        ) : (
          <>
            {tasks!.length >= 1 ? (
              tasks
                ?.filter((task) => {
                  // Filtra de acordo com a busca do usuário
                  return search.toLowerCase() === ""
                    ? task
                    : task.description
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                        task.user?.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        task.group?.name
                          .toLowerCase()
                          .includes(search.toLowerCase());
                })
                .map((task) => (
                  <div key={task.id} onClick={() => handleEditTask(task)}>
                    <div className="task">
                      <div className="task-description">
                        <h3>{task.description}</h3>
                      </div>
                      <div className={`task-state ${task.state}`}>
                        <h3>{task.expiration_date - new Date().getTime() < 0 ? "Atrasada" : "Fazer"}</h3>
                        {task.state === "fazer" || task.state === "fazendo" ? (
                          <p></p>
                        ) : (
                          <> [ {convertMsToTime(task.expiration_date - new Date().getTime())} ] </>
                        )}
                      </div>
                      <div className="task-user">
                        <h3>{task.user?.name ? task.user?.name : "---"}</h3>
                      </div>
                      <div className="task-description">
                        <h3>{task.group?.name ? task.group?.name : "---"}</h3>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
            ) : (
              <h1 className="not-found">Não foi possível encontrar tarefas.</h1>
            )}
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
