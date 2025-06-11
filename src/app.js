const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Middlewares
app.use(morgan('dev'));   
app.use(cors());           
app.use(express.json());   

// Test route
app.get('/', (req, res) => {
  res.send('API Blog Backend v2.0 funcionando!');
});


module.exports = app;
// só pro commit funfar