const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const _SECRET = process.env.JWT_SECRET

module.exports = (app, express) => {
  app.use(bodyParser.json())
  app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
  app.use(/^(?!.*\/usuarios\/login).*$/, (req, res, next) => {
    const token = req.get('Authorization')

    if (!token) {
      return res.status(401).send({ erro: 'Acesso não autorizado.' })
    }

    jwt.verify(token, _SECRET, (err, decoded) => {
      console.log(decoded)
      if (err) {
        return res.status(401).send({ erro: err })
      } else {
        next()
      }
    })
  })

  /**
   * Rotas com acesso apenas para o Admin
   */
  app.get('/usuarios', (req, res, next) => {
    const token = req.get('Authorization')

    jwt.verify(token, _SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ erro: err })
      } else if (decoded.role !== 'admin') {
        return res.status(401).send({ erro: 'Acesso não autorizado' })
      } else {
        next()
      }
    })
  })
  app.post('/usuarios', (req, res, next) => {
    const token = req.get('Authorization')

    jwt.verify(token, _SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ erro: err })
      } else if (decoded.role !== 'admin') {
        return res.status(401).send({ erro: 'Acesso não autorizado' })
      } else {
        next()
      }
    })
  })
}
