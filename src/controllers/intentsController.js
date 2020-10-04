const Intent = require('../models/intent');

exports.getAll = (req, res) => {
  Intent.find({}, (err, intents) => {
    if (err) {
      res.status(500).send(err);
      return false;
    }
    res.json(intents);
    return true;
  });
};

/**
 *
 * @api {get} /intents/user/:id Listar por usuário
 * @apiName getAllByUserId
 * @apiGroup Intents
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} id Id do usuário
 *
 *
 */
exports.getAllByUserId = (req, res) => {
  const userId = req.params.id;

  Intent.find({ user: userId }, (err, intents) => {
    if (err) {
      res.status(500).send(err);
      return false;
    }
    res.json(intents);
    return true;
  });
};

/**
 *
 * @api {get} /intents/:id Detalhe da intent
 * @apiName getOne
 * @apiGroup Intents
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} id Id da intent
 *
 *
 */
exports.getOne = (req, res) => {
  const { id } = req.params;

  Intent.findById(id, (err, intent) => {
    if (err) {
      res.status(500).send({ erro: err });
      return false;
    }

    res.json(intent);
    return true;
  });
};

/**
 *
 * @api {post} /intents Criar intent
 * @apiName create
 * @apiGroup Intents
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {Array} trainingPhrases Array de objetos com as partes das intens
 * @apiParam  {Array} responses Array de respostas possíveis para as intents
 * @apiParam  {String} name Nome da intent
 * @apiParam  {String} [action]
 * @apiParam  {Array} [parameter] Array de parâmetros das intents
 * @apiParam  {String} user Id do usuário que cadastrou a intent
 *
 *
 * @apiParamExample  {type} Request-Example:
 * {
 * 	"trainingPhrases": [
 *     {
 *       "parts": [
 *         {
 *           "text": "oi",
 *           "entityType": "",
 *           "alias": "",
 *           "userDefined": false
 *         },
 * 				{
 *           "text": "olá",
 *           "entityType": "",
 *           "alias": "",
 *           "userDefined": false
 *         }
 *       ]
 * 		}
 * 	],
 * 	"responses": ["oi tudo bem"],
 * 	"name": "Saudação",
 * 	"action": "",
 * 	"parameters": [],
 * 	"user": "5f791850bb48e5346cd2725d"
 * }
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *   "responses": [
 *     "oi tudo bem"
 *   ],
 *   "trainingPhrases": [
 *     {
 *       "parts": [
 *         {
 *           "text": "oi",
 *           "entityType": "",
 *           "alias": "",
 *           "userDefined": false
 *         },
 *         {
 *           "text": "olá",
 *           "entityType": "",
 *           "alias": "",
 *           "userDefined": false
 *         }
 *       ]
 *     }
 *   ],
 *   "parameters": [],
 *   "_id": "5f7a274c44cced33fc1b7f45",
 *   "name": "Saudação",
 *   "user": "5f791850bb48e5346cd2725d"
 * }
 *
 *
 */
exports.create = (req, res) => {
  const newIntent = new Intent(req.body);

  newIntent.save((err, intent) => {
    if (err) {
      res.status(500).send(err);
      return false;
    }
    res.status(201).json(intent);
    return true;
  });
};

/**
 *
 * @api {put} /intents/:id Atualizar intent
 * @apiName update
 * @apiGroup Intents
 * @apiVersion  1.0.0
 *
 *
 */
exports.update = (req, res) => {
  const { id } = req.params;
  const intentUpdate = req.body;

  Intent.findOneAndUpdate(
    { _id: id },
    intentUpdate,
    { new: true },
    (err, updated) => {
      if (err) {
        res.status(500).send({ erro: err });
        return false;
      }

      res.json(updated);
      return true;
    }
  );
};

/**
 *
 * @api {delete} /intents/:id Deleta um intent
 * @apiName delete
 * @apiGroup Intents
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} id Id da intent
 *
 *
 */
exports.delete = (req, res) => {
  const { id } = req.params;

  Intent.findByIdAndDelete({ _id: id }, (err, deleted) => {
    if (err) {
      res.status(500).send({ erro: err });
      return false;
    }

    res.json(deleted);
    return true;
  });
};
