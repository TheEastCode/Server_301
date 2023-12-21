const express = require('express')
const router = express.Router()
const {
  getPublicGoals,
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController')

// const { protect } = require('../middleware/authMiddleware')
const { protect } = require('../middleware/auth0')

router.route('/').get(protect, getGoals).post(protect, createGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)
router.route('/public').get(protect, getPublicGoals)

module.exports = router
