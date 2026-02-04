const Attendance = require('../models/Attendance');

exports.createAttendance = async (req, res) => {
    try {
        const newAttendance = new Attendance({
            ...req.body,
            teacherId: req.user.id
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

exports.recordCheckIn = async (req, res) => {
    try {
        const { attendanceId } = req.params;
        const attendance = await Attendance.findById(attendanceId);
        
        if (!attendance) return res.status(404).json({ message: "Chamada não encontrada" });

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

        res.status(200).json({ 
            message: `Check-in realizado como: ${finalStatus}`,
            status: finalStatus 
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao processar check-in" });
    }
};