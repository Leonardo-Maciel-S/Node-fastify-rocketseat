import { describe, expect, test } from "vitest";
import request from "supertest";

import { server } from "./../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";

describe("Courses", () => {
  test("Get a course by ID", async () => {
    await server.ready();

    const { course } = await makeCourse();

    const response = await request(server.server).get(`/courses/${course.id}`);

    expect(response.body).toEqual({
      course: {
        id: expect.any(String),
        title: expect.any(String),
        description: null,
      },
    });
  });

  test("Should return 404 if course not found", async () => {
    await server.ready();

    const response = await request(server.server).get(
      `/courses/e6b4c8d9-3f5a-4e2b-8c1d-5f6b7a8e9d0f`
    );

    expect(response.status).toBe(404);
  });
});
