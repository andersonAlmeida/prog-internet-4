const User = require('../models/usuario')
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

  User.findById(id, (err, user) => {
    if (err) {
      res.status(500).send({ erro: err })
    }

    res.json(user)
  })
}

exports.create = (req, res) => {
  let { nome, login, senha, role } = req.body

  if (!nome || !login || !senha || !role) {
    res.send({ erro: 'Dados incompletos. Preencha todos os campos.' })
  }

  this.encryptPassword(senha).then((hash) => {
    if (!hash) {
      res.status(500).send({ erro: err })
    }

    const newUser = new User({ nome, login, senha: hash, role })

    newUser.save((err, user) => {
      if (err) {
        res.send(err)
      }
      res.status(201).json(user)
    })
  })
}

exports.update = async (req, res) => {
  const id = req.params.id
  const userUpdate = req.body

  if (userUpdate.senha) {
    await this.encryptPassword(userUpdate.senha).then((hash) => {
      userUpdate.senha = hash
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

exports.getByLogin = (login) => {
  return User.findOne({ login })
}

exports.doLogin = (req, res) => {
  const { login, senha } = req.body

  if (!login || !senha) {
    res.status(404).send({ erro: 'Login ou senha inválidos.' })
  }

  const loginRes = this.getByLogin(login)

  loginRes.then((user) => {
    if (!user) {
      return res.status(404).send({ erro: 'Usuário não encontrado.' })
    }

    bcrypt.compare(senha, user.senha, (err, result) => {
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

exports.generateJWT = ({ _id, nome, login, role }) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 // expira em 1h

  return jwt.sign({ _id, nome, login, role, iat, exp }, _SECRET)
}

exports.encryptPassword = (pass) => {
  return bcrypt.hash(pass, saltRounds)
}
