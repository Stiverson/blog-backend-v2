const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
