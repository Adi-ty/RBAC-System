import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBody } from "./users.schemas";
import { SYSTEM_ROLES } from "../../config/permissions";
import { getRoleByName } from "../roles/roles.services";
import {
  assignRoleToUser,
  createUser,
  getusersByApplication,
} from "./users.services";

export async function createUserHandler(
  request: FastifyRequest<{
    Body: CreateUserBody;
  }>,
  reply: FastifyReply
) {
  const { initialUser, ...data } = request.body;

  const roleName = initialUser
    ? SYSTEM_ROLES.SUPER_ADMIN
    : SYSTEM_ROLES.APPLICATION_USER;

  if (roleName === SYSTEM_ROLES.SUPER_ADMIN) {
    const appUsers = await getusersByApplication(data.applicationId);

    if (appUsers.length > 0) {
      return reply.code(400).send({
        message: "Super admin user already exists for this application",
        extensions: {
          code: "APPLICATION_SUPER_ADMIN_EXISTS",
          applicationId: data.applicationId,
        },
      });
    }
  }

  const role = await getRoleByName({
    name: roleName,
    applicationId: data.applicationId,
  });

  if (!role) {
    return reply.code(404).send({
      message: "Role not found",
    });
  }

  try {
    const user = await createUser(data);

    // assign a role to the user
    await assignRoleToUser({
      userId: user.id,
      roleId: role.id,
      applicationId: data.applicationId,
    });

    return user;
  } catch (e) {}
}
