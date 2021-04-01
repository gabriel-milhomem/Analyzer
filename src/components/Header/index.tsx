import { IoStatsChart, IoHomeOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.png';
import logoutImg from '../../assets/logout.svg';
import { useCharts, useToken } from '../../hooks';
import {
  StyledHeader,
  Content,
  LeftBox,
  HeaderButton,
  Brand,
  RightBox
} from './styles';

export function Header(): JSX.Element {
  const history = useHistory();
  const { refresh, setRefresh } = useCharts();
  const { logout } = useToken();
  const isDashboard = location.pathname.includes('dashboard');

  function handleOnClick(): void {
    if (isDashboard) {
      history.push('/');
      return;
    }

    setRefresh(refresh + 1);
  }

  async function handleLogout(): Promise<void> {
    history.push('/');
    await logout();
  }

  return (
    <StyledHeader>
      <Content>
        <LeftBox onClick={() => history.push('/')}>
          <img src={logoImg} alt="Analyzer's logo" />
          <Brand> Analyzer </Brand>
        </LeftBox>
        <RightBox>
          <img src={logoutImg} alt="logout icon" onClick={handleLogout} />
          <HeaderButton type="button" onClick={handleOnClick}>
            <h2> {isDashboard ? 'Home' : 'My Charts'} </h2>
            {isDashboard ? <IoHomeOutline /> : <IoStatsChart />}
          </HeaderButton>
        </RightBox>
      </Content>
    </StyledHeader>
  );
}
