import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --background: #F0F0F5;
        --title: #13131A;
        --subtitle: #41414D;
        --text: #737380;
        --subtext: #A8A8B3;
        --gray-light: #DCDCE6;
        --green: #6ce679;
    }

    * {
        margin: 0;
        padding: 0;
        text-decoration: none;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
        font-family: 'Roboto', sans-serif;
        color: var(--title);
    }

    body {
        background-color: var(--background);
    }

    button {
      border: none;
      border-radius: 0.5rem;
      font-family: 'Poppins', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      transition: filter 0.2s;

      :hover {
        cursor: pointer;
        filter: brightness(0.9);
      }
    }
    
    .sidenav {
      transform: translateX(-100%);
      transition: transform 0.5s;
      position: absolute;
      z-index: 1;
    }
    
    .sidenav.on {
      transform: translateX(0%);
    }

    .expanded { /* Classe usada para indicar quais elementos irão se expandir ao recolher a sidenav */
      width: calc(100% - 24rem);
      float: right;
      transition: width 0.5s;
    }

    .expanded.on {
      width: 100%;
    }

    @media (max-width: 540px) {
      .expanded {
        width: 100%;
      }
    }
`;
