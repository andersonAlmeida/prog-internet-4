const mongoose = require('mongoose');

module.exports = () => {
  // Configuração do Mongoose
  mongoose
    .connect('mongodb://localhost/chatbot_admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      // eslint-disable-next-line
      console.log('BD conectado');
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log(`Error ao conectar ao BD. Erro ${error}`);
    });
  mongoose.Promise = global.Promise;
};
