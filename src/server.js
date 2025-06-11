require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Rotas de Post
app.use('/posts', postRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conexão MongoDB (para testes vamos usar um if)
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app; 
