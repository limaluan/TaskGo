import styled from "styled-components";

export const CreateEntityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .type {
    display: flex;
    align-items: center;

    label {
      font-size: 1.6rem;
    }
  }
  
  input {
    width: 100%;
  }
  
  .group-section {
    padding-top: 1rem;
    
    width: 100%;
    overflow-x: scroll;
  }

  .wrapper {
    display: flex;
    width: max-content;
    gap: 2rem;
  }

  .group-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: var(--background);
    padding: 1.5rem;
    font-size: 1.4rem;
    border-radius: 1rem;

    transition: filter 0.2s;

    :hover {
      filter: brightness(0.8);
      cursor: pointer;
    }
  }

  .create-button {
    background-color: var(--green);
    color: #ffffff;
    padding: 0.5rem 1.5rem;
    margin: auto;
  }
  
  .selected {
    filter: brightness(0.7);
  }

  .off {
    display: none;
  }
`;
