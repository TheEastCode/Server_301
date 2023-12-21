const express = require('express')
const router = express.Router()
const {
    getGoalsCompletionStatus,
    getUserHighScores,
    getAllHighScores,
    setScore,
    updateUserHighScore
} = require('../controllers/gameController')

// const { protect } = require('../middleware/authMiddleware')
const { protect } = require('../middleware/auth0')

// Assuming you have middleware for authentication
router.get('/completion-status', protect, getGoalsCompletionStatus)
router.get('/high-scores', protect, getUserHighScores)
router.get('/all-high-scores', protect, getAllHighScores)
router.post('/score', protect, setScore)
router.put('/score/:userId', protect, updateUserHighScore)

module.exports = router
