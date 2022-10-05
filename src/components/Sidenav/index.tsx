import Link from "next/link";
import { SidenavContainer } from "./styles";

export function Sidenav() {
  return (
    <nav className="sidenav on">
      <SidenavContainer>
        {/* Sessão de Gerenciamento */}
        <h3 className="subtitle">GERENCIAMENTO</h3>
        <Link href="/entidades">
          <div className="nav">
            <i className="material-icons">contacts</i>
            <h3>Entidades</h3>
          </div>
        </Link>
        <Link href="/tarefas">
          <div className="nav">
            <i className="material-icons">format_list_bulleted</i>
            <h3>Tarefas</h3>
          </div>
        </Link>

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
