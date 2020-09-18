const mongoose = require('mongoose')

module.exports = (app) => {
  //Configuração do Mongoose
  mongoose
    .connect('mongodb://localhost/app_produtos', {
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
