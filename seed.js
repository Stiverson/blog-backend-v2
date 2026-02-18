require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./src/models/Post');
const User = require('./src/models/User'); 
const Attendance = require('./src/models/Attendance');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB para seed');

    // Limpeza Geral
    await Post.deleteMany({});
    await User.deleteMany({}); 
    await Attendance.deleteMany({});
    console.log('Dados antigos removidos');

    // 1. Criação do Professor (Alberto - conforme Figma)
    const professor = new User({
      email: 'professor@alfa.com',
      password: 'senha123', 
      role: 'professor'
    });
    await professor.save();

    // 2. Criação de múltiplos Alunos para testar a nova funcionalidade
    const alunosParaCriar = [
      { email: 'aluno@alfa.com', password: 'senha123', role: 'aluno' },
      { email: 'maria.aluna@alfa.com', password: 'senha123', role: 'aluno' },
      { email: 'pedro.dev@alfa.com', password: 'senha123', role: 'aluno' }
    ];
    
    const alunosCriados = [];
    for (const alunoData of alunosParaCriar) {
      const aluno = new User(alunoData);
      await aluno.save();
      alunosCriados.push(aluno);
    }
    
    console.log(`${alunosCriados.length} Alunos criados na base.`);

    // 3. Mimetizando a lógica do novo Controller: Vincular todos os alunos automaticamente
    const studentsList = alunosCriados.map(s => ({
      studentId: s._id,
      name: s.email.split('@')[0],
      status: 'Ausente'
    }));

    const agora = new Date();
    const horarioInicio = new Date(agora.getTime() - 20 * 60000); // Há 20 min
    const horarioFim = new Date(agora.getTime() + 40 * 60000);

    const chamadaExemplo = new Attendance({
      subject: 'Desenvolvimento Full Stack',
      teacherId: professor._id,
      date: agora,
      startTime: horarioInicio,
      endTime: horarioFim,
      toleranceMinutes: 15,
      recurrence: 'Semanal',
      status: 'em_andamento', // Já inicia ativa para testes
      contentAborted: 'Arquitetura de Microserviços e Docker',
      professorNotes: 'Aula prática sobre endpoints e comunicação entre serviços.',
      tokenQRCode: 'TOKEN_SEED_2026', // Token inicial dinâmico
      actualStartTime: horarioInicio,
      students: studentsList // Lista populada automaticamente com todos os alunos
    });

    await chamadaExemplo.save();
    console.log('Seeder Finalizado: Aula criada com TODOS os alunos da base!');
    
    mongoose.connection.close();
    console.log('Conexão fechada.');
  } catch (error) {
    console.error('Erro no seed:', error);
    process.exit(1);
  }
};

seedDB();