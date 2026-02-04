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

    // Criação do Professor (Alberto - conforme Figma)
    const professor = new User({
      email: 'professor@alfa.com',
      password: 'senha123', 
      role: 'professor'
    });
    await professor.save();

    // Criação do Aluno (João Silva)
    const aluno = new User({
      email: 'aluno@alfa.com',
      password: 'senha123', 
      role: 'aluno'
    });
    await aluno.save();
    console.log('Usuários Professor e Aluno criados.');

    // DEFINIÇÃO DO HORÁRIO PARA TESTE
    // Vamos simular que a aula começou há 20 minutos atrás
    const horarioInicio = new Date();
    horarioInicio.setMinutes(horarioInicio.getMinutes() - 20);

    // Registro de Presença (Fase 5 - Hackathon) com as NOVAS REGRAS
    const chamadaExemplo = new Attendance({
      subject: 'Desenvolvimento Full Stack',
      teacherId: professor._id,
      date: new Date(),
      startTime: horarioInicio, // Início da aula (há 20 min)
      toleranceMinutes: 15,      // Tolerância de 15 min
      recurrence: 'Semanal',     // Exemplo de recorrência semanal
      students: [
        { 
          studentId: aluno._id, 
          name: 'João Silva', 
          status: 'Presente',
          checkInTime: horarioInicio // Ele chegou exatamente na hora
        }
      ]
    });

    await chamadaExemplo.save();
    console.log('Registro de Presença (Fase 5) criado com Tolerância e Recorrência!');
    
    mongoose.connection.close();
    console.log('Conexão fechada.');
  } catch (error) {
    console.error('Erro no seed:', error);
    process.exit(1);
  }
};

seedDB();