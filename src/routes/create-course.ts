import z from "zod";

import { db } from "../database/client.ts";
import { coursesTable } from "../database/schema.ts";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      schema: {
        tags: ["Courses"],

        summary: "Create a course",

        description:
          "Recebe um título e uma descrição, cria um curso e retorna seu id",

        body: z.object({
          title: z.string(),
          description: z.string().min(3, "Mínimo de 3 caracteres").optional(),
        }),

        response: {
          201: z.object({
            courseId: z.uuid(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, description } = request.body;

      const [course] = await db
        .insert(coursesTable)
        .values({
          title,
          description,
        })
        .returning();

      if (!course) {
        return reply
          .status(500)
          .send({ message: "Não foi possível criar o curso." });
      }

      return reply.status(201).send({ courseId: course.id });
    }
  );
};
