const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    score: {
        type: Number,
        default: 0,
    },
    highestScore: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Game', gameSchema);
