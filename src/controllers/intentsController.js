const Intent = require('../models/intent')

exports.getAll = (req, res) => {
  Intent.find({}, (err, intents) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json(intents)
  })
}

exports.getAllByUserId = (req, res) => {
  const userId = req.params.id

  Intent.find({ user: userId }, (err, intents) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json(intents)
  })
}

exports.getOne = (req, res) => {
  const id = req.params.id

  Intent.findById(id, (err, intent) => {
    if (err) {
      res.status(500).send({ erro: err })
    }

    res.json(intent)
  })
}

exports.create = (req, res) => {
  let newIntent = new Intent(req.body)

  newIntent.save((err, intent) => {
    if (err) {
      res.send(err)
    }
    res.status(201).json(intent)
  })
}

exports.update = (req, res) => {
  const id = req.params.id
  const intentUpdate = req.body

  Intent.findOneAndUpdate(
    { _id: id },
    intentUpdate,
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

  Intent.findByIdAndDelete({ _id: id }, (err, deleted) => {
    if (err) {
      res.send({ erro: err })
    }

    res.json(deleted)
  })
}
