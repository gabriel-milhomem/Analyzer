import { ComponentType } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Header } from './components/Header';
import ChartProvider, { useCharts } from './hooks/useCharts';
import ToastProvider, { warning } from './libs/toast';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import GlobalStyle from './styles';

export function App(): JSX.Element {
  return (
    <ChartProvider>
      <Router>
        <GlobalStyle />
        <Header />
        <Switch>
          <ProtectedRoute path="/dashboard/:id" component={Dashboard} />
          <Route path="/" exact component={Home} />
        </Switch>
        <ToastProvider />
      </Router>
    </ChartProvider>
  );
}

interface RouteProps {
  path: string;
  component: ComponentType<any>;
}

function ProtectedRoute(props: RouteProps): JSX.Element {
  const { charts } = useCharts();
  const customId = 'custom-id-warning';

  if (!charts || !charts.length) {
    warning('Selected chart does not exist', { toastId: customId });
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
}
