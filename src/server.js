require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database'); 
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
