const Attendance = require('../models/Attendance');


exports.createAttendance = async (req, res) => {
    try {
        const newAttendance = new Attendance({
            ...req.body,
            teacherId: req.user.id,
            status: 'aguardando' 
        });
        const saved = await newAttendance.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: "Erro ao registrar chamada" });
    }
};


exports.getTeacherHistory = async (req, res) => {
    try {
        const history = await Attendance.find({ teacherId: req.user.id });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar histórico" });
    }
};


exports.startClass = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.attendanceId,
            { 
                status: 'em_andamento', 
                actualStartTime: new Date() 
            },
            { new: true }
        );
        if (!attendance) return res.status(404).json({ message: "Chamada não encontrada" });
        res.status(200).json({ message: "Aula iniciada com sucesso!", attendance });
    } catch (error) {
        res.status(500).json({ message: "Erro ao iniciar aula" });
    }
};

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


exports.recordCheckIn = async (req, res) => {
    try {
        const { attendanceId } = req.params;
        const attendance = await Attendance.findById(attendanceId);
        
        if (!attendance) return res.status(404).json({ message: "Chamada não encontrada" });

       
        if (attendance.status !== 'em_andamento') {
            return res.status(400).json({ 
                message: `Check-in não permitido. A aula está com status: ${attendance.status}` 
            });
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
            { 
                $set: { 
                    "students.$.status": finalStatus,
                    "students.$.checkInTime": now
                } 
            },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Estudante não vinculado a esta aula" });

        res.status(200).json({ 
            message: `Check-in realizado como: ${finalStatus}`,
            status: finalStatus 
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao processar check-in" });
    }
};