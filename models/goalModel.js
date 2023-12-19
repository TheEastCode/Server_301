const mongoose = require('mongoose');

// Corrected the tasksSchema
const tasksSchema = mongoose.Schema({
  name: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const goalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  tasks: [tasksSchema],
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Goal', goalSchema);
