import { IoStatsChart } from 'react-icons/io5';

import logoImg from '../../assets/logo.png';
import { StyledHeader, Content, LeftBox, HeaderButton, Brand } from './styles';

export function Header(): JSX.Element {
  return (
    <StyledHeader>
      <Content>
        <LeftBox>
          <img src={logoImg} alt="Analyzer's logo" />
          <Brand> Analyzer </Brand>
        </LeftBox>
        <HeaderButton type="button">
          <h2> My Graphs </h2>
          <IoStatsChart />
        </HeaderButton>
      </Content>
    </StyledHeader>
  );
}
