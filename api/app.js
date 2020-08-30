const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const passport = require('passport')
// const passportStrategy = require('./middleware/passport-strategy')

const keys = require('./keys')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.error(error))

// app.use(passport.initialize()) // TODO блок5, видео 8

// passport.use(passportStrategy)

module.exports = app
