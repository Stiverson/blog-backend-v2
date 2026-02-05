const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller.js');

const authMiddleware = require('../middlewares/auth.middleware');
const protect = authMiddleware.protect; 


console.log('Controller carregado:', attendanceController);
console.log('Função de proteção carregada:', protect); 


router.post('/', protect, attendanceController.createAttendance);
router.get('/history', protect, attendanceController.getTeacherHistory);


router.patch('/:attendanceId/checkin', protect, attendanceController.recordCheckIn);

router.patch('/:attendanceId/start', protect, attendanceController.startClass);
router.patch('/:attendanceId/finish', protect, attendanceController.finishClass);

module.exports = router;