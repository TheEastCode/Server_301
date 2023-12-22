const express = require('express')
const router = express.Router()
const {
  getComments,
  postComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController')

// const { protect } = require('../middleware/authMiddleware')
const { protect } = require('../middleware/auth0')

router.route('/').get(protect, getComments).post(protect, postComment)
router.route('/:id').delete(protect, deleteComment).put(protect, updateComment)

module.exports = router