const ProductRoutes = require('./products')
const UsersRoutes = require('./users')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('<h1>Home page!</h1>')
  })

  ProductRoutes(app)
  UsersRoutes(app)
}
