import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  input {
    width: 100%;
  }
  
  button {
    padding: 1rem;
  }
  
  h1 {
    padding-bottom: 1rem;
  }
  
  textarea {
    resize: none;
    border: 2px solid var(--gray-light);
    border-radius: 1rem;
    padding: 1rem;
    height: 10rem;

    font-family: "Poppins", sans-serif;
    font-size: 1.4rem;
  }
  
  .task-description {
    font-size: 1.6rem;
  }
  
  .select-section {
    padding-top: 1rem;
    
    width: 100%;
    overflow-x: scroll;
  }

  .wrapper {
    display: flex;
    width: max-content;
    gap: 2rem;
  }

  [class*=-card] {
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
  
  .edit-button {
    background-color: var(--blue);
    color: #ffffff;
  }
  
  .approve-section {
    display: flex;
    justify-content: space-around;
    gap: 2rem;
  }

  .approve-button,
  .reject-button {
    background-color: var(--green);
    color: #ffffff;
    width: 100%;
  }

  .reject-button {
    background-color: var(--yellow);
  }
  
  .selected {
    filter: brightness(0.7);
  }

  .off {
    display: none;
  }
`;
