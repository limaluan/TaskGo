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

  .sidenav-button {
    font-size: 3rem;
    align-self: center;
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
