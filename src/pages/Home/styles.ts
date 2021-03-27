import styled from 'styled-components';

import { large } from '../../utils/media';

export const Menu = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  position: relative;
  z-index: 1;

  margin-top: -4.5rem;

  ${large} {
    overflow-x: scroll;
    width: 100%;
    padding: 0 1rem;

    &::-webkit-scrollbar {
      width: 0px;
    }
  }
`;

export const StyledHome = styled.main`
  margin: 0 auto;
  max-width: 1120px !important;
`;
