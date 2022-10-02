import { HeaderContainer } from "./styles";

export function Header() {
    return(
        <HeaderContainer>
            <a className="sidenav-button" href="#"><i className="material-icons">menu</i></a>
            <img className="logo" src="./logo.png" alt="Logo da TaskGo" />
        </HeaderContainer>
    );
}