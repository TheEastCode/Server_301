const asyncHandler = require('express-async-handler');
const Snake = require('../models/snakeModel');
const User = require('../models/userModel');

// Utility function to update goal completion status
const updateGoalsCompletionStatus = async (userId) => {
    const snake = await Snake.findOne({ user: userId });
    if (snake && snake.goalsCompleted >= 5 && !snake.snakeGameAllowed) {
        snake.snakeGameAllowed = true;
        await snake.save();
    }
};

// @desc    Get user 5-goal completion status
// @access  Private
const getGoalsCompletionStatus = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const snake = await Snake.findOne({ user: userId });
    if (!snake) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update the goal completion status
    await updateGoalsCompletionStatus(userId);

    res.json({ goalsCompleted: snake.goalsCompleted, snakeGameAllowed: snake.snakeGameAllowed });
});

// @desc    Get user classic snake game high scores
// @access  Authenticated
const getUserHighScores = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const snake = await Snake.findOne({ user: userId });
    if (!snake) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ highestScore: snake.highestScore });
});

// @desc    Get top 10 classic snake game high scores
// @access  Authenticated
const getAllHighScores = asyncHandler(async (req, res) => {
    const topScores = await Snake.find({}).sort({ highestScore: -1 }).limit(10);

    res.json(topScores);
});

// @desc    Post user score
// @route   POST /api/snakeGame
// @access  Private
const setScore = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { score } = req.body;

    const snake = await Snake.findOne({ user: userId });
    if (!snake) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (score > snake.highestScore) {
        snake.highestScore = score;
        await snake.save();
    }

    res.status(201).json(snake);
});

// @desc    Update user score
// @route   PUT /api/snakeGame/:userId
// @access  Private
const updateUserHighScore = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const { score } = req.body;

    const snake = await Snake.findOne({ user: userId });
    if (!snake) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (score > snake.highestScore) {
        snake.highestScore = score;
        await snake.save();
    }

    res.json(snake);
});

module.exports = {
    getGoalsCompletionStatus,
    getUserHighScores,
    getAllHighScores,
    setScore,
    updateUserHighScore
};
