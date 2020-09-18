const usersController = require('../controllers/usersController')

module.exports = (app) => {
  app.get('/usuarios', usersController.getAll)

  app.get('/usuarios/:id', usersController.getOne)

  app.post('/usuarios', usersController.create)

  app.put('/usuarios/:id', usersController.update)

  app.delete('/usuarios/:id', usersController.delete)

  app.post('/usuarios/login', usersController.doLogin)
}
