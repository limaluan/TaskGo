import { HeaderContainer } from "./styles";

export function Header() {
    const handleToggleSidenav = () => {
      document.querySelector('.sidenav')?.classList.toggle('on');
      document.querySelector('.expanded')?.classList.toggle('on');
    }
  
    return(
        <HeaderContainer>
            <a onClick={handleToggleSidenav} className="sidenav-button" href="#"><i className="material-icons">menu</i></a>
            <img className="logo" src="./logo.png" alt="Logo da TaskGo" />
        </HeaderContainer>
    );
}
