const jwt = require('jwt-simple')
const UsersModel = require('../../../config/database')
const { request } = require('../../helpers')
const Users = UsersModel.Users
const { sequelize } = require('../../../config/database')

const defaultUser = {
  id: 1,
  name: 'Adelmo Júnior',
  email: 'adelmojnrr@gmail.com',
  password: 'senha'
}

let token

beforeAll(() => {
  return Users.destroy({ where: {}})
   .then(() => Users.create({
      name: 'Adelmo',
      email: 'adelmojnrr@gmail.com',
      password: '12345'
    }))
    .then(user => {
      Users.create(defaultUser)
        .then(() => {
          token = jwt.encode({ id: user.id }, process.env.JWT_SECRET)
        })
    })
})


describe('Route GET /users', () => {
  test('It should return a list of users', () => {
    return request
      .get('/users')
      .set('Authorization', `JWT ${token}`)
      .then((res) => {
        expect(res.body[0].id).toEqual(defaultUser.id)
        expect(res.body[0].name).toEqual(defaultUser.name)
        expect(res.body[0].email).toEqual(defaultUser.email)
      })
  })
})

describe('Route GET /users/id', () => {
  test('It should return a user', () => {
    return request
      .get('/users/1')
      .set('Authorization', `JWT ${token}`)
      .then((res) => {
        expect(res.body.id).toEqual(defaultUser.id)
        expect(res.body.name).toEqual(defaultUser.name)
        expect(res.body.email).toEqual(defaultUser.email)
      })
  })
})

describe('Route POST /users', () => {
  const newUser = {
    id: 2,
    name: 'Adelmo Júnior',
    email: 'adelmojnrr@gmail.com',
    password: 'senha'
  }
  test('It should create a user', () => {
    return request
      .post('/users')
      .set('Authorization', `JWT ${token}`)
      .send(newUser)
      .then((res) => {
        expect(res.body.id).toEqual(newUser.id)
        expect(res.body.name).toEqual(newUser.name)
        expect(res.body.email).toEqual(newUser.email)
      })
  })
})

describe('Route PUT /users/id', () => {
  const updatedUser = {
    id: 1,
    name: 'Adelmo Júnior',
    email: 'adelmojnrr@gmail.com',
    password: 'senha'
  }
  test('It should update a user', () => {
    return request
      .put('/users/1')
      .send(updatedUser)
      .then((res) => {
        expect(res.body).toEqual([1])
      })
  })
})

describe('Route DELETE /users/id', () => {
  test('It should delete a user', () => {
    return request
      .delete('/users/1')
      .set('Authorization', `JWT ${token}`)
      .then((res) => {
        expect(res.statusCode).toBe(204)
      })
  })
})
