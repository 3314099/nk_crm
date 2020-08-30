// const passport = require('passport')
const { Router } = require('express')
// const upload = require('../middleware/upload')
const ctr = require('../controllers/users.controller')
const router = Router()

// /api/users/admin/create
router.post(
  '/admin/create',
  ctr.createUser)
// passport.authenticate('jwt', {session: false}), //для первого юзера закомментировать

// /api/users/admin
router.get(
  '/admin',
  // passport.authenticate('jwt', { session: false }),
  ctr.getAll
)

// /api/users/admin/${id}
router.get(
  '/admin/getUserById/:id',
  // passport.authenticate('jwt', { session: false }),
  ctr.getById
)

// /api/users/admin/createNote
router.post(
  '/admin/createNote',
  ctr.createNote
)

// /api/users/admin/getAllUsersNotes
router.get(
  '/admin/getAllUsersNotes',
  ctr.getAllUsersNotes
)
// ------------------------------
router.put(
  '/admin/:id',
  // passport.authenticate('jwt', { session: false }),
  ctr.update
)

router.put(
  '/admin/:id',
  // passport.authenticate('jwt', { session: false }),
  ctr.update
)
// Admin
// /api/post/admin
// router.post(
//   '/admin/',
//   // passport.authenticate('jwt', { session: false }),
//   upload.single('image'),
//   ctr.create
// )

router.delete(
  '/admin/:id',
  // passport.authenticate('jwt', { session: false }),
  ctr.remove
)

router.get(
  '/admin/get/analytics',
  // passport.authenticate('jwt', { session: false }),
  ctr.getAnalytics
)

// Base
// /api/post
router.get('/', ctr.getAll)
router.get('/:id', ctr.getById)

router.put('/add/view/:id', ctr.addView)

module.exports = router
