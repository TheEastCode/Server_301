const express = require('express')
const router = express.Router({ mergeParams: true })
const {
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController')

const { updateGoalCompletionStatus } = require('../controllers/goalController')
// const { protect } = require('../middleware/authMiddleware')
const { protect } = require('../middleware/auth0')

// Get a task and update goal completion status
router.get('/:taskId', protect, async (req, res, next) => {
  await getTask(req, res, next)
  updateGoalCompletionStatus(req.params.goalId)
})

// Create a task and update goal completion status
router.post('/', protect, async (req, res, next) => {
  await createTask(req, res, next)
  updateGoalCompletionStatus(req.params.goalId)
})

// Update a task and update goal completion status
router.put('/:taskId', protect, async (req, res, next) => {
  await updateTask(req, res, next)
  updateGoalCompletionStatus(req.params.goalId)
})

// Delete a task and update goal completion status
router.delete('/:taskId', protect, async (req, res, next) => {
  await deleteTask(req, res, next)
  updateGoalCompletionStatus(req.params.goalId)
})

module.exports = router
