import styled from 'styled-components';

import { large } from '../../utils/media';

export const Menu = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  margin-top: -4.45rem;

  ${large} {
    overflow-x: scroll;
    width: 100%;

    &::-webkit-scrollbar {
      width: 0px;
    }
  }
`;

export const StyledHome = styled.main`
  margin: 0 auto;
  max-width: 1120px;

  padding: 0 1rem;
  padding-bottom: 4rem;
`;
