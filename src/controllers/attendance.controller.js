const Attendance = require('../models/Attendance');
const User = require('../models/User'); // Import necessário para buscar alunos

// Criar Aula - ATUALIZADO: Inclui todos os alunos e gera QR Code
exports.createAttendance = async (req, res) => {
    try {
        // Busca todos os alunos da base para vincular à aula automaticamente
        const allStudents = await User.find({ role: 'aluno' });
        const studentsList = allStudents.map(s => ({
            studentId: s._id,
            name: s.email.split('@')[0], // Nome extraído do e-mail
            status: 'Ausente'
        }));

        const newAttendance = new Attendance({
            ...req.body,
            teacherId: req.user.id,
            status: 'aguardando',
            students: studentsList,
            // Gera um token aleatório inicial de 6 caracteres
            tokenQRCode: Math.random().toString(36).substring(7).toUpperCase()
        });
        
        const saved = await newAttendance.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: "Erro ao registrar chamada" });
    }
};

// Histórico do Professor
exports.getTeacherHistory = async (req, res) => {
    try {
        const isProfessorOrAdmin = req.user.role === 'professor' || req.user.role === 'admin';
        const query = isProfessorOrAdmin
            ? { teacherId: req.user.id }
            : { "students.studentId": req.user.id };

        const history = await Attendance.find(query).sort({ startTime: 1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar histórico" });
    }
};

// Iniciar Aula - ATUALIZADO: Regenera o Token do QR Code
exports.startClass = async (req, res) => {
    try {
        const newToken = Math.random().toString(36).substring(7).toUpperCase();
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.attendanceId,
            { 
                status: 'em_andamento', 
                actualStartTime: new Date(),
                tokenQRCode: newToken // Token novo para segurança no start
            },
            { new: true }
        );
        if (!attendance) return res.status(404).json({ message: "Chamada não encontrada" });
        res.status(200).json({ message: "Aula iniciada e QR Code atualizado!", attendance });
    } catch (error) {
        res.status(500).json({ message: "Erro ao iniciar aula" });
    }
};

// Finalizar Aula
exports.finishClass = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.attendanceId,
            { 
                status: 'finalizada', 
                actualEndTime: new Date() 
            },
            { new: true }
        );
        if (!attendance) return res.status(404).json({ message: "Chamada não encontrada" });
        res.status(200).json({ message: "Aula finalizada com sucesso!", attendance });
    } catch (error) {
        res.status(500).json({ message: "Erro ao finalizar aula" });
    }
};

// Update de Aula (CRUD) - NOVO
exports.updateAttendance = async (req, res) => {
    try {
        const updated = await Attendance.findByIdAndUpdate(
            req.params.attendanceId, 
            req.body, 
            { new: true }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar aula" });
    }
};

// Exclusão de Aula (CRUD) - NOVO
exports.deleteAttendance = async (req, res) => {
    try {
        await Attendance.findByIdAndDelete(req.params.attendanceId);
        res.status(200).json({ message: "Aula excluída com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir aula" });
    }
};

// Gestão Manual de Presença pelo Professor - NOVO
exports.manualUpdatePresence = async (req, res) => {
    try {
        const { attendanceId } = req.params;
        const { studentId, status } = req.body; // status: 'Presente' ou 'Ausente'

        const updated = await Attendance.findOneAndUpdate(
            { _id: attendanceId, "students.studentId": studentId },
            { $set: { "students.$.status": status, "students.$.checkInTime": new Date() } },
            { new: true }
        );
        res.status(200).json({ message: "Presença atualizada manualmente", updated });
    } catch (error) {
        res.status(500).json({ message: "Erro na atualização manual" });
    }
};

// Check-in do Aluno (Mantido com trava de status)
exports.recordCheckIn = async (req, res) => {
    try {
        const { attendanceId } = req.params;
        const { tokenQRCode } = req.body; // Aluno envia o token lido no QR
        
        const attendance = await Attendance.findById(attendanceId);
        if (!attendance) return res.status(404).json({ message: "Chamada não encontrada" });

        // Validação de Status e do Token do QR Code
        if (attendance.status !== 'em_andamento') {
            return res.status(400).json({ message: "Aula não está em andamento" });
        }
        if (attendance.tokenQRCode !== tokenQRCode) {
            return res.status(403).json({ message: "QR Code inválido ou expirado" });
        }

        const now = new Date();
        const start = new Date(attendance.startTime);
        const diffMinutes = (now - start) / (1000 * 60);
        
        let finalStatus = 'Presente';
        if (diffMinutes > attendance.toleranceMinutes) {
            finalStatus = 'Atrasado'; 
        }

        const updated = await Attendance.findOneAndUpdate(
            { _id: attendanceId, "students.studentId": req.user.id },
            { $set: { "students.$.status": finalStatus, "students.$.checkInTime": now } },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Estudante não vinculado" });
        res.status(200).json({ status: finalStatus });
    } catch (error) {
        res.status(500).json({ message: "Erro no check-in" });
    }
};
