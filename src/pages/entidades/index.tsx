import { EntidadesContainer } from "./styles";

export default function Entidades() {
  return (
    <main className="expanded">
      <EntidadesContainer>
        <h1 className="page-title">Entidades</h1>
        <div className="entity">
          <div className="entity-name">
            <h3>Nome</h3>
          </div>
          <h3 className="entity-type">Tipo</h3>
        </div>
        <hr />
        <div className="entity">
          <div className="entity-name">
            <i className="material-icons">group</i>
            <h3>Test Group 1</h3>
          </div>
          <h3 className="entity-type">Grupo</h3>
        </div>
        <hr />
        <div className="entity">
          <div className="entity-name">
            <i className="material-icons">account_circle</i>
            <h3>Test User 1</h3>
          </div>
          <h3 className="entity-type">Usuário</h3>
        </div>
        <hr />
      </EntidadesContainer>
    </main>
  );
}
