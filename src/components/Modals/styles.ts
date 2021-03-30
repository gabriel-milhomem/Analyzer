import { transparentize } from 'polished';
import styled from 'styled-components';

interface InputProps {
  width: string;
}

export const Title = styled.h1`
  color: var(--title-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const Input = styled.input<InputProps>`
  width: ${props => props.width};
  height: 3.2rem;
  background: var(--input-background);

  border: 1px solid #969cb3;
  border-radius: var(--radius);

  color: #333333;
  font-size: 1.1rem;

  padding: 0 1.5rem;
  transition: all 0.2s ease-in-out;

  &:focus {
    border: 0;
    outline: 2px solid var(--green);
  }

  &::placeholder {
    font-size: 1rem;
  }

  & + input {
    margin-top: 1.25rem;
  }
`;

export const Error = styled.div`
  width: 100%;
  margin: 1rem 0;

  p {
    color: var(--red);
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const InfoTitle = styled.h1`
  color: var(--title-color);
  font-size: 1.5rem;
  text-align: left;
  margin: 0.5rem 0;
`;

export const Subtitle = styled(InfoTitle).attrs({ as: 'h2' })`
  font-size: 1.25rem;
  margin-top: 0.1rem;
  font-weight: 500;
`;

export const InfoSection = styled.section`
  max-height: 400px;
  padding-right: 0.8rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: ${transparentize(0.4, '#33cc95')};
  }

  &::-webkit-scrollbar-track-piece {
    display: none;
  }
`;

export const List = styled.ul`
  margin: 0.5rem 0;

  li {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.15rem 0;
    justify-content: space-between;
  }

  span {
    display: inline-block;
    color: var(--title-color);
  }

  .order {
    max-width: 13rem;
    white-space: nowrap;
    overflow-x: scroll;

    &::-webkit-scrollbar-track-piece {
      display: none;
    }

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: var(--radius);
      background: var(--text-body);
    }
  }
`;
