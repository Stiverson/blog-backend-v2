const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Post = require('../models/Post');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/blogbackendv2test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Post.deleteMany(); // limpa os posts após cada teste
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Rotas de Posts', () => {

  it('GET / deve responder com mensagem de funcionamento', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('API funcionando!');
  });

  it('POST /posts deve criar um post com sucesso', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ title: 'Post Teste', content: 'Conteúdo', author: 'Autor' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('POST /posts deve falhar sem dados obrigatórios', async () => {
    const res = await request(app).post('/posts').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  it('GET /posts deve listar todos os posts', async () => {
    await Post.create({ title: 'Teste', content: 'Conteúdo', author: 'Autor' });

    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /posts/:id deve retornar um post específico', async () => {
    const post = await Post.create({ title: 'Unico', content: 'Conteudo', author: 'Autor' });

    const res = await request(app).get(`/posts/${post._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Unico');
  });

  it('GET /posts/:id deve retornar 404 para ID inexistente', async () => {
    const idFake = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/posts/${idFake}`);
    expect(res.statusCode).toBe(404);
  });

  it('PUT /posts/:id deve atualizar um post', async () => {
    const post = await Post.create({ title: 'Old', content: 'Old', author: 'Old' });

    const res = await request(app)
      .put(`/posts/${post._id}`)
      .send({ title: 'New', content: 'New', author: 'New' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('New');
  });

  it('PUT /posts/:id deve retornar 404 para atualização de post inexistente', async () => {
    const idFake = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/posts/${idFake}`)
      .send({ title: 'New', content: 'New', author: 'New' });

    expect(res.statusCode).toBe(404);
  });

  it('DELETE /posts/:id deve deletar um post', async () => {
    const post = await Post.create({ title: 'ToDelete', content: 'ToDelete', author: 'ToDelete' });

    const res = await request(app).delete(`/posts/${post._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Post removido com sucesso');
  });

  it('DELETE /posts/:id deve retornar 404 ao deletar post inexistente', async () => {
    const idFake = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/posts/${idFake}`);
    expect(res.statusCode).toBe(404);
  });

});
