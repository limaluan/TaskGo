import styled from "styled-components";

export const GrupoContainer = styled.div`
  height: 92vh;
  padding: 3rem;
  background-color: #ffffff;
  overflow-y: scroll;

  .page-title {
    font-size: 4rem;
    font-family: "Poppins", sans-serif;
    padding-bottom: 1.5rem;
  }

  .entity {
    display: grid;
    width: 100%;
    font-size: 1.6rem;
    position: relative;
    padding: 1.5rem 1rem;
    
    grid-template-columns: 1fr 1fr 1fr;
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

  .task {
    display: grid;
    width: 100%;
    font-size: 1.6rem;
    position: relative;
    padding: 1.5rem 1rem;

    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 0.5rem;
    transition: background-color 0.2s;

    :hover {
      background-color: var(--background);
      cursor: pointer;
    }
  }

  > .task {
    /* Retira o hover do Cabeçalho */
    :hover {
      background-color: #ffffff;
      cursor: default;
    }
  }

  .task-description,
  .task-user {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .task-user {
  }

  @media (max-width: 520px) {
    padding: 1rem;
  }
`;
