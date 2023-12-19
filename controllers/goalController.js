const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    Update goal completion status
// @access  Private
const updateGoalCompletionStatus = async (goalId) => {
  const goal = await Goal.findById(goalId);
  // Check if the goal exists
  if (!goal) {
    // Handle the case where the goal is not found, e.g., throw an error or return a value
    throw new Error('Goal not found');
  }
  // Ensure goal.tasks is treated as an empty array if it's null or undefined
  const tasks = goal.tasks || [];
  const incompleteTaskCount = tasks.filter(task => !task.completed).length;
  const isCompleted = incompleteTaskCount === 0;
  await Goal.findByIdAndUpdate(goalId, { isCompleted });
};


// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});


// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.description) {
    res.status(400);
    throw new Error('Please add a description');
  }

  const goal = await Goal.create({
    description: req.body.description,
    user: req.user.id,
  });
  res.status(200).json(goal);
});


// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedGoal);
});


// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  // Delete all tasks associated with the goal
  await Task.deleteMany({ goal: goal._id });
  // Delete the goal
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});


module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
  updateGoalCompletionStatus
};
