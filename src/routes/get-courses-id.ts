import z from "zod";
import { db } from "../database/client.ts";
import { coursesTable } from "../database/schema.ts";

import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const getCoursesByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses/:id",
    {
      schema: {
        tags: ["Courses"],

        summary: "Get a course by id",

        params: z.object({
          id: z.uuid(),
        }),

        response: {
          200: z
            .object({
              course: z.object({
                id: z.uuid(),
                title: z.string(),
                description: z.string().nullable(),
              }),
            })
            .describe("Retorna um objeto contendo um curso."),
          404: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const result = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.id, id));

      if (!(result.length > 0)) {
        return reply.status(404);
      }
      return reply.status(200).send({ course: result[0] });
    }
  );
};
