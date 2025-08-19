import { defineConfig } from "drizzle-kit";

// garanto que exista uma variável de ambiente com a url do Database
if (!process.env.DATABASE_URL) {
  throw new Error("Database url not found");
}

export default defineConfig({
  dialect: "postgresql", // qual banco de dados estamos utilizando.
  schema: "./src/database/schema.ts", // pasta onde estão meus schemas
  dbCredentials: {
    // url de acesso ao banco de dados.
    url: process.env.DATABASE_URL,
  },
  out: "./drizzle", // pasta onde os arquivos gerados via comando vão ficar
});
