import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }

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
    
    input {
      border: 1px solid var(--gray-light);
      border-radius: 1rem;
      padding: 1.5rem;
      font-size: 1.5rem;
      outline: none;
      
      ::placeholder {
        font-family: 'Poppins', sans-serif;
      }
    }

    select {
      border: none;
      font-size: 1.6rem;
      outline: none;
      padding: 1rem;

      cursor: pointer;
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
    
    .modal-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 10000;
    display: grid;
    place-items: center;
  }

  .modal-content {
    max-width: 40vw;
    min-width: 30vw;
    height: fit-content;
    position: absolute;
    position: relative;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 1.5rem;
    outline: none;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.1),
    -5px -5px 10px rgba(0,0,0,0.1);

    animation: intro-modal 400ms;
    
    @keyframes intro-modal {
        0% {
          margin-top: 60rem;
        }
        100% {
          margin: 0;
        }
      }
  }
    
    @media (max-width: 540px) {
      .expanded {
        width: 100%;
      }
    }

    @media (max-width: 1000px) {
      .modal-content {
        max-width: 70vw;
      }
    }
`;
