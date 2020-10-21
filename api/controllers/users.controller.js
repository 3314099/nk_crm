const bcrypt = require('bcrypt')
const saltRounds = 8
// const myPlaintextPassword = 's0/\/\P4$$w0rD'
// const someOtherPlaintextPassword = 'not_bacon'
// const jwt = require('jsonwebtoken')
// const keys = require('../keys')
const User = require('../models/user.model')
const Note = require('../models/note.model')
const Test = require('../models/test.model')

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
    // const note = new Note({
    //   userId: req.body.userId,
    //   text: req.body.text,
    //   // creatorId: req.body.creatorId,
    // })
    const { userId, text } = req.body
    const note = new Note({ userId, text })
    await note.save()

    const user = await User.findById(req.body.userId)
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
// module.exports.create = async (req, res) => {
//   const post = new Post({
//     title: req.body.title,
//     text: req.body.text,
//     imageUrl: `/${req.file.filename}`
//   })
//
//   try {
//     await post.save()
//     res.status(201).json(post)
//   } catch (e) {
//     res.status(500).json(e)
//   }
// }

module.exports.update = async (req, res) => {
  const $set = {
    lastName: req.body.lastName,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }
  try {
    const user = await User.findOneAndUpdate({
      _id: req.params.id
    }, { $set }, { overwrite: true })
    res.json({ message: 'userUdated', user })
  } catch (e) {
    res.status(409).json({ message: 'failedUserUpdate' })
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id })
    res.json({ message: 'Пост удален' })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.addView = async (req, res) => {
  const $set = {
    views: ++req.body.views
  }
  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set })
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAnalytics = async (req, res) => {
  try {
    const posts = await Post.find()

    const labels = posts.map(post => post.title)

    const json = {
      comments: {
        labels,
        data: posts.map(post => post.comments.length)
      },
      views: {
        labels,
        data: posts.map(post => post.views)
      }
    }

    res.json(json)
  } catch (e) {
    res.status(500).json(e)
  }
}
