const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  students: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    status: { 
      type: String, 
      enum: ['Presente', 'Ausente', 'Justificado'], 
      default: 'Ausente' 
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);