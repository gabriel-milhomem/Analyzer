import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  padding: 2.5rem 1.25rem;
  margin-top: 3.12rem;

  background: var(--shape);
  border-radius: var(--radius);
  box-shadow: var(--shadow-);
`;

export const Logo = styled.h1`
  font-family: var(--font-zilla);
  font-size: 5.62rem;
  line-height: 7.5rem;
  letter-spacing: 0.375rem;

  text-transform: lowercase;
  text-align: center;

  color: #fff;
`;

export const Headline = styled.h2`
  font-family: var(--font-orienta);
  font-size: 2.75rem;
  line-height: 4rem;

  text-align: center;
  margin-left: -1.3rem; /*see*/
  color: #fff;
`;

export const StyledLogin = styled.main`
  width: 100%;
  height: 100vh;
  padding: 5vh 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Column = styled.div`
  width: 90%;
  max-width: 400px;
`;
