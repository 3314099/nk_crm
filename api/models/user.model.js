const { model, Schema } = require('mongoose')
// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const userSchema = new Schema({
  logslist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'logslist'
    }
  ],
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
  ],
  sections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'sections'
    }
  ],
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'groups'
    }
  ],
  categoriesGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'categoriesGroups'
    }
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'categories'
    }
  ]
})

module.exports = model('users', userSchema)
