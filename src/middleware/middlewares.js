const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')
// const _SECRET = process.env.JWT_SECRET
const usersController = require('../controllers/usersController')

module.exports = (app, express) => {
  app.use(bodyParser.json())
  app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  app.use('/api/docs', express.static('documentation'))

  app.use((req, res, next) => {
    console.log('Tipo: ', req.method)
    console.log('Rota: ', req.url)
    console.log('Horário: ', new Date(Date.now()))

    next()
  })

  /**
   * Verifica se está logado e tem a permissão necessária
   * exclui a rota de login
   */
  app.use(/^(?!.*(\/login|\/agents)).*$/, usersController.validateToken)

  /**
   * Rotas com acesso apenas para o Admin
   */
  app.get('/usuarios', usersController.validateAdminToken)
  app.use('/agents', usersController.validateAdminToken)
}
