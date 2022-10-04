import Head from "next/head";
import { EntidadesContainer } from "./styles";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { useEntities } from "../../services/hooks/useEntities";
import { CreateEntityModal } from "../../components/CreateEntityModal";
import { useEffect, useState } from "react";
import { IEntity } from "../../services/mirage";

export default function Entidades() {
  const { data, isLoading, error } = useEntities(); // Pega os dados da entidade do Cache

  const [isEntityModalOpen, setEntityModalOpen] = useState(false);
  const [entities, setEntities] = useState<IEntity[]>([]);

  // Responsável por ordenar a lista por ordem alfabética ou não
  function orderByAlphabet(isOrderByAlphabet: boolean) {
    if (!isOrderByAlphabet) {
      const ordered = data!.sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        }
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        }
        return 0;
      });
      setEntities(ordered);
    } else if (isOrderByAlphabet) {
      const ordered = data!.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return -1;
        }
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return 1;
        }
        return 0;
      });
      setEntities(ordered);
    }
  }

  useEffect(() => {
    orderByAlphabet(true); // Inicia a lista de entidades por ordem alfabética
  }, [data]);

  const [orderByName, setOrderByName] = useState(true); // Variável alterna se o usuário clicar no Nome
  const [orderByType, setOrderByType] = useState(false); // Variável alterna se o usuário clicar no Tipo

  const handleOrderEntities = (order: string) => {
    orderByAlphabet(true);

    if (order === "name") { // Se o usuário clicou no Nome:
      setOrderByName(!orderByName);
      setOrderByType(false);

      orderByAlphabet(orderByName);
    }
    if (order === "type") { // Se o usuário clicou no Tipo:
      if (!orderByType) {
        setOrderByType(true);
        setOrderByName(true);

        //Ordena pelo tipo de Entidade 
        const ordered = data!.sort((a) => {
          if (a.type === "user") {
            return -1;
          }
          if (a.type !== "user") {
            return 1;
          }
          return 0;
        });
        setEntities(ordered);
      } else if (orderByType) {
        setOrderByType(false);
        setOrderByName(false);
      }
    }
  };

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
          <div
            className="entity-name entity-header"
            onClick={() => handleOrderEntities("name")}
          >
            <h3>Nome</h3>
            {orderByName ? (
              <i className="material-icons">arrow_downward</i>
            ) : (
              <i className="material-icons">arrow_upward</i>
            )}
          </div>
          <div
            className="entity-name entity-header"
            onClick={() => handleOrderEntities("type")}
          >
            <h3>Tipo</h3>
            {orderByType ? (
              <i className="material-icons">arrow_downward</i>
            ) : (
              <i className="material-icons">remove</i>
            )}
          </div>
        </div>
        <hr />

        {/* Lista todos usuários */}
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <h1>Não foi possível carregar a lista de Entidades.</h1>
        ) : (
          <>
            {entities.map((entity: any) => (
              <div key={entity.id}>
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
              </div>
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
