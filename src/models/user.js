const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
  },
  { versionKey: false }
)

module.exports = mongoose.model('User', UserSchema)
