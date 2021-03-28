import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

export const Table = styled.table`
  width: 100%;

  border-spacing: 0 0.5rem;

  svg {
    transform: scale(1.5);
    color: var(--blue);
    cursor: pointer;
  }

  .red-svg {
    color: var(--red);
  }

  tr {
    border-radius: var(--radius);
    cursor: pointer;
  }
`;

export const Head = styled.thead`
  th {
    text-align: center;
    font-weight: 500;
    padding: 1rem 2rem;
    color: var(--title-color);
  }

  tr {
    background: transparent;
  }
`;

export const Body = styled.tbody`
  td {
    text-align: center;
    padding: 1rem 2rem;
    background: var(--shape);
    border: 0;

    &:nth-child(2) {
      color: var(--title-color);
    }

    &:nth-child(3) {
      color: var(--green);
    }
  }
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-family: var(--font-saira);
    color: var(--title-color);
    font-size: 2rem;
  }
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;

  h3 {
    font-size: 1.25rem;
    color: var(--title-color);
    margin-right: 2rem;
    font-weight: 500;
  }
`;

export const DeleteButton = styled.button`
  transition: filter 0.2s;
  background-color: ${transparentize(0.3, '#e62e4d')};

  display: flex;
  align-items: center;

  border-radius: var(--radius);
  height: 2rem;
  padding: 0 1rem;

  &:hover {
    filter: brightness(0.9);
  }

  p {
    color: #fff;
    margin-right: 0.6rem;
    font-size: 0.9rem;
  }

  svg {
    color: #fff;
    font-size: 1.1rem;
  }
`;
