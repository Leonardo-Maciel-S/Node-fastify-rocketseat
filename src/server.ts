import fastify from "fastify";

import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { fastifySwagger } from "@fastify/swagger";

import { createCourseRoute } from "./routes/create-course.ts";
import { getCoursesByIdRoute } from "./routes/get-courses-id.ts";
import { getCoursesRoute } from "./routes/get-courses.ts";

import fastifyApiReference from "@scalar/fastify-api-reference";

const port = Number(process.env.PORT) || 3333;

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      // tipo de da documentação
      info: {
        // informações da doc
        title: "Desafio aula 2",
        version: "1.0.0 ",
      },
    },
    transform: jsonSchemaTransform, // Função que converte as tipagens em documentação.
  });

  server.register(fastifyApiReference, {
    routePrefix: "/docs",
    configuration: {
      theme: "kepler",
    },
  });
}

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(createCourseRoute);
server.register(getCoursesByIdRoute);
server.register(getCoursesRoute);

server.listen({ port }).then(() => {
  console.log(`Rodando: http://localhost:${port}`);
});
