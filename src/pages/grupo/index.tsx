import Head from "next/head";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { GrupoContainer } from "./styles";

export default function Usuario() {
  const { user, groupTasks } = useContext(UserContext);

  return (
    <main className="expanded">
      <Head>
        <title>Usuário | TaskGo</title>
      </Head>
      <GrupoContainer>
        <h1 className="page-title">Tarefas do Grupo {user.group.name}</h1>

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
          <div className="entity-name entity-header">
            <h3>Usuário</h3>
            <i className="material-icons">arrow_downward</i>
          </div>
        </div>
        <hr />

        {groupTasks.length >= 1 ? (
          groupTasks.map((task) => (
            <div key={task.id}>
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
                <div className="task-user">
                  <h3>{task.user?.name ? task.user?.name : "---"}</h3>
                </div>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <h2>Não foi possível encontrar tarefas do usuário.</h2>
        )}
      </GrupoContainer>
    </main>
  );
}
