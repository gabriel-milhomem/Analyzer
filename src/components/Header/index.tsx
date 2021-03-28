import { IoStatsChart } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.png';
import { useCharts } from '../../hooks/useCharts';
import { StyledHeader, Content, LeftBox, HeaderButton, Brand } from './styles';

export function Header(): JSX.Element {
  const history = useHistory();
  const { refresh, setRefresh } = useCharts();
  return (
    <StyledHeader>
      <Content>
        <LeftBox onClick={() => history.push('/')}>
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
