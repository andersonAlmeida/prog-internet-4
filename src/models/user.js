const mongoose = require('mongoose');

const { Schema } = mongoose;
const Agent = require('./agent').schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' }, // admin, user
    status: { type: Number, default: 1 }, // 1 == ativo, 0 == inativo
    agent: { type: Agent, default: {} },
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', UserSchema);
