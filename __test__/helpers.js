const supertest = require('supertest')
const testdouble = require('testdouble')
const app = require('../src/app')

const helper = {}

helper.request = supertest(app)
helper.td = testdouble
module.exports = helper
