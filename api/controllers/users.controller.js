const bcrypt = require('bcrypt')
const saltRounds = 8
const User = require('../models/user.model')
const Note = require('../models/note.model')

module.exports.getAll = async (req, res) => {
  try {
    const users = await User.find()
    // const users = await User.find().populate('usersnotes')
    res.json(users)
  } catch (err) {
    res.status(201).json({ message: 'failedGetAllUsers' })
  }
}

module.exports.createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds)
    const user = new User({
      lastName: req.body.lastName,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, salt)
    })
    await user.save()
    res.status(201).json({ message: 'newUserIsRegistered', user })
  } catch (e) {
    res.status(409).json({ message: 'failedCreateUser' })
  }
}

module.exports.update = async (req, res) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const $set = {
    lastName: req.body.lastName,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    role: req.body.role,
    usersnotes: req.body.usersnotes
  }
  try {
    const user = await User.findOneAndUpdate({
      _id: req.params.id
    }, { $set }, { overwrite: true })
    res.json({ message: 'userUpdated', user })
  } catch (e) {
    res.status(409).json({ message: 'failedUserUpdate' })
  }
}

module.exports.removeUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id })
    await Note.deleteMany({ userId: req.params.id })
    res.status(201).json({ message: 'userDeleted' })
  } catch (e) {
    res.status(409).json({ message: 'failedDeleteUser' })
  }
}

module.exports.createNote = async (req, res) => {
  try {
    const { adminId, recipientId, text } = req.body
    const note = new Note({ adminId, recipientId, text })
    await note.save()

    const user = await User.findById(req.body.recipientId)
    user.usersnotes.push(note._id)
    await user.save()

    res.status(201).json({ message: 'newNoteCreated', note })
  } catch (e) {
    res.status(409).json({ message: 'failedCreateNote' })
  }
}

module.exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('usersnotes')
    res.json(user)
    // // -----------------------------
    // const test = new Test({ title: req.params.id })
    // await test.save()
    // // -----------------------------
  } catch (e) {
    res.status(500).json({ message: 'failedGetUserById' })
  }
}
module.exports.getAllUsersNotes = async (req, res) => {
  try {
    const results = await Note.find()
    res.json(results)
    // // -----------------------------
    // const test = new Test({ title: req.params.id })
    // await test.save()
    // // -----------------------------
  } catch (e) {
    res.status(500).json({ message: 'getAllUsersNotes' })
  }
}
