import styled from "styled-components";

export const LoadingSpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50vh;
  left: 0;
  
  .spinner {
    width: 7rem;
    height: 7rem;
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-top: 1rem solid var(--green);
    border-radius: 10rem;
    animation: spin 1.5s linear infinite;

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
