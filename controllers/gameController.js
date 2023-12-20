const asyncHandler = require('express-async-handler');
const Game = require('../models/gameModel');
const User = require('../models/userModel');


// Utility function to update goal completion status
const updateGoalsCompletionStatus = async (userId) => {
    const user = await User.findOne({ user: userId })
    if (user && user.goalsCompleted >= 5 && !user.snakeGameAllowed) {
        user.snakeGameAllowed = true;
        await user.save();
    }
};


// @desc    Get user 5-goal completion status
// @access  Private
const getGoalsCompletionStatus = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Update the goal completion status
    await updateGoalsCompletionStatus(userId);
    res.json({
        goalsCompleted: user.goalsCompleted,
        snakeGameAllowed: user.snakeGameAllowed
    });
});


// @desc    Get user classic snake game high scores
// @access  Authenticated
const getUserHighScores = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const game = await Game.findOne({ user: userId })
    if (!game) {
        return res.status(404).json({ message: 'User not found' })
    }
    res.json({ highestScore: game.highestScore });
});


// @desc    Get top 10 classic snake game high scores
// @access  Authenticated
const getAllHighScores = asyncHandler(async (req, res) => {
    const topScores = await Game.find({})
        .populate('user')
        .sort({ highestScore: -1 })
        .limit(10)

    res.json(topScores);
});


// @desc    Post user score
// @route   POST /api/snakeGame
// @access  Private
const setScore = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { score } = req.body;
    const game = await Game.findOne({ user: userId });
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    if (score > game.highestScore) {
        game.highestScore = score;
        await game.save();
    }
    res.status(201).json(game);
});


// @desc    Update user score
// @route   PUT /api/snakeGame/:userId
// @access  Private
const updateUserHighScore = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const { score } = req.body;
    const game = await Game.findOne({ user: userId });
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    if (score > game.highestScore) {
        game.highestScore = score;
        await game.save();
    }
    res.json(game);
});


module.exports = {
    getGoalsCompletionStatus,
    getUserHighScores,
    getAllHighScores,
    setScore,
    updateUserHighScore
};
