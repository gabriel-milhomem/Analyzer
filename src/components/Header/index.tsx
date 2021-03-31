import { IoStatsChart, IoHomeOutline } from 'react-icons/io5';
import { useHistory, useLocation } from 'react-router-dom';

import logoImg from '../../assets/logo.png';
import { useCharts } from '../../hooks';
import { StyledHeader, Content, LeftBox, HeaderButton, Brand } from './styles';

export function Header(): JSX.Element | null {
  const location = useLocation();
  const history = useHistory();
  const { refresh, setRefresh } = useCharts();
  const isDashboard = location.pathname.includes('dashboard');
  if (location.pathname === '/login') return null;

  function handleOnClick(): void {
    if (isDashboard) {
      history.push('/');
      return;
    }

    setRefresh(refresh + 1);
  }

  return (
    <StyledHeader>
      <Content>
        <LeftBox onClick={() => history.push('/')}>
          <img src={logoImg} alt="Analyzer's logo" />
          <Brand> Analyzer </Brand>
        </LeftBox>
        <HeaderButton type="button" onClick={handleOnClick}>
          <h2> {isDashboard ? 'Home' : 'My Charts'} </h2>
          {isDashboard ? <IoHomeOutline /> : <IoStatsChart />}
        </HeaderButton>
      </Content>
    </StyledHeader>
  );
}
