import styled from "styled-components";

export const SidenavContainer = styled.div`
  width: 24rem;
  height: 92vh;
  background-color: white;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--gray-light);

  .subtitle {
    color: var(--text);
    padding-left: 1rem;
    padding-bottom: 1.5rem;
  }

  [class="subtitle"]:last-of-type {
    padding-top: 1.5rem;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.4rem;
    color: initial;
    height: 4rem;
    width: 100%;
    border-radius: 3rem;
    padding: 1rem;

    :hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 540px) {
    width: 70vw;
  }
`;
