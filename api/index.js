const app = require('./app')
const authRoutes = require('./routes/auth.routes')
const usersRoutes = require('./routes/users.routes')
const sectionsRoutes = require('./routes/user/properties/sections.routes')
// Require & Import API routes
// const users = require('./routes/users')
// const articles = require('./routes/articles')
//
// // Use API Routes
// app.use(users)
// app.use(articles)
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/user/properties/section', sectionsRoutes)
module.exports = app
