import styled from 'styled-components';

export const StyledHeader = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1120px;
  width: 95%;
  margin: 0 auto;

  padding-top: 1.5rem;
  padding-bottom: 8rem;
`;

export const LeftBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

export const Brand = styled.h1`
  font-family: var(--font-saira);
  color: #fff;
  margin-left: 1rem;
  font-size: 2rem;
`;

export const HeaderButton = styled.button`
  transition: filter 0.2s;
  background: var(--blue-light);

  display: flex;
  align-items: center;

  border-radius: var(--radius);
  height: 2.8rem;
  padding: 0 1.5rem;
  margin-left: 1rem;

  &:hover {
    filter: brightness(0.9);
  }

  h2 {
    color: #fff;
    margin-right: 1rem;
    font-size: 1.1rem;
  }

  svg {
    color: #fff;
    font-size: 1.25rem;
    position: relative;
    bottom: 2px;
  }
`;
