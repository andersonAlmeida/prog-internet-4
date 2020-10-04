const Agent = require('../models/agent');

/**
 *
 * @api {get} /agents Listar todos os agentes
 * @apiName getAll
 * @apiGroup Agentes
 * @apiVersion  1.0.0
 *
 *
 * @apiSuccessExample {JSON} Success-Response:
 * [
 *   {
 *     "_id": "5f7293b19c4ef749a0fc0ffb",
 *     "status": 0,
 *     "key": "2345678"
 *   },
 *   {
 *     "_id": "5f729feea417344b047d9258",
 *     "status": 0,
 *     "key": "1"
 *   },
 *   {
 *     "_id": "5f729ff2a417344b047d9259",
 *     "status": 1,
 *     "key": "2"
 *   }
 * ]
 *
 *
 */
exports.getAll = (req, res) => {
  Agent.find({}, (err, agents) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(agents);
  });
};

exports.getOne = (req, res) => {
  const { id } = req.params;

  Agent.findById(id, (err, agent) => {
    if (err) {
      res.status(500).send({ erro: err });
    }

    res.json(agent);
  });
};

exports.getAvailable = () => {
  return Agent.findOne({ status: 1 }, (err, agent) => {
    if (err) {
      return err;
    }

    return agent;
  });
};

/**
 *
 * @api {post} /agents Criar um novo agente
 * @apiName create
 * @apiGroup Agentes
 * @apiVersion  1.0.0
 *
 * @apiParam  {String} key Chave do agente do dialogflow
 *
 * @apiParamExample  {Object} Request-Example:
 * {
 *     key : "0354aS@#$42zc"
 * }
 *
 *
 * @apiSuccessExample {Object} Success-Response:
 * {
 *     "_id" : "5f7a1606aebd8d3a3cce261e"
 *     "key" : "0354aS@#$42zc"
 *     "status" : 1
 * }
 *
 *
 */
exports.create = (req, res) => {
  const newAgent = new Agent({ ...req.body, status: 1 });
  newAgent.save((err, agent) => {
    if (err) {
      res.send(err);
    }
    res.status(201).json(agent);
  });
};

exports.update = (id, agentUpdate) => {
  return Agent.findOneAndUpdate(
    { _id: id },
    agentUpdate,
    { new: true },
    (err, updated) => {
      if (err) {
        return err;
      }

      return updated;
    }
  );
};

/**
 *
 * @api {put} /agents/:id Atualiza as informações de um agente
 * @apiName updateRequest
 * @apiGroup Agentes
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} id Id do agente
 *
 * @apiParamExample  {Object} Request-Example:
 * {
 *     key : "0354aS@#$42zc"
 * }
 *
 *
 * @apiSuccessExample {Object} Success-Response:
 * {
 *     _id : "5f16addda5665465a42zc"
 *     status : 1
 *     key : "0354aS@#$42zc"
 * }
 *
 *
 */
exports.updateRequest = (req, res) => {
  const { id } = req.params;
  const agentUpdate = req.body;

  Agent.findById({ _id: id }, async (err, result) => {
    if (err) {
      res.status(500).json({ erro: err });
      return false;
    }

    if (result.status === 0) {
      res
        .status(401)
        .json({ erro: 'O agente já está em uso e não pode ser atualizado.' });
      return false;
    }

    const updated = await this.update(id, agentUpdate);

    res.json(updated);
    return true;
  });
};

/**
 *
 * @api {delete} /agents/:id Deleta o agente com o id passado se o mesmo não está em uso
 * @apiName delete
 * @apiGroup Agentes
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} id Id do agente
 *
 * @apiSuccessExample {Object} Success-Response:
 * {
 *     _id : "5f16addda5665465a42zc"
 *     status : 1
 *     key : "0354aS@#$42zc"
 * }
 *
 *
 */
exports.delete = (req, res) => {
  const { id } = req.params;

  Agent.findById({ _id: id }, (err, result) => {
    if (err) {
      res.send({ erro: err });
      return false;
    }

    /**
     * Verifica se o agente está em uso
     */
    if (result.status === 0) {
      res.send({ erro: 'O agente está em uso e não pode ser excluído.' });
      return false;
    }

    // Excluí o agente se o mesmo não está em uso
    Agent.findByIdAndDelete({ _id: id }, (deeteErr, deleted) => {
      if (deeteErr) {
        res.send({ erro: deeteErr });
      }

      res.json(deleted);
    });

    return true;
  });
};
