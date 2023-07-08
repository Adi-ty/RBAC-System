import { FastifyInstance } from 'fastify';
import { createRoleJsonSchema } from './roles.schemas';
import { createRoleHandler } from './roles.controller';

export async function roleRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: createRoleJsonSchema,
    },
    createRoleHandler,
  );
}
