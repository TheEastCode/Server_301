const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');

// @desc    Get comments
// @route   GET /api/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate('user', 'name email');

  res.status(200).json(comments);
});

// @desc    Set comment
// @route   POST /api/comments
// @access  Private
const setComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const comment = await Comment.create({
    text,
    user: req.user.id,
  });

  res.status(200).json(comment);
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  // Check authorization
  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedComment);
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  // Check authorization
  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await comment.remove();

  res.status(200).json({ id });
});

module.exports = {
  getComments,
  setComment,
  updateComment,
  deleteComment,
};
