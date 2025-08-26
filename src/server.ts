import { server } from "./app.ts";

const port = Number(process.env.PORT) || 3333;

server.listen({ port }).then(() => {
  console.log(`Rodando: http://localhost:${port}`);
});
