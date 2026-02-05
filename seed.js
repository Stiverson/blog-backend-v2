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

    // Criação do Professor (Alberto - seguindo o  Figma)
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

    // DEFINIÇÃO DOS HORÁRIOS PARA TESTE
    const agora = new Date();
    
    // Simula que a aula começou há 20 minutos atrás (para testar o atraso de 15min)
    const horarioInicio = new Date(agora.getTime() - 20 * 60000);
    
    // Simula que a aula termina daqui a 40 minutos
    const horarioFim = new Date(agora.getTime() + 40 * 60000);

    // Registro de Presença (Fase 5 - Hackathon) com as NOVAS REGRAS
    const chamadaExemplo = new Attendance({
      subject: 'Desenvolvimento Full Stack',
      teacherId: professor._id,
      date: agora,
      startTime: horarioInicio,      // Planejado para começar há 20 min
      endTime: horarioFim,          // Planejado para terminar em 40 min
      toleranceMinutes: 15,         // Tolerância de 15 min
      recurrence: 'Semanal',        // Exemplo de recorrência semanal
      
      
      status: 'em_andamento',       // Já inicia ativa para permitir o check-in do aluno
      contentAborted: 'Arquitetura de Microserviços e Docker',
      professorNotes: 'Aula prática sobre endpoints e comunicação entre serviços.',
      tokenQRCode: 'TOKEN_HACKATHON_2026',
      actualStartTime: horarioInicio, // Simulando que o professor deu "play" na hora certa

      students: [
        { 
          studentId: aluno._id, 
          name: 'João Silva', 
          status: 'Ausente' // Aluno começa como ausente no seed para você realizar o check-in
        }
      ]
    });

    await chamadaExemplo.save();
    console.log('Registro de Presença (Fase 5) atualizado com Status, Conteúdo e QR Code!');
    
    mongoose.connection.close();
    console.log('Conexão fechada.');
  } catch (error) {
    console.error('Erro no seed:', error);
    process.exit(1);
  }
};

seedDB();