import fastify from "fastify";
import { logger } from "./logger";
import { applicationsRoutes } from "../modules/applications/applications.routes";

export async function buildServer() {
  const app = fastify({
    logger,
  });

  // register plugins

  // register routes
  app.register(applicationsRoutes, { prefix: "/api/applications" });

  return app;
}
