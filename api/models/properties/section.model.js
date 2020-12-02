const { model, Schema } = require('mongoose')
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
    default: true
  }
})

module.exports = model('sections', sectionSchema)
