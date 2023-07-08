import fastify from 'fastify';
import { logger } from './logger';
import { applicationsRoutes } from '../modules/applications/applications.routes';
import { usersRoutes } from '../modules/users/users.routes';
import { roleRoutes } from '../modules/roles/roles.routes';

export async function buildServer() {
  const app = fastify({
    logger,
  });

  // register plugins

  // register routes
  app.register(applicationsRoutes, { prefix: '/api/applications' });
  app.register(usersRoutes, { prefix: '/api/users' });
  app.register(roleRoutes, { prefix: '/api/roles' });

  return app;
}
