const { Schema, model } = require('mongoose')

const testSchema = new Schema({
  title: String
})

module.exports = model('tests', testSchema)
