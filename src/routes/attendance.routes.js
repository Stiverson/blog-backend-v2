const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller.js');
const { protect } = require('../middlewares/auth.middleware');

// Rotas Base
router.post('/', protect, attendanceController.createAttendance);
router.get('/history', protect, attendanceController.getTeacherHistory);

// CRUD e Gestão Manual (Professor)
router.put('/:attendanceId', protect, attendanceController.updateAttendance);
router.delete('/:attendanceId', protect, attendanceController.deleteAttendance);
router.patch('/:attendanceId/manual', protect, attendanceController.manualUpdatePresence);

// Fluxo da Aula (Professor)
router.patch('/:attendanceId/start', protect, attendanceController.startClass);
router.patch('/:attendanceId/finish', protect, attendanceController.finishClass);

// Check-in (Estudante)
router.patch('/:attendanceId/checkin', protect, attendanceController.recordCheckIn);

module.exports = router;