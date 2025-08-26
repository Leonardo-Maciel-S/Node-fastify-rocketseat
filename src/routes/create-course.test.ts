import { describe, expect, test } from "vitest";
import request from "supertest";

import { server } from "./../app.ts";
import { fakerPT_BR } from "@faker-js/faker";

describe("Courses", () => {
  test("Create a course.", async () => {
    await server.ready();

    const response = await request(server.server)
      .post("/courses")
      .set("Content-Type", "application/json")
      .send({
        title: fakerPT_BR.lorem.words(4),
      });

    expect(response.status).toEqual(201);
    expect(response.body).haveOwnProperty("courseId");
  });

  test("Should return status 400 if send invalide title.", async () => {
    await server.ready();

    const response = await request(server.server)
      .post("/courses")
      .set("Content-Type", "application/json")
      .send({
        title: 4,
      });

    expect(response.status).toEqual(400);
    expect(response.body).haveOwnProperty("message");
  });
});
