const { Router } = require('express')
const passport = require('passport')
const ctr = require('../../../controllers/user/properties/groups.controller')
const router = Router()

// /api/user/properties/group/fetchSections/:id
router.get(
  '/fetchGroups/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.fetchGroups
)

// POST => /api/user/properties/group
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  ctr.create)

// PUT => /api/user/properties/group
router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  ctr.update)

// DELETE => /api/user/properties/group
router.post(
  '/remove',
  passport.authenticate('jwt', { session: false }),
  ctr.remove)

// POST => /api/user/properties/group/chgOrderGroups
router.post(
  '/chgOrderGroups',
  passport.authenticate('jwt', { session: false }),
  ctr.chgOrderGroups)

module.exports = router
