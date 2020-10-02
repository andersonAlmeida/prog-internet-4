const UsersRoutes = require('./users')
const AgentsRoutes = require('./agents')
const intentsRoutes = require('./intents')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('<h1>Home page!</h1>')
  })

  UsersRoutes(app)
  AgentsRoutes(app)
  intentsRoutes(app)
}
