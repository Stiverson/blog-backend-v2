require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./src/models/Post');

const posts = [
  {
    title: 'Primeiro post de exemplo',
    content: 'Este é o conteúdo do primeiro post de exemplo.',
    author: 'Admin'
  },
  {
    title: 'Segundo post de exemplo',
    content: 'Conteúdo do segundo post para popular o banco.',
    author: 'Admin'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB para seed');

    await Post.deleteMany({});
    console.log('Posts antigos removidos');

    await Post.insertMany(posts);
    console.log('Posts de exemplo inseridos');

    mongoose.connection.close();
  } catch (error) {
    console.error('Erro ao inserir posts de exemplo:', error);
    process.exit(1);
  }
};

seedDB();
