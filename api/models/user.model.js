const { model, Schema } = require('mongoose')
// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const userSchema = new Schema({
  lastName: {
    type: String,
    required: false,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  date: {
    type: Date,
    default: Date.now
  },
  usersnotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'usersnotes',
      default: []
    }
  ]
})

module.exports = model('users', userSchema)
