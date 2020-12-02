const bcrypt = require('bcrypt')
const saltRounds = 8
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email })
  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)
    // нельзя использовать ассинхронный метод
    // const isPasswordCorrect = bcrypt.compare(req.body.password, candidate.password)

    if (isPasswordCorrect) {
      const token = jwt.sign({
        lastName: candidate.lastName,
        name: candidate.name,
        email: candidate.email,
        role: candidate.role,
        _id: candidate._id
      }, keys.JWT, { expiresIn: new Date().getTime() + 60 * 60 })
      res.json({ token })
    } else {
      res.status(404).json({ message: 'emailOrPassUncorrect' })
    }
  } else {
    res.status(404).json({ message: 'emailOrPassUncorrect' })
  }
}

module.exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (e) {
    res.status(500).json({ message: 'failedGetUserById' })
  }
}

module.exports.createUser = async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
      res.status(409).json({ message: 'emailIsBusy', email: candidate.email })
    } else {
      const salt = bcrypt.genSaltSync(saltRounds)
      const user = new User({
        lastName: req.body.lastName,
        name: req.body.name,
        email: req.body.email,
        role: 'user',
        userNotes: [],
        password: bcrypt.hashSync(req.body.password, salt)
      })
      await user.save()
      res.status(201).json({ message: 'newUserIsRegistered', user })
    }
  } catch {
    res.status(409).json({ message: 'failedCreateUser' })
  }
}

module.exports.update = async (req, res) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const $set = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, salt)
  }
  try {
    const post = await User.findOneAndUpdate({
      _id: req.params.id
    }, { $set }, { new: true })
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id })
    res.json({ message: 'Пользователь удален' })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.fetchUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate([
        'logs', 'sections', 'groups', 'categoriesGroups', 'categories'
      ])
    res.json(user)
  } catch (e) {
    res.status(500).json({ message: 'failedFetchUserData' })
  }
}
