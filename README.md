# Blog Backend API v2

Este é um projeto de API para gerenciamento de posts de um Blog para o Tech challege segunda fase. A aplicação é desenvolvida com Node.js, Express e MongoDB. Está configurada para rodar localmente, via Docker e possui integração contínua (CI) com GitHub Actions.

## ✅ Funcionalidades

- CRUD completo de posts (`Create`, `Read`, `Update`, `Delete`)
- Middleware global de tratamento de erros
- Documentação Swagger em `/api-docs`
- Suporte a variáveis de ambiente (.env)
- Docker e Docker Compose configurados
- GitHub Actions CI configurado para build e testes
- Arquivos sensíveis ignorados via `.gitignore`

---

## 🚀 Como rodar o projeto?

### 1. Clonando o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd blog-backend-v2

2. Configurar variáveis de ambiente:

cp .env.example .env

Edite o arquivo .env se necessário:


PORT=3000
MONGO_URI=mongodb://mongo:27017/blog

3. Rodando com Docker (recomendado):
É necessário ter o Docker e Docker Desktop instalados.

docker-compose up --build

A API estará disponível em: http://localhost:3000/posts

Swagger: http://localhost:3000/api-docs

4. Rodando sem Docker (modo local):

npm install

npm run dev

5. Testes com GitHub Actions:
A pipeline do GitHub Actions é automaticamente executada em todo push ou pull request para a branch main.

6. Endpoints da API:
GET /posts — Listar posts

GET /posts/:id — Buscar post por ID

POST /posts — Criar novo post

PUT /posts/:id — Atualizar post

DELETE /posts/:id — Remover post
Documentação Swagger disponível em: /api-docs

📁 Estrutura de Pastas
bash

blog-backend-v2/
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── README.md
├── server.js
├── swagger.js
├── /config
│   └── db.js
├── /controllers
│   └── postController.js
├── /models
│   └── Post.js
├── /routes
│   └── postRoutes.js
├── /middleware
│   └── errorHandler.js
└── .github/
    └── workflows/
        └── node.js.yml         


🔗 Tecnologias
Node.js

Express

MongoDB

Mongoose

Swagger

Docker & Docker Compose

GitHub Actions

