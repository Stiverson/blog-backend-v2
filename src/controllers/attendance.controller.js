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