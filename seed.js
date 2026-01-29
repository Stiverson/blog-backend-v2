require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./src/models/Post');
const User = require('./src/models/User'); 
const Attendance = require('./src/models/Attendance');

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
    // Usando MONGO_URI 
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB para seed');

    // Limpeza Geral
    await Post.deleteMany({});
    await User.deleteMany({}); 
    await Attendance.deleteMany({});
    console.log('Dados antigos removidos (Posts, Usuários e Presenças)');

    // Inserção de Posts (Fase anteriores)
    await Post.insertMany(posts);
    console.log('Posts de exemplo inseridos');

    // Criação do Professor
    const professor = new User({
      email: 'professor@alfa.com',
      password: 'senha123', 
      role: 'professor'
    });
    await professor.save();
    console.log('Usuário Professor criado.');

    // Criação do Aluno
    const aluno = new User({
      email: 'aluno@alfa.com',
      password: 'senha123', 
      role: 'aluno'
    });
    await aluno.save();
    console.log('Usuário Aluno criado.');

    // NOVO: Registro de Presença (Fase 5 - Hackathon)
    const chamadaExemplo = new Attendance({
      subject: 'Desenvolvimento Full Stack',
      teacherId: professor._id,
      date: new Date(),
      students: [
        { 
          studentId: aluno._id, 
          name: 'Aluno Exemplo', 
          status: 'Presente' 
        }
      ]
    });
    await chamadaExemplo.save();
    console.log('Registro de Presença inicial criado com sucesso!');
    
    mongoose.connection.close();
    console.log('Conexão fechada.');
  } catch (error) {
    console.error('Erro no seed:', error);
    process.exit(1);
  }
};

seedDB();