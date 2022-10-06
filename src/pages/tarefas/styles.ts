import styled from "styled-components";

export const TarefasContainer = styled.div`
  height: 92vh;
  background-color: cornflowerblue;
  padding: 3rem;
  background-color: #ffffff;
  overflow-y: scroll;

  .task-search {
    width: 100%;
    margin: 1rem auto;
  }
  
  .page-title {
    font-size: 4rem;
    font-family: "Poppins", sans-serif;
    padding-bottom: 1.5rem;
  }

  .task {
    display: grid;
    width: 100%;
    font-size: 1.6rem;
    position: relative;
    padding: 1.5rem 1rem;

    grid-template-columns: 1.5fr 1fr 1fr 1fr;
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

  .task-description {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .task-user {
  }

  .task-header {
    width: fit-content;
    display: flex;
    gap: 1rem;
  }

  @media (max-width: 520px) {
    padding: 1rem;

    * {
      font-size: 1.5rem;
    }

    .task-header {
      width: fit-content;
      display: flex;
      gap: 0.5rem;
      cursor: pointer;
    }
  }
`;
