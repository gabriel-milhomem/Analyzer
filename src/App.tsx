import { ComponentType } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Header } from './components';
import { usePageTracking, useToken } from './hooks';
import ChartProvider from './hooks/useCharts';
import UserProvider from './hooks/useToken';
import ToastProvider from './libs/toast';
import { Home, Dashboard, Login } from './pages';
import GlobalStyle from './styles';

export function App(): JSX.Element {
  const location = useLocation();
  usePageTracking();

  return (
    <UserProvider>
      <ChartProvider>
        <GlobalStyle />
        {location.pathname !== '/login' && <Header />}
        <Switch>
          <ProtectedRoute path="/dashboard/:id" component={Dashboard} />
          <UnprotectedRoute path="/login" component={Login} />
          <ProtectedRoute path="/" exact component={Home} />
        </Switch>
        <ToastProvider />
      </ChartProvider>
    </UserProvider>
  );
}
interface RouteProps {
  path: string;
  component: ComponentType<any>;
  exact?: boolean;
}

function ProtectedRoute(props: RouteProps): JSX.Element {
  const { token } = useToken();

  if (!token) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
}

function UnprotectedRoute(props: RouteProps): JSX.Element {
  const { token } = useToken();

  if (token) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}
