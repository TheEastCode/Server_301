const mongoose = require('mongoose');

const snakeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    highestScore: {
        type: Number,
        default: 0,
    },
    goalsCompleted: {
        type: Number,
        default: 0
    },
    snakeGameAllowed: {
        type: Boolean,
        default: false, // Initially, playing the snake game is not allowed
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Goal', snakeSchema);
