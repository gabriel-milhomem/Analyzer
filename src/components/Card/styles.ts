import styled, { css } from 'styled-components';

import { large, medium } from '../../utils/media';

interface StyledCardProps {
  cardType: string;
  backColor: string;
}

interface TextProps {
  cardType: string;
}

const colorWhite = ['show', 'graphic', 'table'];

export const StyledCard = styled.button<StyledCardProps>`
  background: ${props => props.backColor};
  padding: 1.5rem;
  padding-bottom: 0.5rem !important;
  color: ${props =>
    colorWhite.includes(props.cardType) ? '#fff' : 'var(--title-color)'};

  border-radius: var(--radius);
  transition: filter 0.2s;
  overflow-x: scroll;

  ${large} {
    min-width: 27rem;
  }

  ${medium} {
    display: ${props => props.cardType === 'info' && 'none'};
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  ${props =>
    props.cardType !== 'info' &&
    css`
      box-shadow: var(--shadow);
      &:hover {
        filter: brightness(0.9);
      }
    `}

  ${props =>
    props.cardType === 'info' &&
    css`
      outline: none;
      cursor: initial;
      pointer-events: none;
      padding: 1.5rem 0;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;

      h2 {
        font-size: 20px;
        color: #fff;
        font-weight: 600 !important;
      }
    `}
`;

export const Text = styled.h3<TextProps>`
  text-align: left;
  margin-top: 1rem;
  font-size: 2rem;

  ${props =>
    props.cardType === 'info' &&
    css`
      font-size: 17px;
      letter-spacing: -1;
    `}
`;

export const TopLine = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-weight: 400;
  }

  svg {
    font-size: 2rem;
  }
`;

export const Footer = styled.div`
  height: 0.9rem;

  p {
    font-size: 0.9rem;
    text-align: left;
    color: var(--text-body);
  }
`;
