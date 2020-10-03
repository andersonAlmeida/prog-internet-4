const intentsController = require('../controllers/intentsController');

module.exports = (app) => {
  app.get('/intents', intentsController.getAll);

  app.get('/intents/user/:id', intentsController.getAllByUserId);

  app.get('/intents/:id', intentsController.getOne);

  app.post('/intents', intentsController.create);

  app.put('/intents/:id', intentsController.update);

  app.delete('/intents/:id', intentsController.delete);
};
