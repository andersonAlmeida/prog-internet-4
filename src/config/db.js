const mongoose = require('mongoose');

module.exports = () => {
  // Configuração do Mongoose
  mongoose
    .connect(process.env.DB_DRIVER, {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
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
