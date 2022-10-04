import Head from "next/head";
import { EntidadesContainer } from "./styles";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { useEntities } from "../../services/hooks/useEntities";
import { CreateEntityModal } from "../../components/CreateEntityModal";
import { useState } from "react";

export default function Entidades() {
  const { data, isLoading, error } = useEntities();

  const [isEntityModalOpen, setEntityModalOpen] = useState(false);

  return (
    <main className="expanded">
      <Head>
        <title>Entidades | TaskGo</title>
      </Head>
      <EntidadesContainer>
        <h1 className="page-title">Entidades</h1>
        <button
          className="create-button"
          onClick={() => setEntityModalOpen(true)}
        >
          <i className="material-icons">add</i>
          Criar Nova
        </button>

        {/* Cabeçalho */}
        <div className="entity">
          <div className="entity-name">
            <h3>Nome</h3>
            <i className="material-icons">arrow_downward</i>
          </div>
          <h3>Tipo</h3>
        </div>
        <hr />

        {/* Lista todos usuários */}
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <h1>Não foi possível carregar a lista de Entidades.</h1>
        ) : (
          <>
            {data?.map((entity: any) => (
              <>
                <div className="entity">
                  <div className="entity-name">
                    <i className="material-icons">
                      {entity.type === "group" ? "group" : "account_circle"}
                    </i>
                    <h3>{entity.name}</h3>
                  </div>
                  <div className="entity-type">
                    <h3>{entity.type === "group" ? "Grupo" : "Usuário"}</h3>
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
              </>
            ))}
          </>
        )}

        <CreateEntityModal
          isOpen={isEntityModalOpen}
          onRequestClose={() => setEntityModalOpen(false)}
        />
      </EntidadesContainer>
    </main>
  );
}
