const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['owner', 'member'],
    default: 'member'
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama board wajib diisi'],
    trim: true,
    minlength: [1, 'Nama board tidak boleh kosong']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner ID wajib diisi']
  },
  members: [memberSchema]
}, {
  timestamps: true
});

// Index untuk query performance
boardSchema.index({ ownerId: 1 });
boardSchema.index({ 'members.userId': 1 });

// Method untuk check apakah user adalah member
boardSchema.methods.isMember = function(userId) {
  return this.members.some(m => m.userId.toString() === userId.toString());
};

// Method untuk check apakah user adalah owner
boardSchema.methods.isOwner = function(userId) {
  return this.ownerId.toString() === userId.toString();
};

module.exports = mongoose.model('Board', boardSchema);
