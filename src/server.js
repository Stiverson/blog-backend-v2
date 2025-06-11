// src/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Rotas de Post
app.use('/posts', postRoutes);

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
