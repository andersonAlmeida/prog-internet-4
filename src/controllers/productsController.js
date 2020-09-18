const Produto = require('../models/produto')

exports.getAll = (req, res) => {
  Produto.find({}, (err, produtos) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json(produtos)
  })
}

exports.getOne = (req, res) => {
  const id = req.params.id

  Produto.findById(id, (err, produto) => {
    if (err) {
      res.status(500).send({ erro: err })
    }

    res.json(produto)
  })
}

exports.create = (req, res) => {
  let newProduct = new Produto(req.body)
  newProduct.save((err, produto) => {
    if (err) {
      res.send(err)
    }
    res.status(201).json(produto)
  })
}

exports.update = (req, res) => {
  const id = req.params.id
  const productUpdate = req.body

  Produto.findOneAndUpdate(
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

  Produto.findByIdAndDelete({ _id: id }, (err, deleted) => {
    if (err) {
      res.send({ erro: err })
    }

    res.json(deleted)
  })
}
