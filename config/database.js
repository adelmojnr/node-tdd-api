require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize')
const db = {}
// database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    freezeTableName: true,
    logging: false
  }
)

db.Sequelize = Sequelize
db.sequelize = sequelize
db.Users = require('../src/models/Users')(sequelize, DataTypes)

module.exports = db
