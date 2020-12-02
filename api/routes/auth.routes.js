const { Router } = require('express')
const passport = require('passport')
const router = Router()
const ctr = require('../controllers/auth.controller')

// /api/auth/login
router.post(
  '/login',
  ctr.login
)

// /api/auth/getUserById/:id
router.post(
  '/getUserById/:id',
  // passport.authenticate('jwt', { session: false }),
  ctr.getById
)

// /api/auth/create
router.post(
  '/create',
  ctr.createUser)

// /api/auth/fetchUserData/:id
router.get(
  '/fetchUserData/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.fetchUserData
)

module.exports = router
