import Head from "next/head";
import { useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { CreateTaskModal } from "../../components/TaskModal/CreateTaskModal";
import { useTasks } from "../../services/hooks/useTasks";
import { TarefasContainer } from "./styles";

export default function Tarefas() {
  const { data: tasks, isLoading, error } = useTasks();

  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

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
              <div key={task.id}>
                <div className="task">
                  <div className="task-description">
                    <h3>{task.description}</h3>
                  </div>
                  <div className="task-description">
                    <h3>{task.state}</h3>
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
      </TarefasContainer>
    </main>
  );
}
