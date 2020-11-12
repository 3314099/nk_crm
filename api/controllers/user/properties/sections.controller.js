// const bcrypt = require('bcrypt')
// const saltRounds = 8
// // const myPlaintextPassword = 's0/\/\P4$$w0rD'
// // const someOtherPlaintextPassword = 'not_bacon'
// // const jwt = require('jsonwebtoken')
// // const keys = require('../keys')
const Section = require('../../../models/properties/section.model')
const User = require('../../../models/user.model')

// const Note = require('../models/note.model')

// module.exports.getAll = async (req, res) => {
//   try {
//     const users = await User.find()
//     // const users = await User.find().populate('usersnotes')
//     res.json(users)
//   } catch (err) {
//     res.status(201).json({ message: 'failedGetAllUsers' })
//   }
// }

module.exports.create = async (req, res) => {
  try {
    const section = new Section({
      userId: req.body.userId,
      title: req.body.title,
      comment: req.body.comment,
      color: req.body.color,
      visible: req.body.visible
    })
    await section.save()
    const user = await User.findById(section.userId)
    user.sections.unshift(section._id)
    await user.save()
    res.status(201).json({ message: 'newSectionCreated', section })
  } catch (e) {
    res.status(409).json({ message: 'failedCreateSection' })
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    userId: req.body.userId,
    title: req.body.title,
    comment: req.body.comment,
    color: req.body.color,
    visible: req.body.visible
  }
  try {
    await Section.findOneAndUpdate({ _id: req.body.sectionId }, { $set }, { overwrite: true })
    res.status(201).json({ message: 'sectionUpdated' })
  } catch (e) {
    res.status(409).json({ message: 'failedCreateSection' })
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Section.deleteOne({ _id: req.body.sectionId })
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pullAll: { sections: [req.body.sectionId] } },
      { new: true }
    )
    res.status(201).json({ message: 'sectionRemoved' })
  } catch (e) {
    res.status(409).json({ message: 'failedRemoveSection' })
  }
}

// module.exports.update = async (req, res) => {
//   const salt = bcrypt.genSaltSync(saltRounds)
//   const $set = {
//     lastName: req.body.lastName,
//     name: req.body.name,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, salt),
//     role: req.body.role,
//     usersnotes: req.body.usersnotes
//   }
//   try {
//     const user = await User.findOneAndUpdate({
//       _id: req.params.id
//     }, { $set }, { overwrite: true })
//     res.json({ message: 'userUdated', user })
//   } catch (e) {
//     res.status(409).json({ message: 'failedUserUpdate' })
//   }
// }
//
//
// module.exports.createNote = async (req, res) => {
//   try {
//     // const note = new Note({
//     //   userId: req.body.userId,
//     //   text: req.body.text,
//     //   // creatorId: req.body.creatorId,
//     // })
//     const { adminId, recipientId, text } = req.body
//     const note = new Note({ adminId, recipientId, text })
//     await note.save()
//
//     const user = await User.findById(req.body.recipientId)
//     user.usersnotes.push(note._id)
//     await user.save()
//
//     res.status(201).json({ message: 'newNoteCreated', note })
//   } catch (e) {
//     res.status(409).json({ message: 'failedCreateNote' })
//   }
// }
//
// module.exports.getById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).populate('usersnotes')
//     res.json(user)
//     // // -----------------------------
//     // const test = new Test({ title: req.params.id })
//     // await test.save()
//     // // -----------------------------
//   } catch (e) {
//     res.status(500).json({ message: 'failedGetUserById' })
//   }
// }
// module.exports.getAllUsersNotes = async (req, res) => {
//   try {
//     const results = await Note.find()
//     res.json(results)
//     // // -----------------------------
//     // const test = new Test({ title: req.params.id })
//     // await test.save()
//     // // -----------------------------
//   } catch (e) {
//     res.status(500).json({ message: 'getAllUsersNotes' })
//   }
// }
// // module.exports.create = async (req, res) => {
// //   const post = new Post({
// //     title: req.body.title,
// //     text: req.body.text,
// //     imageUrl: `/${req.file.filename}`
// //   })
// //
// //   try {
// //     await post.save()
// //     res.status(201).json(post)
// //   } catch (e) {
// //     res.status(500).json(e)
// //   }
// // }
//
// module.exports.remove = async (req, res) => {
//   try {
//     await Post.deleteOne({ _id: req.params.id })
//     res.json({ message: 'Пост удален' })
//   } catch (e) {
//     res.status(500).json(e)
//   }
// }
//
// module.exports.addView = async (req, res) => {
//   const $set = {
//     views: ++req.body.views
//   }
//   try {
//     await Post.findOneAndUpdate({ _id: req.params.id }, { $set })
//     res.status(204).json()
//   } catch (e) {
//     res.status(500).json(e)
//   }
// }
//
// module.exports.getAnalytics = async (req, res) => {
//   try {
//     const posts = await Post.find()
//
//     const labels = posts.map(post => post.title)
//
//     const json = {
//       comments: {
//         labels,
//         data: posts.map(post => post.comments.length)
//       },
//       views: {
//         labels,
//         data: posts.map(post => post.views)
//       }
//     }
//
//     res.json(json)
//   } catch (e) {
//     res.status(500).json(e)
//   }
// }
