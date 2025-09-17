require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./src/models/Post');
const User = require('./src/models/User'); 

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

    await User.deleteMany({}); 
    console.log('Usuários antigos removidos');

    await Post.insertMany(posts);
    console.log('Posts de exemplo inseridos');

    
    const professor = new User({
      email: 'professor@alfa.com',
      password: 'senha123', 
      role: 'professor'
    });
    await professor.save();
    console.log('Usuário Professor criado com sucesso.');

    
    const aluno = new User({
      email: 'aluno@alfa.com',
      password: 'senha123', 
      role: 'aluno'
    });
    await aluno.save();
    console.log('Usuário Aluno criado com sucesso.');
    
    mongoose.connection.close();
    console.log('Conexão com o banco de dados fechada.');
  } catch (error) {
    console.error('Erro ao inserir dados de exemplo:', error);
    process.exit(1);
  }
};

seedDB();