import { Server, Response } from 'miragejs';
import shortid from 'shortid';

interface Chart {
  id: string;
}

export default new Server({
  routes() {
    this.timing = 500;
    this.namespace = 'api';

    this.get('/chart', () => {
      const storage = localStorage.getItem('charts');
      const data = JSON.parse(storage ?? '[]');

      return new Response(200, {}, data);
    });

    this.get('/chart/:id', (schema, request) => {
      const id = request.params.id;
      const storage = localStorage.getItem('charts');
      const parsed: Chart[] = JSON.parse(storage ?? '[]');
      const data = parsed.find(chart => chart.id === id);

      return new Response(200, {}, data);
    });

    this.post('/chart', (schema, request) => {
      const body = JSON.parse(request.requestBody);

      body.updatedAt = new Date();
      body.id = shortid.generate();

      return new Response(201, {}, body);
    });

    this.put('/chart/:id', (schema, request) => {
      const id = request.params.id;
      const body = JSON.parse(request.requestBody);

      body.updatedAt = new Date();
      body.id = id;

      return new Response(200, {}, body);
    });

    this.delete('/chart/:id', () => {
      return new Response(204);
    });

    this.delete('/chart', () => {
      return new Response(204);
    });
  }
});
