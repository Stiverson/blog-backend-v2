const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Post = require('../models/Post');

// Validação para criar/atualizar post
const postValidationRules = [
  body('title').notEmpty().withMessage('O título é obrigatório'),
  body('content').notEmpty().withMessage('O conteúdo é obrigatório'),
  body('author').notEmpty().withMessage('O autor é obrigatório')
];

// Middleware para verificar os erros de validação
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET /posts - Listar todos os posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar posts', error });
  }
});

// GET /posts/:id - Buscar post por ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post não encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar post', error });
  }
});

// POST /posts - Criar novo post (com validação)
router.post('/', postValidationRules, validate, async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar post', error });
  }
});

// PUT /posts/:id - Atualizar post (com validação)
router.put('/:id', postValidationRules, validate, async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Post não encontrado' });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar post', error });
  }
});

// DELETE /posts/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post não encontrado' });
    res.json({ message: 'Post removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar post', error });
  }
});

module.exports = router;
