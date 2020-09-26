const mongoose = require('mongoose')

module.exports = (app) => {
  //Configuração do Mongoose
  mongoose
    .connect('mongodb://localhost/chatbot_admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('BD conectado')
    })
    .catch((error) => {
      console.log('Error ao conectar ao BD')
    })
  mongoose.Promise = global.Promise
}
