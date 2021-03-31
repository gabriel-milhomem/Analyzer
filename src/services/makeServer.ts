import jwt from 'jsonwebtoken';
import { Server, Response } from 'miragejs';
import shortid from 'shortid';

class UnauthorizedError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

const secretKey = process.env.JWT_SECRET_KEY!;
const errorMessage = 'User is not authenticate';

function middleware(headers: any): void {
  const header = headers.Authorization;
  if (!header) {
    throw new UnauthorizedError(errorMessage);
  }

  const token: string = header.split(' ')[1];
  if (!token) {
    throw new UnauthorizedError(errorMessage);
  }

  jwt.verify(token, secretKey, err => {
    if (err) {
      throw new UnauthorizedError(errorMessage);
    }
  });
}

interface Chart {
  id: string;
}

export default new Server({
  routes() {
    this.timing = 500;
    this.namespace = 'api';

    this.post('/login', (schema, req) => {
      const body = JSON.parse(req.requestBody);

      body.updatedAt = new Date();
      body.id = shortid.generate();

      const token = jwt.sign(body, secretKey);

      return new Response(201, {}, token);
    });

    this.post('/logout', (schema, req) => {
      try {
        middleware(req.requestHeaders);
        localStorage.clear();
        return new Response(200);
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          return new Response(401, {}, err.message);
        }

        return new Response(500);
      }
    });

    this.get('/chart', (schema, req) => {
      try {
        middleware(req.requestHeaders);
        const storage = localStorage.getItem('charts');
        const data = JSON.parse(storage ?? '[]');

        return new Response(200, {}, data);
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          return new Response(401, {}, err.message);
        }

        return new Response(500);
      }
    });

    this.get('/chart/:id', (schema, req) => {
      try {
        middleware(req.requestHeaders);
        const id = req.params.id;
        const storage = localStorage.getItem('charts');
        const parsed: Chart[] = JSON.parse(storage ?? '[]');
        const data = parsed.find(chart => chart.id === id);

        return new Response(200, {}, data);
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          return new Response(401, {}, err.message);
        }

        return new Response(500);
      }
    });

    this.post('/chart', (schema, req) => {
      try {
        middleware(req.requestHeaders);
        const body = JSON.parse(req.requestBody);

        body.updatedAt = new Date();
        body.id = shortid.generate();

        return new Response(201, {}, body);
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          return new Response(401, {}, err.message);
        }

        return new Response(500);
      }
    });

    this.put('/chart/:id', (schema, req) => {
      try {
        middleware(req.requestHeaders);
        const id = req.params.id;
        const body = JSON.parse(req.requestBody);

        body.updatedAt = new Date();
        body.id = id;

        return new Response(200, {}, body);
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          return new Response(401, {}, err.message);
        }

        return new Response(500);
      }
    });

    this.delete('/chart/:id', (schema, req) => {
      try {
        middleware(req.requestHeaders);
        return new Response(204);
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          return new Response(401, {}, err.message);
        }

        return new Response(500);
      }
    });

    this.delete('/chart', (schema, req) => {
      try {
        middleware(req.requestHeaders);
        localStorage.removeItem('charts');
        return new Response(204);
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          return new Response(401, {}, err.message);
        }

        return new Response(500);
      }
    });
  }
});
