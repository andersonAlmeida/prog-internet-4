const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const AgentSchema = new Schema(
  {
    key: String, // id do projeto do dialogflow
    status: { type: Number }, // 1 == disponível, 0 == indisponível
  },
  { versionKey: false }
);

module.exports = mongoose.model('Agent', AgentSchema);
