import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { UserAuthenticateModal } from "../Modals/UserModal/UserAuthenticateModal";
import { SidenavContainer } from "./styles";

export function Sidenav() {
  const [isUserAuthModalOpen, setIsUserAuthModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { push: redirectsTo } = useRouter();

  // Estado que vai receber para qual página o usuário será redirecionado
  const [target, setTarget] = useState("");

  // Faz a autenticação do usuário e redireciona para a Página de Usuário
  const handleUserLogin = () => {
    setTarget("usuario");

    if (!user.id) {
      return setIsUserAuthModalOpen(true);
    }

    return redirectsTo(`/usuario`);
  };

  // Faz a autenticação do usuário e redireciona para a Página do Grupo
  const handleGroupLogin = () => {
    setTarget("grupo");

    if (!user.id) {
      return setIsUserAuthModalOpen(true);
    }

    return redirectsTo(`/grupo`);
  };

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
        {/* Link para a Página de Usuário */}
        <a href="#" className="nav" onClick={handleUserLogin}>
          <i className="material-icons">account_circle</i>
          <h3>Usuário</h3>
        </a>
        {/* Link para a Página do Grupo */}
        <a href="#" className="nav" onClick={handleGroupLogin}>
          <i className="material-icons">group</i>
          <h3>Grupo</h3>
        </a>
      </SidenavContainer>

      <UserAuthenticateModal
        isOpen={isUserAuthModalOpen}
        onRequestClose={() => setIsUserAuthModalOpen(false)}
        redirectsTarget={target}
      />
    </nav>
  );
}
