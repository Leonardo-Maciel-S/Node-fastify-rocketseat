import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { coursesTable, enrollmentsTable } from "../database/schema.ts";
import z from "zod";
import { and, asc, count, eq, ilike, SQL } from "drizzle-orm";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["Courses"],
        summary: "Get all courses",
        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(["title"]).optional().default("title"),
          limit: z.coerce.number().optional().default(2),
          page: z.coerce.number().optional().default(1),
        }),
        response: {
          200: z
            .object({
              courses: z.array(
                z.object({
                  id: z.uuid(),
                  title: z.string(),
                  description: z.string().optional(),
                  enrollments: z.number(),
                })
              ),
              total: z.number(),
            })
            .describe("Retorna um objeto contendo uma lista de cursos."),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy, page, limit } = request.query;

      const conditions: SQL[] = [];

      if (search) {
        conditions.push(ilike(coursesTable.title, `%${search}%`));
      }

      const [courses, total] = await Promise.all([
        db
          .select({
            id: coursesTable.id,
            title: coursesTable.title,
            enrollments: count(enrollmentsTable.id),
          })
          .from(coursesTable)
          .leftJoin(
            enrollmentsTable,
            eq(enrollmentsTable.courseId, coursesTable.id)
          )
          .limit(limit)
          .offset((page - 1) * 2)
          .orderBy(asc(coursesTable[orderBy]))
          .where(and(...conditions))
          .groupBy(coursesTable.id),

        db.$count(coursesTable, and(...conditions)),
      ]);
      return reply.send({ courses, total });
    }
  );
};
