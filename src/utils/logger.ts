import pino from 'pino';

export const logger = pino({
  redact: ['DATABASE_CONNECTION', 'SECRET_KEY'],
  level: 'debug',
  transport: {
    target: 'pino-pretty',
  },
});
