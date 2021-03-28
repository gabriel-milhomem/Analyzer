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
  color: #fff !important;
  font-weight: 500 !important;
  font-size: 1.1.rem !important;

  .Toastify__toast--success {
    background: var(--green);
  }
  .Toastify__toast--error {
    background: var(--red);
  }
  .Toastify__toast--warning {
    background: var(--yellow);
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

export function warning(message: string): ReactText {
  return toast.warning(message, defaultOptions);
}
