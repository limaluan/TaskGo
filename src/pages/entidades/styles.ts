import styled from "styled-components";

export const EntidadesContainer = styled.div`
  height: 92vh;
  padding: 3rem;
  background-color: #ffffff;
  overflow-y: scroll;

  .page-title {
    font-size: 4rem;
    font-family: "Poppins", sans-serif;
    padding-bottom: 1.5rem;
  }
  
  .entity-search {
    width: 100%;
    margin: 1rem auto;
  }
  
  .entity {
    display: grid;
    width: 100%;
    font-size: 1.6rem;
    position: relative;
    padding: 1.5rem 1rem;
    
    grid-template-columns: 1fr 1fr;
  }

  .entity-name {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .entity-header {
    width: fit-content;
    cursor: pointer;
  }

  .entity-type {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .entity-options {
    display: flex;
    gap: 1rem;

    button {
      gap: 1rem;
      background-color: var(--blue);
      border: 1px solid var(--gray-light);
      width: 10rem;
      color: #ffffff;

      :hover {
        cursor: pointer;
      }
    }

    button:last-child {
      background-color: red;
    }
  }

  .entity-menu {
    display: none;
  }

  .entity-menu.on {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    width: fit-content;
    height: fit-content;
    padding: 1rem 2rem;
    top: 100%;
    right: 0;
    background-color: var(--background);
    border: 1px solid var(--gray-light);
    z-index: 1000;

    font-weight: 400;

    div {
      display: flex;
      gap: 1rem;
    }
  }

  .to-close-menu {
    position: absolute;
  }

  .to-close-menu.on {
    background-color: green;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  :hover {
    /* Possível Alteração! */
    /* background-color: rgba(0,0,0,0.1) */
  }

  @media (max-width: 520px) {
    padding: 1rem;

    .entity-options {
      button {
        width: fit-content;

        span {
          display: none;
        }
      }
    }
  }
`;
