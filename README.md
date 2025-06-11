# Blog Backend API v2

Este é um projeto de API para gerenciamento de posts de um Blog para o Tech Challenge segunda fase. A aplicação é desenvolvida com Node.js, Express e MongoDB. Está configurada para rodar localmente, via Docker e possui integração contínua (CI) com GitHub Actions.

---

## ✅ Funcionalidades

- CRUD completo de posts (`Create`, `Read`, `Update`, `Delete`)
- Middleware global de tratamento de erros
- Documentação Swagger disponível em `/api-docs`
- Suporte a variáveis de ambiente via arquivo `.env`
- Configuração pronta para Docker e Docker Compose
- Pipeline CI configurada com GitHub Actions
- Arquivos sensíveis ignorados via `.gitignore`

---

##  Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd blog-backend-v2

2. Configurar variáveis de ambiente
Copie o arquivo exemplo para .env e edite se necessário:

cp .env.example .env

Conteúdo padrão do .env:

PORT=3000
MONGODB_URI=mongodb://mongo:27017/blog

3. Rodar a aplicação via Docker (recomendado)

É necessário ter Docker e Docker Compose instalados.

docker-compose up --build -d

Para popular o banco com dados de exemplo (seed):

docker exec -it blog-api npm run seed
A API estará disponível em:
http://localhost:3000/posts

Swagger UI para documentação e testes:
http://localhost:3000/api-docs

4. Rodar localmente sem Docker

npm install
npm run dev

5. Testes com GitHub Actions

A pipeline roda automaticamente em pushes ou pull requests na branch main.

📁 Estrutura de pastas

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
🔗 Tecnologias utilizadas

Node.js

Express

MongoDB

Mongoose

Swagger (OpenAPI)

Docker & Docker Compose

GitHub Actions (CI/CD)

