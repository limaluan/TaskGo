import Head from "next/head";
import { EntidadesContainer } from "./styles";

export default function Entidades() {
  return (
    <main className="expanded">
      <Head>
        <title>Entidades | TaskGo</title>
      </Head>
      <EntidadesContainer>
        <h1 className="page-title">Entidades</h1>
        <button className="create-button">
          <i className="material-icons">add</i>
          Criar Nova
        </button>

        <div className="entity">
          <div className="entity-name">
            <h3>Nome</h3>
          </div>
          <h3>Tipo</h3>
        </div>
        <hr />
        <div className="entity">
          <div className="entity-name">
            <i className="material-icons">group</i>
            <h3>Test Group 1</h3>
          </div>
          <div className="entity-type">
            <h3>Grupo</h3>
            <div className="entity-options">
              <button>
                <i className="material-icons">edit</i>
                <span>Editar</span>
              </button>
              <button>
                <i className="material-icons">delete</i>
                <span>Deletar</span>
              </button>
            </div>
          </div>
          <div className="entity-options"></div>
        </div>
        <hr />

        <div className="entity">
          <div className="entity-name">
            <i className="material-icons">account_circle</i>
            <h3>Test User 1</h3>
          </div>
          <div className="entity-type">
            <h3>Usuário</h3>
            <div className="entity-options">
              <button>
                <i className="material-icons">edit</i>
                <span>Editar</span>
              </button>
              <button>
                <i className="material-icons">delete</i>
                <span>Deletar</span>
              </button>
            </div>
          </div>
          <div className="entity-options"></div>
        </div>
        <hr />
      </EntidadesContainer>
    </main>
  );
}
