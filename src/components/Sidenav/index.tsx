import { SidenavContainer } from "./styles";

export function Sidenav() {
  return (
    <nav className="sidenav on">
      <SidenavContainer>
        {/* Sessão de Gerenciamento */}
        <h3 className="subtitle">GERENCIAMENTO</h3>
        <a href="/entidades" className="nav">
          <i className="material-icons">contacts</i>
          <h3>Entidades</h3>
        </a>
        <a href="#" className="nav">
          <i className="material-icons">format_list_bulleted</i>
          <h3>Tarefas</h3>
        </a>

        {/* Sessão de Usuário */}
        <h3 className="subtitle">USUÁRIO</h3>
        <a href="#" className="nav">
          <i className="material-icons">account_circle</i>
          <h3>Usuário</h3>
        </a>
        <a href="#" className="nav">
          <i className="material-icons">group</i>
          <h3>Grupo</h3>
        </a>
      </SidenavContainer>
    </nav>
  );
}
