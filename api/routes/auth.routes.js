const { Router } = require('express')
const router = Router()
const { login, createUser } = require('../controllers/auth.controller')

// /api/auth/admin/login
router.post('/login', login)

// /api/auth/create
router.post('/create', createUser)
// passport.authenticate('jwt', {session: false}), //для первого юзера закомментировать
module.exports = router
