import { fakerPT_BR } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { coursesTable } from "../../database/schema.ts";

export async function makeCourse(title?: string) {
  const [course] = await db
    .insert(coursesTable)
    .values({
      title: title ?? fakerPT_BR.lorem.words(3),
    })
    .returning();

  return { course };
}
