import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Header } from './components/Header';
import ToastProvider from './libs/toast';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import GlobalStyle from './styles';

export function App(): JSX.Element {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="chart/:id" component={Dashboard} />
      </Switch>
      <ToastProvider />
    </Router>
  );
}
