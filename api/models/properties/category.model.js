const { model, Schema } = require('mongoose')
const categorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  groupId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'categoriesGroups'
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
  expenses: {
    type: Boolean,
    default: true
  },
  entrances: {
    type: Boolean,
    default: true
  },
  visible: {
    type: Boolean,
    default: true
  }
})

module.exports = model('categories', categorySchema)
