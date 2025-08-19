import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { coursesTable } from "../database/schema.ts";
import z from "zod";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["Courses"],
        summary: "Get all courses",
        response: {
          200: z
            .object({
              courses: z.array(
                z.object({
                  id: z.uuid(),
                  title: z.string(),
                  description: z.string().optional(),
                })
              ),
            })
            .describe("Retorna um objeto contendo uma lista de cursos."),
        },
      },
    },
    async (request, reply) => {
      const courses = await db
        .select({
          id: coursesTable.id,
          title: coursesTable.title,
        })
        .from(coursesTable);

      return reply.send({ courses });
    }
  );
};
