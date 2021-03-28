import { ReactText } from 'react';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';

import styled from 'styled-components';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

const Toast = styled(ToastContainer)`
  .Toastify__toast--success {
    background: var(--green);
    color: #fff;
    font-weight: 500;
    font-size: 1.1.rem;
  }
  .Toastify__toast--error {
    background: var(--red);
    color: #fff;
    font-weight: 500;
    font-size: 1.1.rem;
  }
`;

export default function ToastProvider(): JSX.Element {
  return <Toast />;
}

export function success(message: string): ReactText {
  return toast.success(message, defaultOptions);
}

export function error(message: string): ReactText {
  return toast.error(message, defaultOptions);
}
