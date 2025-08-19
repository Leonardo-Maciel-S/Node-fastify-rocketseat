# API de Gerenciamento de Cursos

Esta é uma API RESTful construída com Fastify e TypeScript para gerenciamento de cursos. O projeto utiliza Drizzle ORM para operações com banco de dados PostgreSQL e inclui documentação API com Swagger e Scalar API Reference.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Drizzle ORM
- Zod (para validação)
- Docker (para containerização do banco)
- Swagger & Scalar API Reference (para documentação)

## 📋 Funcionalidades

- Criar novos cursos
- Listar todos os cursos
- Buscar curso por ID
- Validação de dados com Zod
- Documentação automática da API
- Migrações de banco com Drizzle Kit

## 🗄️ Estrutura do Banco

### Tabela de Cursos

- `id` (UUID, Chave Primária)
- `title` (Texto, Único)
- `description` (Texto, Opcional)

### Tabela de Usuários

- `id` (UUID, Chave Primária)
- `name` (Texto)
- `email` (Texto, Único)

## 🏗️ Arquitetura

```mermaid
graph TD
    Client[Cliente HTTP] -->|Requisição| Server[Servidor Fastify]

    subgraph Rotas
        Server -->|POST /courses| Create[Criar Curso]
        Server -->|GET /courses| List[Listar Cursos]
        Server -->|GET /courses/:id| GetById[Buscar por ID]
    end

    subgraph Validação
        Create -->|Zod Schema| ValidateCreate[Valida Dados]
        GetById -->|Zod Schema| ValidateId[Valida UUID]
    end

    subgraph Banco de Dados
        ValidateCreate -->|Drizzle ORM| DB[(PostgreSQL)]
        ValidateId -->|Drizzle ORM| DB
        List -->|Drizzle ORM| DB
    end

    subgraph Respostas
        DB -->|Sucesso| Success[HTTP 200/201]
        DB -->|Não Encontrado| NotFound[HTTP 404]
        DB -->|Erro| Error[HTTP 500]
    end

    subgraph Documentação
        Server -->|OpenAPI| Swagger[Swagger UI]
        Server -->|OpenAPI| Scalar[Scalar Docs]
    end

    style Server fill:#1a1a1a,stroke:#333,stroke-width:2px
    style DB fill:#336791,stroke:#333,stroke-width:2px
    style Swagger fill:#85ea2d,stroke:#333,stroke-width:2px
    style Scalar fill:#ff6b6b,stroke:#333,stroke-width:2px
```

## 🚀 Como Iniciar

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Inicie o banco PostgreSQL:

```bash
docker-compose up -d
```

4. Configure as variáveis de ambiente:
   Crie um arquivo `.env` com:

```env
DATABASE_URL=
PORT=
NODE_ENV=
```

5. Execute as migrações do banco:

```bash
npm run db:migrate
```

6. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 📚 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento com watch mode
- `npm run db:generate` - Gera migrações do banco
- `npm run db:migrate` - Executa migrações do banco
- `npm run db:studio` - Abre Drizzle Studio para gerenciamento do banco

## 📖 Documentação da API

Em modo de desenvolvimento, você pode acessar:

- Swagger UI: `http://localhost:3333/swagger`
- Scalar API Reference: `http://localhost:3333/docs`

## 🛣️ Rotas da API

### POST /courses

Criar um novo curso

- Corpo: `{ title: string, description?: string }`
- Resposta: `{ courseId: uuid }`

### GET /courses

Listar todos os cursos

- Resposta: `{ courses: Array<Course> }`

### GET /courses/:id

Buscar curso por ID

- Parâmetros: `id: uuid`
- Resposta: `{ course: Course }`
