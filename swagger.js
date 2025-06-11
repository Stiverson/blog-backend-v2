const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Blog Backend API',
    version: '1.0.0',
    description: 'Documentação completa da API de Posts para o Blog Backend v2',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local',
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
          500: {
            description: 'Erro interno ao buscar posts',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
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
          400: {
            description: 'Dados inválidos para criação de post',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          500: {
            description: 'Erro interno ao criar post',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
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
          404: {
            description: 'Post não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          500: {
            description: 'Erro interno ao buscar post',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
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
          400: {
            description: 'Erro ao atualizar post',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          404: {
            description: 'Post não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
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
          404: {
            description: 'Post não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          500: {
            description: 'Erro interno ao deletar post',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Post: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '60c72b2f9b1e8c1a88e4b0e3' },
          title: { type: 'string', example: 'Título do Post' },
          content: { type: 'string', example: 'Conteúdo do post aqui.' },
          author: { type: 'string', example: 'João Silva' },
          createdAt: { type: 'string', format: 'date-time', example: '2024-06-10T12:00:00Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2024-06-10T12:30:00Z' },
        },
      },
      PostInput: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Título do Post' },
          content: { type: 'string', example: 'Conteúdo do post aqui.' },
          author: { type: 'string', example: 'João Silva' },
        },
        required: ['title', 'content', 'author'],
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Erro ao buscar post' },
          errors: {
            type: 'array',
            items: { type: 'string' },
            example: ['Campo title é obrigatório'],
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
