const { td } = require('../../helpers')
const UsersController = require('../../../src/controllers/users')

describe('Controllers:  Users', () => {
  test('Get all users: getAll()', () => {
    const Users = {
      findAll: td.function()
    }
    const expectedResponse = {
      id: 2,
      name: 'Adelmo Júnior',
      email: 'adelmojnrr@gmail.com',
      password: 'senha',
      createdAt: '2022-01-12T18:03:18.114Z',
      updatedAt: '2022-01-12T18:03:18.114Z'
    }

    td.when(Users.findAll({})).thenResolve(expectedResponse)

    const usersController = new UsersController(Users)

    return usersController.getAll()
      .then(response => expect(response.data).toEqual(expectedResponse))
  })

  test('Get a user: getById()', () => {
    const Users = {
      findOne: td.function()
    }
    const expectedResponse = {
      id: 2,
      name: 'Adelmo Júnior',
      email: 'adelmojnrr@gmail.com',
      password: 'senha',
      createdAt: '2022-01-12T18:03:18.114Z',
      updatedAt: '2022-01-12T18:03:18.114Z'
    }

    td.when(Users.findOne({ where: { id: 1 } })).thenResolve(expectedResponse)

    const usersController = new UsersController(Users)

    return usersController.getById({ id: 1 })
      .then(response => expect(response.data).toEqual(expectedResponse))
  })

  test('Create a user: create()', () => {
    const Users = {
      create: td.function()
    }

    const requestBody = {
      name: 'Artur'
    }

    const expectedResponse = {
      id: 2,
      name: 'Adelmo Júnior',
      email: 'adelmojnrr@gmail.com',
      password: 'senha',
      createdAt: '2022-01-12T18:03:18.114Z',
      updatedAt: '2022-01-12T18:03:18.114Z'
    }

    td.when(Users.create(requestBody)).thenResolve(expectedResponse)

    const usersController = new UsersController(Users)

    return usersController.create(requestBody)
      .then(response => {
        expect(response.statusCode).toBe(201)
        expect(response.data).toEqual(expectedResponse)
      })
  })

  test('Update a user: update()', () => {
    const Users = {
      update: td.function()
    }

    const requestBody = {
      id: 1,
      name: 'Artur'
    }

    const expectedResponse = {
      id: 1,
      name: 'Adelmo Júnior',
      email: 'adelmojnrr@gmail.com',
      password: 'senha',
      createdAt: '2022-01-12T18:03:18.114Z',
      updatedAt: '2022-01-12T18:03:18.114Z'
    }

    td.when(Users.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse)

    const usersController = new UsersController(Users)

    return usersController.update(requestBody, { id: 1 })
      .then(response => expect(response.data).toEqual(expectedResponse))
  })

  test('Delete a user: delete()', () => {
    const Users = {
      destroy: td.function()
    }

    td.when(Users.destroy({ where: { id: 1 } })).thenResolve({})

    const usersController = new UsersController(Users)

    return usersController.delete({ id: 1 })
      .then(response => expect(response.statusCode).toBe(204))
  })
})
