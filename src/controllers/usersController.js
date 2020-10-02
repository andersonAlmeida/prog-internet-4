const User = require('../models/user')
const agentsController = require('../controllers/agentsController')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10
const _SECRET = process.env.JWT_SECRET

exports.getAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json(users)
  })
}

exports.getOne = (req, res) => {
  const id = req.params.id

  User.findById(id)
    .populate('intents')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ erro: err })
      }

      res.json(user)
    })
}

exports.create = async (req, res) => {
  let { name, email, password, role } = req.body

  if (!name || !email || !password) {
    res
      .status(400)
      .send({ erro: 'Dados incompletos. Preencha todos os campos.' })
  }

  if (!role) role = 'user'

  // pega um agente disponível
  const agent = await agentsController.getAvailable()

  if (!agent) {
    res.json({ erro: 'Não possuímos agentes disponíveis no momento' })
  }

  this.encryptPassword(password).then((hash) => {
    if (!hash) {
      res.status(500).send({ erro: err })
    }

    const newUser = new User({
      name,
      email,
      password: hash,
      role,
      agent: { _id: agent._id, key: agent.key },
    })

    newUser.save(async (err, user) => {
      if (err) {
        res.send(err)
      }

      // Atualiza o agente selecionado para remover a disponibilidade
      await agentsController.update(agent._id, { status: 0 })

      res.status(201).json(user)
    })
  })
}

exports.update = async (req, res) => {
  const id = req.params.id
  const userUpdate = req.body

  if (userUpdate.password) {
    await this.encryptPassword(userUpdate.password).then((hash) => {
      userUpdate.password = hash
    })
  }

  User.findOneAndUpdate(
    { _id: id },
    userUpdate,
    { new: true },
    (err, updated) => {
      if (err) {
        res.send({ erro: err })
      }

      res.json(updated)
    }
  )
}

exports.delete = (req, res) => {
  const id = req.params.id

  User.findByIdAndDelete({ _id: id }, (err, deleted) => {
    if (err) {
      res.send({ erro: err })
    }

    res.json(deleted)
  })
}

exports.getByEmail = (email) => {
  return User.findOne({ email })
}

exports.doLogin = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(404).send({ erro: 'Login ou senha inválidos.' })
  }

  const loginRes = this.getByEmail(email)

  loginRes.then((user) => {
    if (!user) {
      return res.status(404).send({ erro: 'Usuário não encontrado.' })
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.send({ erro: err })
      }

      if (result) {
        const token = this.generateJWT(user)

        return res.json({ user, token })
      }

      return res.status(404).send({ erro: 'Senha inválida.' })
    })
  })
}

exports.generateJWT = ({ _id, name, email, role }) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 // expira em 1h

  return jwt.sign({ _id, name, email, role, iat, exp }, _SECRET)
}

exports.encryptPassword = (pass) => {
  return bcrypt.hash(pass, saltRounds)
}

exports.validateToken = (req, res, next) => {
  const token = req.get('Authorization')

  if (!token) {
    return res.status(401).send({ erro: 'Acesso não autorizado.' })
  }

  jwt.verify(token, _SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ erro: err })
    } else {
      next()
    }
  })
}

exports.validateAdminToken = (req, res, next) => {
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
}
