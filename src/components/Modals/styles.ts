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
