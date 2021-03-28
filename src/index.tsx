import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';
import './services/makeServer';

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
