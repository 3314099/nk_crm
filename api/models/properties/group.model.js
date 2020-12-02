const { model, Schema } = require('mongoose')
const groupSchema = new Schema({
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
  typeOfGroup: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    default: true
  }
})

module.exports = model('groups', groupSchema)
