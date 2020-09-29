const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const IntentSchema = new Schema(
  {
    name: String,
    responses: [],
    trainingPhrases: [{}],
    parameters: [{}],
  },
  { versionKey: false }
)

module.exports = mongoose.model('Intent', IntentSchema)