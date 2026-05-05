const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Judul task wajib diisi'],
    trim: true,
    minlength: [1, 'Judul tidak boleh kosong']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline wajib diisi'],
    validate: {
      validator: (v) => v instanceof Date && !isNaN(v),
      message: 'Format deadline tidak valid'
    }
  },
  category: {
    type: String,
    required: [true, 'Kategori wajib diisi'],
    enum: {
      values: ['kuliah', 'kerja', 'pribadi'],
      message: 'Kategori harus salah satu dari: kuliah, kerja, pribadi'
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  order: {
    type: Number,
    default: 0
  },
  completedAt: {
    type: Date,
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID wajib diisi']
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    default: null
  }
}, {
  timestamps: true
});

// Index untuk query performance
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ boardId: 1, status: 1 });
taskSchema.index({ userId: 1, boardId: 1, order: 1 });

// Middleware untuk mengelola field completedAt saat status berubah
taskSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (this.status === 'completed' && !this.completedAt) {
      this.completedAt = new Date();
    } else if (this.status === 'pending') {
      this.completedAt = null;
    }
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
