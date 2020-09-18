const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const ProdutoSchema = new Schema(
  {
    nome: String,
    valor: Number,
  },
  { versionKey: false }
)

module.exports = mongoose.model('Produto', ProdutoSchema)
