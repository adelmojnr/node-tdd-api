const { Users } = require('../../config/database')
const UserControllers = require('../controllers/users')

module.exports = (app) => {
  const userControllers = new UserControllers(Users)

  app.route('/users')
    .get((req, res) => {
      userControllers.getAll({})
        .then(response => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })
    .post((req, res) => {
      userControllers.create(req.body)
        .then(response => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  app.route('/users/:id')
    .get((req, res) => {
      userControllers.getById(req.params)
        .then(response => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })
    .put((req, res) => {
      userControllers.update(req.body, req.params)
        .then(response => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })
    .delete((req, res) => {
      userControllers.delete(req.params)
        .then(response => {
          res.sendStatus(response.statusCode)
        })
    })
}

//problem is repetead id on tests