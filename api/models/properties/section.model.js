const { model, Schema } = require('mongoose')
// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const sectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  title: {
    type: String,
    unique: true,
    required: true,
    default: ''
  },
  comment: {
    type: String,
    required: false
  },
  color: {
    type: Object,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
})

module.exports = model('sections', sectionSchema)
