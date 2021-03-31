import { ComponentType } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Header } from './components/Header';
import { usePageTracking, useUser } from './hooks/';
import ChartProvider from './hooks/useCharts';
import UserProvider from './hooks/useUser';
import ToastProvider from './libs/toast';
import { Home, Dashboard, Login } from './pages';
import GlobalStyle from './styles';

export function App(): JSX.Element {
  usePageTracking();

  return (
    <UserProvider>
      <ChartProvider>
        <GlobalStyle />
        <Header />
        <Switch>
          <ProtectedRoute path="/dashboard/:id" component={Dashboard} />
          <ProtectedRoute path="/login" component={Login} />
          <UnprotectedRoute path="/" exact component={Home} />
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
  const { token } = useUser();

  if (!token) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
}

function UnprotectedRoute(props: RouteProps): JSX.Element {
  const { token } = useUser();

  if (token) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}
