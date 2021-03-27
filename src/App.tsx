import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import GlobalStyle from './styles';

export function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="dashboard/:id" component={Dashboard} />
      </Switch>
      <GlobalStyle />
    </Router>
  );
}
