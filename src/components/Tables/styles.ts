import { transparentize, darken } from 'polished';
import styled, { css } from 'styled-components';

import { medium, small } from '../../utils/media';
import { InfoSection } from '../Modals/styles';

interface BodyProps {
  disabled: boolean;
  isListPoints: boolean;
}

type Orientation = -1 | 0 | 1;

interface TimeProp {
  time: Orientation;
}

interface ValueProp {
  value: Orientation;
}

export const Container = styled(InfoSection).attrs({ as: 'div' })`
  width: 100%;

  &::-webkit-scrollbar {
    height: 5px;
  }

  ${medium} {
    overflow-y: hidden;
    height: auto;
    max-height: none;
  }
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

export const Body = styled.tbody<BodyProps>`
  td {
    pointer-events: ${props => (props.disabled ? 'none' : 'initial')};
    text-align: center;
    padding: 1rem 2rem;
    background: var(--shape);
    border: 0;

    ${props =>
      props.isListPoints
        ? css`
            &:nth-child(1) {
              color: var(--title-color);
            }
            &:nth-child(2) {
              color: var(--yellow);
            }
            &:nth-child(3) {
              color: var(--blue-light);
            }
            &:last-child.red {
              color: var(--red);
            }
            &:last-child.green {
              color: var(--green);
            }
          `
        : css`
            &:nth-child(2) {
              color: var(--title-color);
            }
            &:nth-child(1),
            &:nth-child(5),
            &:nth-child(6) {
              cursor: pointer;
              transition: background 0.2s ease-in-out;

              &:hover {
                background: ${darken(0.15, '#fff')};
              }
            }
          `}
  }
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom: 0.75rem;

  h2 {
    font-family: var(--font-saira);
    user-select: none;
    color: var(--title-color);
    font-size: 2em;
  }

  ${small} {
    font-size: 0.85rem;
  }

  ${medium} {
    font-size: 0.75rem;
  }
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;

  h3 {
    font-size: 1.25em;
    color: var(--title-color);
    margin-right: 1em;
    font-weight: 500;
  }
`;

export const DeleteButton = styled.button`
  transition: filter 0.2s;
  background-color: ${transparentize(0.3, '#e62e4d')};

  display: flex;
  align-items: center;

  border-radius: var(--radius);
  height: 2em;
  padding: 0 1em;
  font-size: 1rem;

  ${small} {
    font-size: 0.85rem;
  }

  ${medium} {
    font-size: 0.75rem;
  }

  &:hover {
    filter: brightness(0.95);
  }

  p {
    color: #fff;
    margin-right: 0.6em;
    font-size: 0.9em;
  }

  svg {
    color: #fff;
    font-size: 1.1em;
  }
`;

export const TimeButton = styled(DeleteButton)<TimeProp>`
  background-color: ${transparentize(0.15, '#6933ff')};

  svg {
    display: ${props => (props.time === 0 ? 'none' : 'block')};
    transform: ${props => (props.time === 1 ? 'rotate(180deg)' : '0')};
  }
`;

export const ValueButton = styled(DeleteButton)<ValueProp>`
  background-color: ${transparentize(0.15, '#f1c40f')};
  margin-right: 1em;

  svg {
    display: ${props => (props.value === 0 ? 'none' : 'block')};
    transform: ${props => (props.value === 1 ? 'rotate(180deg)' : '0')};
  }
`;
