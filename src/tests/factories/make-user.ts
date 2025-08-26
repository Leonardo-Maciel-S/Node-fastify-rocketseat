import { fakerPT_BR } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { userTable } from "../../database/schema.ts";
import { hash } from "argon2";
import { randomUUID } from "node:crypto";

export async function makeUser() {
  const passwordBeforeHash = randomUUID();

  const [user] = await db
    .insert(userTable)
    .values({
      name: fakerPT_BR.person.fullName(),
      email: fakerPT_BR.internet.email(),
      password: await hash(passwordBeforeHash),
    })
    .returning();

  return { user, passwordBeforeHash };
}
