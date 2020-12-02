const { model, Schema } = require('mongoose')
const categoriesGroupSchema = new Schema({
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
  icon: {
    type: String,
  },
  visible: {
    type: Boolean,
    default: true
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      default: []
    }
  ]
})

module.exports = model('categoriesGroups', categoriesGroupSchema)
