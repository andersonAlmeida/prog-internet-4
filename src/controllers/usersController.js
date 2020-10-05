const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const agentsController = require('./agentsController');

const saltRounds = 10;
const _SECRET = process.env.JWT_SECRET;

/**
 *
 * @api {get} /usuarios Lista usuários
 * @apiName getAll
 * @apiGroup Usuários
 * @apiVersion  1.0.0
 *
 * @apiSuccess (200) {String} role Permissão do usuário. Valores: admin ou user
 * @apiSuccess (200) {Number} status Status do cadastro do usuário. Valores: 1 - ativo, 0 - inativo
 * @apiSuccess (200) {String} _id Id do usuário
 * @apiSuccess (200) {String} name Nome
 * @apiSuccess (200) {String} email E-mail
 * @apiSuccess (200) {String} password Senha
 * @apiSuccess (200) {String} agent Código do agente do dialogflow para o usuário
 *
 */
exports.getAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(users);
  });
};

/**
 *
 * @api {get} /usuarios/:id Lista detalhes do usuário
 * @apiName getOne
 * @apiGroup Usuários
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} id Id do usuário
 *
 * @apiSuccess (200) {String} role Permissão do usuário. Valores: admin ou user
 * @apiSuccess (200) {Number} status Status do cadastro do usuário. Valores: 1 - ativo, 0 - inativo
 * @apiSuccess (200) {String} _id Id do usuário
 * @apiSuccess (200) {String} name Nome
 * @apiSuccess (200) {String} email E-mail
 * @apiSuccess (200) {String} password Senha
 * @apiSuccess (200) {Object} agent Objeto com os dados do agente do dialogflow para o usuário
 *
 */
exports.getOne = (req, res) => {
  const { id } = req.params;

  User.findById(id).exec((err, user) => {
    if (err) {
      res.status(500).send({ erro: err });
    }

    res.json(user);
  });
};

/**
 *
 * @api {post} /usuarios Criar usuário
 * @apiName create
 * @apiGroup Usuários
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} name Nome do usuário
 * @apiParam  {String} email E-mail do usuário
 * @apiParam  {String} password Senha
 * @apiParam  {String} [role] Permissão do usuário
 *
 * @apiSuccess (200) {String} role Permissão do usuário. Valores: admin ou user
 * @apiSuccess (200) {Number} status Status do cadastro do usuário. Valores: 1 - ativo, 0 - inativo
 * @apiSuccess (200) {String} _id Id do usuário
 * @apiSuccess (200) {String} name Nome
 * @apiSuccess (200) {String} email E-mail
 * @apiSuccess (200) {String} password Senha
 * @apiSuccess (200) {String} agent Código do agente do dialogflow para o usuário
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *    "name": "user",
 *    "email": "user@gmail.com",
 *    "password": "123456",
 *    "role": "admin"
 * }
 *
 */
exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  let { role } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .send({ erro: 'Dados incompletos. Preencha todos os campos.' });
  }

  if (!role) role = 'user';

  // pega um agente disponível é um usuário do tipo `user`
  let agent = null;
  if (role === 'user') {
    agent = await agentsController.getAvailable();

    if (!agent) {
      res.json({ erro: 'Não possuímos agentes disponíveis no momento' });
    }
  }

  this.encryptPassword(password).then((hash) => {
    if (!hash) {
      res.status(500).send({ erro: 'Erro ao tentar criptografar a senha.' });
      return false;
    }

    /**
     * Instancia um novo usuário
     */
    const newUser = new User({
      name,
      email,
      password: hash,
      role,
      agent: role === 'user' ? { _id: agent._id, key: agent.key } : null,
    });

    newUser.save(async (err, user) => {
      if (err) {
        res.send(err);
      }

      if (role === 'user') {
        // Atualiza o agente selecionado para remover a disponibilidade
        await agentsController.update(agent._id, { status: 0 });
      }

      res.status(201).json(user);
    });
    return true;
  });
};

