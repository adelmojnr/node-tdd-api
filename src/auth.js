const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

module.exports = app => {
  const { Users } = require('../config/database')
  const opts = {}
  opts.secretOrKey = process.env.JWT_SECRET
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

  const strategy = new Strategy(opts, (payload, done) => {
    console.log(Users)

    Users.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email
          })
        }
        return done(null, false)
      })
      .catch(error => done(error, null))
  })
  passport.use(strategy)
  return {
  	initialize: () => passport.initialize(),
  	authenticate: () => passport.authenticate('jwt', {session: false })
  }
}
