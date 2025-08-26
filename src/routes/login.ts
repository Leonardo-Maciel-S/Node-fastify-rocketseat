import z from "zod";

import { db } from "../database/client.ts";
import { userTable } from "../database/schema.ts";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { eq } from "drizzle-orm";
import { verify } from "argon2";

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/sessions",
    {
      schema: {
        tags: ["Auth"],
        summary: "Login",
        description:
          "Recebe um título e uma descrição, cria um curso e retorna seu id",

        body: z.object({
          email: z.string(),
          password: z.string(),
        }),

        // response: {
        //   201: z.object({
        //     courseId: z.uuid(),
        //   }),
        //   500: z.object({
        //     message: z.string(),
        //   }),
        // },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const result = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email));

      if (result.length === 0) {
        return reply.status(400).send({ message: "Credenciais inválidas" });
      }

      const user = result[0];
      const doesPasswordMatch = await verify(user.password, password);

      if (!doesPasswordMatch) {
        return reply.status(400).send({ message: "Credenciais inválidas" });
      }

      return reply.status(200).send({ message: "Ok" });
    }
  );
};
