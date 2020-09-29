const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const AgentSchema = new Schema(
  {
    key: String,
    status: { type: Number }, // 1 == disponível, 0 == indisponível
  },
  { versionKey: false }
)

module.exports = mongoose.model('Agent', AgentSchema)
