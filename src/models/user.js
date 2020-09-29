const mongoose = require('mongoose')
const Intent = require('./intent').schema
const Agent = require('./agent').schema
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' }, // admin, user
    status: { type: Number, default: 1 }, // 1 == ativo, 0 == inativo
    intents: [Intent],
    agent: { type: Agent, default: {} },
  },
  { versionKey: false }
)

module.exports = mongoose.model('User', UserSchema)
