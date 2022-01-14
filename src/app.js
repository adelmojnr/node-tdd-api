const express = require('express')
const app = express()
const UsersRoute = require('./routes/users')
const AuthRoute = require('./routes/auth')
const db = require('../config/database')
const authorization = require('./auth')
const auth = authorization(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(auth.initialize())

app.auth = auth

UsersRoute(app)
AuthRoute(app)
	
db.sequelize.sync()

module.exports = app
