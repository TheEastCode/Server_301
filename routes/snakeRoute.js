const express = require('express');
const router = express.Router();
const {
    getGoalsCompletionStatus,
    getUserHighScores,
    getAllHighScores,
    setScore,
    updateUserHighScore
} = require('../controllers/snakeController');

// Assuming you have middleware for authentication
router.get('/completion-status', authMiddleware, getGoalsCompletionStatus);
router.get('/high-scores', authMiddleware, getUserHighScores);
router.get('/all-high-scores', authMiddleware, getAllHighScores);
router.post('/score', authMiddleware, setScore);
router.put('/score/:userId', authMiddleware, updateUserHighScore);

module.exports = router;
