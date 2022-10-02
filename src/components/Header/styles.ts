import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100vw;
  height: 8vh;
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
  align-items: center;
  background-color: #ffffff;
  position: relative;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;

  .sidenav-button {
    font-size: 3rem;
    align-self: center;
    border-radius: 2rem;
    color: var(--light-gray);
  }

  .logo {
    height: 60%;
  }

  @media (max-width: 540px) {
    justify-content: center;

    .sidenav-button {
      position: absolute;
      top: 50%;
      left: 2rem;
      transform: translateY(-50%);
    }
  }
`;
