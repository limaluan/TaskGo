import styled from "styled-components";

export const EntidadesContainer = styled.div`
  height: 92vh;
  background-color: cornflowerblue;
  padding: 3rem;
  background-color: #ffffff;

  .page-title {
    font-size: 4rem;
    font-family: 'Poppins', sans-serif;
    padding-bottom: 3rem;
  }

  .entity {
    display: grid;
    width: 100%;
    font-size: 1.6rem;
    position: relative;
    padding: 1.5rem 1rem;

    grid-template-columns: 1fr 1fr;

    .entity-name {
      display: flex;
      gap: 1rem;
    }

    :hover { /* Possível Alteração! */
      background-color: rgba(0,0,0,0.1)
    }
  }
`;
