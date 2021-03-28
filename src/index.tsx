import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createServer, Model } from 'miragejs';

import { App } from './App';

const root = document.getElementById('root');

createServer({
  models: {
    chart: Model
  },

  routes() {
    this.namespace = 'api';

    this.get('/chart', schema => {
      return schema.all('chart');
    });

    this.post('/chart', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      data.updatedAt = new Date();

      return schema.create('chart', data);
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
