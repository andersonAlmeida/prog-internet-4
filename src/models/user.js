const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Intent = require('./intent')
const Agent = require('./agent')

mongoose.Promise = global.Promise

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' }, // admin, user
    status: { type: Number, default: 1 }, // 1 == ativo, 0 == inativo
    // intents: [{ type: Schema.Types.ObjectId, ref: 'Intent' }],
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  },
  { versionKey: false }
)

module.exports = mongoose.model('User', UserSchema)
