import { Server, Model, Response } from 'miragejs';

export default new Server({
  models: {
    chart: Model
  },

  routes() {
    this.timing = 500;
    this.namespace = 'api';

    this.get('/chart', schema => {
      return schema.db.charts;
    });

    this.post('/chart', (schema, request) => {
      const body = JSON.parse(request.requestBody);

      body.updatedAt = new Date();
      return schema.db.charts.insert(body);
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
