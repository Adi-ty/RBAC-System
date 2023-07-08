import fastify from 'fastify';
import guard from 'fastify-guard';
import { logger } from './logger';
import { applicationsRoutes } from '../modules/applications/applications.routes';
import { usersRoutes } from '../modules/users/users.routes';
import { roleRoutes } from '../modules/roles/roles.routes';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

type User = {
  id: string;
  applicationId: string;
  scopes: Array<string>;
};

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

export async function buildServer() {
  const app = fastify({
    logger,
  });

  app.decorateRequest('user', null);

  app.addHook('onRequest', async function (request, reply) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return;
    }

    try {
      const token = authHeader.replace('Bearer ', '');
      const decoded = (await jwt.verify(token, env.SECRET_KEY)) as User;

      request.user = decoded;
    } catch (e) {
      logger.error('error decoding token');
    }
  });

  // register plugins
  app.register(guard, {
    requestProperty: 'user',
    scopeProperty: 'scopes',
    errorHandler: (result, request, reply) => {
      return reply.send("You don't have permission to access this resource");
    },
  });

  // register routes
  app.register(applicationsRoutes, { prefix: '/api/applications' });
  app.register(usersRoutes, { prefix: '/api/users' });
  app.register(roleRoutes, { prefix: '/api/roles' });

  return app;
}
