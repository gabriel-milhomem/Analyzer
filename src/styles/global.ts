import { css } from 'styled-components';

import { small, medium, large } from '../utils/media';

export default css`
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    ${large} {
      font-size: 93.75%;
    }

    ${medium} {
      font-size: 87.5%;
    }

    ${small} {
      font-size: 68.75%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    color: var(--text-user);
  }

  ol,
  ul {
    list-style: none;
  }

  body,
  button,
  input,
  textarea {
    font-weight: 400;
    font-family: var(--font-poppins);
  }

  button,
  input {
    border: 0;
    color: inherit;
    background: transparent;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.8;
    cursor: not-allowed;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 600;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 500px;

    background: #f0f1f5;
    position: relative;

    padding: 2rem 3rem;
    border-radius: 0.25rem;
  }
`;
