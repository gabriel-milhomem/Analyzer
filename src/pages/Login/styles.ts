import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  padding: 2.5rem 1.25rem;
  margin-top: 2rem;

  background: var(--shape);
  border-radius: 1rem;
  box-shadow: var(--shadow);
`;

export const Logo = styled.h1`
  font-family: var(--font-zilla);
  font-size: 5rem;
  line-height: 6rem;
  letter-spacing: 0.6rem;
  position: relative;
  left: 0.5rem;

  text-transform: lowercase;
  text-align: center;

  color: #fff;
`;

export const Headline = styled.h2`
  font-family: var(--font-orienta);
  font-size: 1.8rem;
  line-height: 4rem;

  text-align: center;
  position: relative;
  top: -0.8rem;
  color: #fff;
`;

export const StyledLogin = styled.main`
  width: 100%;
  height: 100vh;
  background: var(--gradient);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Column = styled.div`
  width: 80%;
  max-width: 400px;
`;
