const asyncHandler = require("express-async-handler")
const Comment = require("../models/commentModel")
const User = require("../models/userModel")


// @desc    Get comments
// @route   GET /api/comments
// @access  Authenticated
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
    .populate("user")
    .sort({ createdAt: "desc" })
    .lean()
  res.status(200).json(comments)
})


// @desc    Post a comment
// @route   POST /api/comments/:type/:id
// @access  Private
const postComment = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Please add a text field")
  }
  const comment = await Comment.create({
    text: req.body.text,
    user: req.user.id
  })
  res.status(200).json(comment)
})


// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)

  if (!comment) {
    res.status(400)
    throw new Error("Comment not found")
  }
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }
  // Make sure the logged in user matches the comment user
  if (comment.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )
  res.status(200).json(updatedComment)
})


// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)

  if (!comment) {
    res.status(400)
    throw new Error("Comment not found")
  }
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }
  // Make sure the logged in user matches the comment user
  if (comment.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await comment.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getComments,
  postComment,
  updateComment,
  deleteComment,
}
