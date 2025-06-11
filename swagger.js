const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Blog Backend API',
    version: '1.0.0',
    description: 'Documentação da API de Posts para o Blog Backend v2',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
  paths: {
    '/posts': {
      get: {
        summary: 'Listar todos os posts',
        responses: {
          200: {
            description: 'Lista de posts retornada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Post' },
                },
              },
            },
          },
          500: { description: 'Erro ao buscar posts' },
        },
      },
      post: {
        summary: 'Criar um novo post',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PostInput' },
            },
          },
        },
        responses: {
          201: { description: 'Post criado com sucesso' },
          400: { description: 'Erro ao criar post' },
        },
      },
    },
    '/posts/{id}': {
      get: {
        summary: 'Buscar um post por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Post encontrado' },
          404: { description: 'Post não encontrado' },
          500: { description: 'Erro ao buscar post' },
        },
      },
      put: {
        summary: 'Atualizar um post existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PostInput' },
            },
          },
        },
        responses: {
          200: { description: 'Post atualizado com sucesso' },
          400: { description: 'Erro ao atualizar post' },
          404: { description: 'Post não encontrado' },
        },
      },
      delete: {
        summary: 'Remover um post',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Post removido com sucesso' },
          404: { description: 'Post não encontrado' },
          500: { description: 'Erro ao deletar post' },
        },
      },
    },
  },
  components: {
    schemas: {
      Post: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          content: { type: 'string' },
          author: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      PostInput: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
          author: { type: 'string' },
        },
        required: ['title', 'content', 'author'],
      },
    },
  },
};

module.exports = swaggerDocument;
