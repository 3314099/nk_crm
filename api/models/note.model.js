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
  userId: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'users'
  }
  // creatorID: {
  // type: Schema.Types.ObjectId,
  //   ref: 'users'
  // }
})

module.exports = model('usersnotes', noteSchema)
