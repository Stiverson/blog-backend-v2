require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); 
const connectDB = require('./config/database'); 
// Conecta as rotas usando o caminho absoluto
const postRoutes = require(path.join(__dirname, 'routes', 'post.routes')); 
const authRoutes = require(path.join(__dirname, 'routes', 'auth.routes')); 
const userRoutes = require (path.join(__dirname, 'routes', 'user.routes'));
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Rotas de Post
app.use('/posts', postRoutes);

app.use('/auth', authRoutes); 

// Conecta as rotas de gerenciamento de usuários
app.use('/users', userRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

// Conexão MongoDB
if (process.env.NODE_ENV !== 'test') {
  connectDB(); 

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;