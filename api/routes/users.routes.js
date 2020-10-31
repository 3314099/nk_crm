const { Router } = require('express')
const passport = require('passport')
// const upload = require('../middleware/upload')
const ctr = require('../controllers/users.controller')
const router = Router()

// /api/users/admin/create
router.post(
  '/admin/create',
  passport.authenticate('jwt', { session: false }), // для первого юзера закомментировать
  ctr.createUser)

// /api/users/admin/id
router.put(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.update
)

// /api/users/admin/delete/:id
router.delete(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.removeUser)

// /api/users/admin
router.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  ctr.getAll
)

// /api/users/admin/${id}
router.get(
  '/admin/getUserById/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.getById
)

// /api/users/admin/createNote
router.post(
  '/admin/createNote',
  passport.authenticate('jwt', { session: false }),
  ctr.createNote
)

// /api/users/admin/getAllUsersNotes
router.get(
  '/admin/getAllUsersNotes',
  passport.authenticate('jwt', { session: false }),
  ctr.getAllUsersNotes
)
// ------------------------------

// router.put(
//   '/admin/:id',
//   // passport.authenticate('jwt', { session: false }),
//   ctr.update
// )
// Admin
// /api/post/admin
// router.post(
//   '/admin/',
//   // passport.authenticate('jwt', { session: false }),
//   upload.single('image'),
//   ctr.create
// )
//
// router.delete(
//   '/admin/:id',
//   passport.authenticate('jwt', { session: false }),
//   ctr.remove
// )

// router.get(
//   '/admin/get/analytics',
//   // passport.authenticate('jwt', { session: false }),
//   ctr.getAnalytics
// )

// Base
// /api/post
// router.get('/', ctr.getAll)
// router.get('/:id', ctr.getById)
//
// router.put('/add/view/:id', ctr.addView)

module.exports = router