/**
 *
 * @api {post} /usuarios/cadastro Cadastrar um usuário
 * @apiName createUser
 * @apiGroup Usuários
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} name Nome do usuário
 * @apiParam  {String} email E-mail do usuário
 * @apiParam  {String} password Senha
 *
 * @apiSuccess (200) {String} role Permissão do usuário.
 * @apiSuccess (200) {Number} status Status do cadastro do usuário. Valores: 1 - ativo, 0 - inativo
 * @apiSuccess (200) {String} _id Id do usuário
 * @apiSuccess (200) {String} name Nome
 * @apiSuccess (200) {String} email E-mail
 * @apiSuccess (200) {String} password Senha
 * @apiSuccess (200) {String} agent Código do agente do dialogflow para o usuário
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *    "name": "user",
 *    "email": "user@gmail.com",
 *    "password": "123456",
 *    "role": "admin"
 * }
 *
 */
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .send({ erro: 'Dados incompletos. Preencha todos os campos.' });
  }

  // pega um agente disponível
  const agent = await agentsController.getAvailable();

  if (!agent) {
    res.json({ erro: 'Não possuímos agentes disponíveis no momento' });
    return false;
  }

  this.encryptPassword(password).then((hash) => {
    if (!hash) {
      res
        .status(500)
        .send({ erro: 'Problema ao tentar criptografar a senha.' });
      return false;
    }

    /**
     * Instancia um novo usuário
     */
    const newUser = new User({
      name,
      email,
      password: hash,
      role: 'user',
      agent: { _id: agent._id, key: agent.key },
    });

    newUser.save(async (err, user) => {
      if (err) {
        res.send(err);
      }

      // Atualiza o agente selecionado para remover a disponibilidade
      await agentsController.update(agent._id, { status: 0 });

      res.status(201).json(user);
    });

    return true;
  });

  return true;
};

/**
 *
 * @api {put} /usuarios/:id Atualizar usuário
 * @apiName update
 * @apiGroup Usuários
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} id Id usuário
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 *
 *
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  const userUpdate = req.body;

  if (userUpdate.password) {
    await this.encryptPassword(userUpdate.password).then((hash) => {
      userUpdate.password = hash;
    });
  }

  User.findOneAndUpdate(
    { _id: id },
    userUpdate,
    { new: true },
    (err, updated) => {
      if (err) {
        res.send({ erro: err });
      }

      res.json(updated);
    }
  );
};

exports.delete = (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete({ _id: id }, (err, deleted) => {
    if (err) {
      res.send({ erro: err });
    }

    res.json(deleted);
  });
};

exports.getByEmail = (email) => {
  return User.findOne({ email });
};

/**
 *
 * @api {post} /usuarios/login Efetua login
 * @apiName doLogin
 * @apiGroup Usuários
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} email E-mail do usuário
 * @apiParam  {String} password Senha do usuário
 *
 * @apiSuccess (200) {Object} user dados do usuário
 * @apiSuccess (200) {String} token jwt token
 *
 * @apiParamExample  {Object} Request-Example:
 * {
 *     email : value
 *     password : value
 * }
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *     user : {...}
 *     token : "..."
 * }
 *
 *
 */
exports.doLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).send({ erro: 'Login ou senha inválidos.' });
    return false;
  }

  const loginRes = this.getByEmail(email);

  loginRes.then((user) => {
    if (!user) {
      res.status(404).send({ erro: 'Usuário não encontrado.' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.send({ erro: err });
        return false;
      }

      if (result) {
        const token = this.generateJWT(user);
        const { role, status, agent, _id, name, email: loggedEmail } = user;

        res.json({
          user: { role, status, agent, _id, name, email: loggedEmail },
          token,
        });
        return false;
      }

      res.status(404).send({ erro: 'Senha inválida.' });
      return false;
    });
  });

  return false;
};

exports.generateJWT = ({ _id, name, email, role, agent }) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // expira em 1h

  return jwt.sign({ _id, name, email, role, agent, iat, exp }, _SECRET);
};

exports.encryptPassword = (pass) => {
  return bcrypt.hash(pass, saltRounds);
};

exports.validateToken = (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) {
    res.status(401).send({ erro: 'Acesso não autorizado.' });
    return false;
  }

  jwt.verify(token, _SECRET, (err) => {
    if (err) {
      res.status(401).send({ erro: err });
    } else {
      next();
    }
  });

  return true;
};

exports.validateAdminToken = (req, res, next) => {
  const token = req.get('Authorization');

  jwt.verify(token, _SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ erro: 'Acesso não autorizado' });
    } else if (decoded.role !== 'admin') {
      res.status(401).send({ erro: 'Acesso não autorizado' });
    } else {
      next();
    }
  });
};
