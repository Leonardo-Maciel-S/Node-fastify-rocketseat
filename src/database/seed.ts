import { db } from "./client.ts";
import { coursesTable, enrollmentsTable, userTable } from "./schema.ts";
import { fakerPT_BR as faker } from "@faker-js/faker";

import { hash } from "argon2";

async function seed() {
  const passwordHash = await hash("12345678");

  const usersInsert = await db
    .insert(userTable)
    .values([
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "student",
        password: passwordHash,
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "student",
        password: passwordHash,
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "student",
        password: passwordHash,
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "student",
        password: passwordHash,
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "student",
        password: passwordHash,
      },
    ])
    .returning();

  const coursesInsert = await db
    .insert(coursesTable)
    .values([
      {
        title: faker.lorem.words(4),
        description: faker.lorem.paragraph(1),
      },
      {
        title: faker.lorem.words(4),
        description: faker.lorem.paragraph(1),
      },
    ])
    .returning();

  const enrollmentInsert = await db
    .insert(enrollmentsTable)
    .values([
      {
        courseId: coursesInsert[0].id,
        userId: usersInsert[0].id,
      },

      {
        courseId: coursesInsert[0].id,
        userId: usersInsert[1].id,
      },
      {
        courseId: coursesInsert[1].id,
        userId: usersInsert[2].id,
      },
    ])
    .returning();
}

seed();
