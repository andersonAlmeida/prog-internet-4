const Intent = require('../models/intent')

exports.getAll = (req, res) => {
  Intent.find({}, (err, intents) => {
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
  let newProduct = new Intent(req.body)
  newProduct.save((err, intent) => {
    if (err) {
      res.send(err)
    }
    res.status(201).json(intent)
  })
}

exports.update = (req, res) => {
  const id = req.params.id
  const productUpdate = req.body

  Intent.findOneAndUpdate(
    { _id: id },
    productUpdate,
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
