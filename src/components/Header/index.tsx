import { IoStatsChart } from 'react-icons/io5';

import logoImg from '../../assets/logo.png';
import { useCharts } from '../../hooks/useCharts';
import { StyledHeader, Content, LeftBox, HeaderButton, Brand } from './styles';

export function Header(): JSX.Element {
  const { refresh, setRefresh } = useCharts();
  return (
    <StyledHeader>
      <Content>
        <LeftBox>
          <img src={logoImg} alt="Analyzer's logo" />
          <Brand> Analyzer </Brand>
        </LeftBox>
        <HeaderButton type="button" onClick={() => setRefresh(refresh + 1)}>
          <h2> My Charts </h2>
          <IoStatsChart />
        </HeaderButton>
      </Content>
    </StyledHeader>
  );
}
