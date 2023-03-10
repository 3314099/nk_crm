const { Strategy, ExtractJwt } = require('passport-jwt')
const keys = require('../keys')
const User = require('../models/user.model')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT
}

module.exports = new Strategy(options, async (payload, done) => {
  try {
    const candidate = await User.findById(payload._id).select('id')
    if (candidate) {
      done(null, candidate)
    } else {
      done(null, false)
    }
  } catch (e) {
    // console.error(e)
  }
})
