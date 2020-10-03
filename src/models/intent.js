const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

mongoose.Promise = global.Promise;

const IntentSchema = new Schema(
  {
    name: String,
    responses: [],
    trainingPhrases: [{}],
    parameters: [{}],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Intent', IntentSchema);
