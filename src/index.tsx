import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createServer, Model } from 'miragejs';

import { App } from './App';

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

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
  },

  seeds(server) {
    server.db.loadData({
      charts: [
        {
          id: 1,
          title: 'Hello World',
          points: 10,
          intervalS: 5,
          frequency: 2,
          maximum: 100,
          minimum: 0,
          updatedAt: new Date()
        },
        {
          id: 2,
          title: 'Work',
          points: 40,
          intervalS: 10,
          frequency: 4,
          maximum: 50,
          minimum: -50,
          updatedAt: new Date('2021-02-12 09:00:00')
        }
      ]
    });
  }
});
