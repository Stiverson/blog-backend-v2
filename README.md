# Blog Backend API v2 - Fase 5 (Hackathon)

Blog Backend API v2 - Fase 5 (Hackathon)
Este projeto foi evoluído para uma arquitetura de Microserviços para atender aos requisitos da Fase 5 e do Hackathon. A aplicação foca na gestão educacional, introduzindo um sistema de Confirmação de Presença Digital para auxiliar professores. Desenvolvido com Node.js, Express e MongoDB, utiliza Docker para orquestração e GitHub Actions para CI.

✅ Funcionalidades

- Gestão de Presença (Novo): CRUD para registro e histórico de chamadas digitais.

- Arquitetura de Microserviços: Separação de domínios (Auth/Blog e Attendance) em containers independentes.

- Autenticação Centralizada: Login via JWT compartilhado entre os serviços.

- CRUD de Posts: Gerenciamento completo de conteúdos do blog.

- Configuração Cloud Ready: Pronto para deploy escalável via Docker Compose.

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

- Serviço	Porta Externa	Descrição
- Auth/Blog (Core)	3002	Login e Gerenciamento de Posts
- Attendance	3003	Registro e Histórico de Presença
- MongoDB	27017	Banco de dados compartilhado

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

blog-backend-v2/
├── docker-compose.yml (Configurado com 2 microserviços)
├── seed.js (Atualizado para Fase 5)
├── /src
│   ├── /controllers
│   │   ├── attendance.controller.js  <-- Novo
│   │   └── ...
│   ├── /models
│   │   ├── Attendance.js             <-- Novo
│   │   └── ...
│   ├── /routes
│   │   ├── attendance.routes.js     <-- Novo
│   │   └── ...
│   └── server.js

```