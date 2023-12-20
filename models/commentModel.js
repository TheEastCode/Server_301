const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    targetGoal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal',
    },
    targetGame: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
    },
    targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Virtual field for target type and ID
commentSchema.virtual('target').get(function () {
    if (this.targetGoal) return { type: 'Goal', id: this.targetGoal };
    if (this.targetGame) return { type: 'Game', id: this.targetGame };
    if (this.targetUser) return { type: 'User', id: this.targetUser };
    return null;
});

// Method to set the target
commentSchema.methods.setTarget = function (targetType, targetId) {
    this[`target${targetType}`] = targetId;
};

module.exports = mongoose.model('Comment', commentSchema);
