import styled from 'styled-components';

export const SidenavContainer = styled.div`
  width: 25rem;
  height: 92vh;
  background-color: white;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .subtitle {
    color: var(--text);
    padding-bottom: 0.5rem;
  }

  [class='subtitle']:last-of-type {
    padding-top: 0.5rem;
    padding-bottom: 0;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.4rem;
    color: initial;
    width: fit-content;

    :hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 540px) {
    width: 70vw;
  }
`;
