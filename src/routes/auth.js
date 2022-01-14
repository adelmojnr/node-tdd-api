require('dotenv').config()

const HttpStatus = require('http-status')
const jwt = require('jwt-simple')

module.exports = app => {
  const { Users } = require('../../config/database')

  app.post('/token', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email
      const password = req.body.password

      Users.findOne({ where: { email } })
        .then(user => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id }
            res.json({
              token: jwt.encode(payload, process.env.JWT_SECRET)
            })
          } else {
            res.sendStatus(HttpStatus.UNAUTHORIZED)
          }
        })
        .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED))
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED)
    }
  })
}
