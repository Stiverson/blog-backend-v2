const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  
 
  startTime: { type: Date, required: true }, 
  toleranceMinutes: { type: Number, default: 15 }, 
  recurrence: { 
    type: String, 
    enum: ['Única', 'Semanal', 'Mensal'], 
    default: 'Única' 
  },

  students: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    checkInTime: { type: Date }, 
    status: { 
      type: String, 
      enum: ['Presente', 'Atrasado', 'Ausente'], 
      default: 'Ausente' 
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);