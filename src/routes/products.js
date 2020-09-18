const produtosController = require('../controllers/productsController')

module.exports = (app) => {
  app.get('/produtos', produtosController.getAll)

  app.get('/produtos/:id', produtosController.getOne)

  app.post('/produtos', produtosController.create)

  app.put('/produtos/:id', produtosController.update)

  app.delete('/produtos/:id', produtosController.delete)
}
