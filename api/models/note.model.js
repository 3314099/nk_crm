const { model, Schema } = require('mongoose')
// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

const noteSchema = new Schema({
  text: {
    type: String,
    required: true,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  adminId: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'users'
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'users'
  }
})

module.exports = model('usersnotes', noteSchema)
