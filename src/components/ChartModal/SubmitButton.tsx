import { ReactNode, ButtonHTMLAttributes } from 'react';
import Loader from 'react-loader-spinner';

import styled, { css } from 'styled-components';

import { small } from '../../utils/media';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  isLoading: boolean;
}

interface ButtonProps {
  isLoading: boolean;
}

export function SubmitButton(props: SubmitButtonProps): JSX.Element {
  const { children, isLoading, ...restProps } = props;
  return (
    <Button isLoading={isLoading} {...restProps}>
      {isLoading ? (
        <Loader type="Oval" color="#33CC95" width={35} height={35} />
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
}

const Button = styled.button<ButtonProps>`
  border-radius: var(--radius);
  background-color: ${props => (props.isLoading ? '#FFFFFF' : 'var(--green)')};
  border: ${props => (props.isLoading ? '3px solid var(--green)' : 'none')};

  color: #fff;
  font-weight: 500;
  font-size: 1.5rem;

  width: 100%;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  transition: background-color border color 0.5s linear;
  cursor: ${props => (props.isLoading ? 'default' : 'pointer')};

  ${props =>
    !props.isLoading &&
    css`
      &:hover,
      &:focus {
        background-color: #fff;
        color: var(--green);
        border: 3px solid var(--green);

        span {
          padding-right: 2.5rem;

          &::after {
            opacity: 1;
            right: 0;
          }
        }
      }
    `}

  span {
    position: relative;
    transition: 0.4s linear;

    &::after {
      content: '»';
      position: absolute;
      font-size: 2.8rem;
      opacity: 0;
      top: -19px;
      right: -40px;
      transition: 0.2s linear;
    }
  }

  svg {
    display: block;

    ${small} {
      transform: scale(0.7);
    }
  }

  &:focus {
    outline: 0.001px solid transparent;
  }
`;
