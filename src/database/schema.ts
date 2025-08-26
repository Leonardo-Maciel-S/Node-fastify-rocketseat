import { uniqueIndex } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { uuid, text, pgTable } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_roule", ["student", "manager"]);

export const userTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: userRole().notNull().default("student"),
});

export const coursesTable = pgTable("courses", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull().unique(),
  description: text(),
});

export const enrollmentsTable = pgTable(
  "enrollments",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id),
    courseId: uuid("course_id")
      .notNull()
      .references(() => coursesTable.id),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex().on(table.userId, table.courseId)]
);
