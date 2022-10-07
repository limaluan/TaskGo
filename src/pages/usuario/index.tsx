import Head from "next/head";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { UsuarioContainer } from "./styles";

export default function Usuario() {
  const { user, userTasks } = useContext(UserContext);

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

        {userTasks.map((task) => (
          <div key={task.id}>
            <div className="task">
              <div className="task-description">
                <h3>{task.description}</h3>
              </div>
              <div className={`task-state ${task.state}`}>
                <h3>{task.state.toUpperCase()}</h3>
                {task.state === "fazer" ? (
                  <p>[ {task.time_to_finish} Min ]</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <hr />
          </div>
        ))}
      </UsuarioContainer>
    </main>
  );
}
