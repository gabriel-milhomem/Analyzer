import { Server, Model, Response } from 'miragejs';
import shortid from 'shortid';

export default new Server({
  models: {
    chart: Model
  },

  routes() {
    this.timing = 600;
    this.namespace = 'api';

    this.get('/chart', schema => {
      return schema.db.charts;
    });

    this.post('/chart', (schema, request) => {
      let body = JSON.parse(request.requestBody);

      body.updatedAt = new Date();
      body = schema.db.charts.insert(body);
      body.id = shortid.generate();
      return body;
    });

    this.put('/chart/:id', (schema, request) => {
      const body = JSON.parse(request.requestBody);
      const id = request.params.id;

      body.updatedAt = new Date();

      return schema.db.charts.update(id, body);
    });

    this.delete('/chart/:id', (schema, request) => {
      const id = request.params.id;
      schema.db.charts.remove(id);

      return new Response(204);
    });

    this.delete('/chart', schema => {
      schema.db.charts.remove();

      return new Response(204);
    });
  }

  /* seeds(server) {
    server.db.loadData({
      charts: [
        {
          id: shortid.generate(),
          title: 'Hello World',
          points: 10,
          intervalS: 5,
          frequency: 2,
          maximum: 100,
          minimum: 0,
          updatedAt: new Date()
        },
        {
          id: shortid.generate(),
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
  } */
});
