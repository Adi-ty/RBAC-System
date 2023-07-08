import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

// Create User
const createUserBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  applicationId: z.string().uuid(),
  password: z.string().min(8),
  initialUser: z.boolean().optional(),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;

export const createUserJsonSchema = {
  body: zodToJsonSchema(createUserBodySchema, 'createUserBodySchema'),
};

// Login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  applicationId: z.string(),
});

export type LoginBody = z.infer<typeof loginSchema>;

export const loginJsonSchema = {
  body: zodToJsonSchema(loginSchema, 'loginSchema'),
};
