const { Router } = require('express')
const passport = require('passport')
const ctr = require('../../../controllers/user/properties/sections.controller')
const router = Router()

// POST => /api/user/properties/section
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  ctr.create)

// PUT => /api/user/properties/section
router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  ctr.update)

// DELETE => /api/user/properties/section
router.post(
  '/remove',
  passport.authenticate('jwt', { session: false }),
  ctr.remove)

module.exports = router
