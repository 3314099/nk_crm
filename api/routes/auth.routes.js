const { Router } = require('express')
const passport = require('passport')
const router = Router()
const { login, createUser, getById } = require('../controllers/auth.controller')

// /api/auth/login
router.post('/login', login)

// /api/auth/getUserById/:id
router.post(
  '/getUserById/:id',
  // passport.authenticate('jwt', { session: false }),
  getById
)

// /api/auth/create
router.post('/create', createUser)

module.exports = router
