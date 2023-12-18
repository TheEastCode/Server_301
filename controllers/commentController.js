const asyncHandler = require('express-async-handler')

const Comment = require('../models/commentModel')
const User = require('../models/userModel')


// @desc    Get comments
// @route   GET /api/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  const goals = await Comment.find()

  res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setComment = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Comment.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const goal = await Comment.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Comment not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedComment)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const goal = await Comment.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Comment not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getComments,
  setComment,
  updateComment,
  deleteComment,
}
