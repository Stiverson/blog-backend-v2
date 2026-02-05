const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  
 
  startTime: { type: Date, required: true }, 
  endTime: { type: Date }, 
  toleranceMinutes: { type: Number, default: 15 }, 
  recurrence: { 
    type: String, 
    enum: ['Única', 'Semanal', 'Mensal'], 
    default: 'Única' 
  },

  contentAborted: { type: String, default: "" }, 
  professorNotes: { type: String, default: "" },
  tokenQRCode: { type: String }, 
  status: { 
    type: String, 
    enum: ['aguardando', 'em_andamento', 'finalizada'], 
    default: 'aguardando' 
  },

 
  actualStartTime: { type: Date }, 
  actualEndTime: { type: Date },

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