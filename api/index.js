const app = require('./app')
const authRoutes = require('./routes/auth.routes')
const usersRoutes = require('./routes/users.routes')
const sectionsRoutes = require('./routes/user/properties/sections.routes')
const logsRoutes = require('./routes/logs/logs.routes')

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/user/properties/section', sectionsRoutes)
app.use('/api/logs', logsRoutes)
module.exports = app
