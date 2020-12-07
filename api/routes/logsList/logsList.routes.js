const { Router } = require('express')
const passport = require('passport')
const ctr = require('../../controllers/logsList/logsList.controller')
const router = Router()

// /api/logsList/fetchLogs/:id
router.get(
  '/fetchLogs/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.fetchLogs
)

// POST => /api/logsList/
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  ctr.create)

// DELETE => /api/logsList/
router.post(
  '/remove',
  passport.authenticate('jwt', { session: false }),
  ctr.remove)

module.exports = router
