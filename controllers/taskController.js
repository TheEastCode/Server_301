const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const { updateGoalCompletionStatus } = require('./goalController');


// @desc    Get task for a goal
// @route   GET /api/goals/:goalId/tasks/:taskId
// @access  Private
const getTask = asyncHandler(async (req, res) => {
  const { goalId, taskId } = req.params;
  const goal = await Goal.findById(goalId);
  // Filter out task
  const task = goal.tasks.filter(task => task._id === taskId);
  await updateGoalCompletionStatus(goalId);
  res.status(200).json(task);
});


// @desc    Create a new task for a goal
// @route   POST /api/goals/:goalId/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const id = req.params.goalId
  const { goalId } = req.params;
  const { name } = req.body;
  const task = await Goal.findByIdAndUpdate(id, {$push: {tasks: {name: name}} })
  await updateGoalCompletionStatus(goalId);
  res.status(201).json(task);
});


// @desc    Update a task
// @route   PUT /api/goals/:id/tasks/:taskId
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { goalId, taskId } = req.params;
  const taskUpdates = req.body;
  const goal = await Goal.findById(goalId);

  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }
  // Find the task by taskId
  const task = goal.tasks.id(taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  // Update task fields
  Object.assign(task, taskUpdates);
  // Save the updated goal
  await goal.save();
  await updateGoalCompletionStatus(goalId);
  res.status(200).json(task);
});


// @desc    Delete a task
// @route   DELETE /api/goals/:goalId/tasks/:taskId
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const { goalId, taskId } = req.params;
  const goal = await Goal.findById(goalId);

  if (!goal) {
    res.status(404);
    throw new Error('Goal not found');
  }
  // Find the index of the task to be removed
  const taskIndex = goal.tasks.findIndex(task => task._id.toString() === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  // Remove the task from the tasks array
  goal.tasks.splice(taskIndex, 1);
  // Save the updated goal
  await goal.save();
  await updateGoalCompletionStatus(goalId);
  res.status(200).json({ message: 'Task deleted', taskId });
});


module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask
};
