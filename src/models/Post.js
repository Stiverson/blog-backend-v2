const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  tipo: { 
        type: String, 
        required: true,
        enum: ['Comunicado', 'Aviso', 'Outros'],
        default: 'Comunicado'
    },
  author: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Post', PostSchema);
