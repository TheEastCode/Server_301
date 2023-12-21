const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    nickname: {
      type: String
    },
    name: {
      type: String
    },
    picture: {
      type: String
    },
    updated_at: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    email_verified: {
      type: String
    },
    iss: {
      type: String
    },
    aud: {
      type: String
    },
    iat: {
      type: Number
    },
    exp: {
      type: Number
    },
    sub: {
      type: String
    },
    sid: {
      type: String
    },
    nonce: {
      type: String
    },
    token: {
      type: String
    },
    goalsCompleted: {
      type: Number,
      default: 0
    },
    snakeGameAllowed: {
      type: Boolean,
      default: false,
    },
    games: {
      score: {
        type: Number,
        default: 0,
      },
      updated: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
