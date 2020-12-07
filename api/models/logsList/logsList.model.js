const { model, Schema } = require('mongoose')

const logSchema = new Schema({
  message: {
    type: String,
    required: true,
    default: ''
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  alertType: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('logslist', logSchema)
