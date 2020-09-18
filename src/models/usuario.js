const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const UsuarioSchema = new Schema(
  {
    nome: String,
    login: String,
    senha: String,
    role: String,
  },
  { versionKey: false }
)

module.exports = mongoose.model('Usuario', UsuarioSchema)
