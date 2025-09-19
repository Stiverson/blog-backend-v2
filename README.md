# Blog Backend API v2

Este é um projeto de API para gerenciamento de posts de um Blog para o Tech Challenge segunda fase. A aplicação é desenvolvida com Node.js, Express e MongoDB. Está configurada para rodar localmente, via Docker e possui integração contínua (CI) com GitHub Actions.

✅ Funcionalidades
- CRUD completo de posts (Create, Read, Update, Delete).
- **Autenticação de Usuários**: Login com JWT para professores e alunos.
- **Autorização**: Rotas de criação, edição e exclusão de posts protegidas.
- Middleware global de tratamento de erros.
- Documentação Swagger disponível em `/api-docs`.
- Suporte a variáveis de ambiente via arquivo `.env`.
- Configuração pronta para Docker e Docker Compose.
- Pipeline CI configurada com GitHub Actions.
- Arquivos sensíveis ignorados via `.gitignore`.

---

### Dependência do Frontend
Este backend faz parte de uma aplicação completa. Para uma experiência completa, é necessário que o frontend correspondente esteja em execução. Você pode encontrar o repositório do frontend em:
**[https://github.com/Gabriel300p/challenge-3-centro-educacional-alfa](https://github.com/Gabriel300p/challenge-3-centro-educacional-alfa)**

---

### Como rodar o projeto

1.  **Clonar o repositório**
    ```bash
    git clone [https://github.com/Stiverson/blog-backend-v2.git](https://github.com/Stiverson/blog-backend-v2.git)
    cd blog-backend-v2
    ```

2.  **Configurar variáveis de ambiente**
    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis. A `JWT_SECRET` deve ser uma string longa e aleatória para segurança.
    ```bash
    PORT=3000
    MONGODB_URI=mongodb://mongo:27017/blog
    JWT_SECRET=sua_chave_secreta_aqui
    ```

3.  **Rodar a aplicação via Docker (recomendado)**
    É necessário ter Docker e Docker Compose instalados.
    ```bash
    docker-compose up --build -d
    ```
    Isso iniciará o servidor e o banco de dados.

4.  **Popular o banco com dados de exemplo (seeder)**
    Para criar posts e usuários de teste (professor e aluno), use o seeder a partir do contêiner:
    ```bash
    docker-compose run --rm backend node seed.js
    ```
    - **Credenciais de Teste**:
      - **Professor**: `professor@alfa.com` / `senha123`
      - **Aluno**: `aluno@alfa.com` / `senha123`

### Endpoints da API

- **API de Posts**:
  - `GET /posts`: Listar todos os posts (acesso público).
  - `GET /posts/:id`: Buscar post por ID (acesso público).
  - `POST /posts`: Criar novo post (**protegido**).
  - `PUT /posts/:id`: Atualizar post (**protegido**).
  - `DELETE /posts/:id`: Deletar post (**protegido**).
- **API de Autenticação**:
  - `POST /auth/login`: Autenticar e obter um token JWT.

A API estará disponível em:
`http://localhost:3000/posts`

Swagger UI para documentação e testes:
`http://localhost:3000/api-docs`

---

### 🔗 Tecnologias utilizadas
- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Swagger (OpenAPI)
- Docker & Docker Compose
- GitHub Actions (CI/CD)

### 📁 Estrutura de pastas

blog-backend-v2/

```
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── README.md
├── server.js
├── swagger.js
├── /config
│   └── database.js
├── /controllers
│   ├── auth.controller.js
│   └── post.controller.js
├── /models
│   ├── Post.js
│   └── User.js
├── /routes
│   ├── auth.routes.js
│   └── post.routes.js
├── /middlewares
│   └── auth.middleware.js
├── /tests
└── .github/
└── workflows/
└── node.js.yml

```