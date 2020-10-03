const agentsController = require('../controllers/agentsController');

module.exports = (app) => {
  app.get('/agents', agentsController.getAll);

  app.get('/agents/:id', agentsController.getOne);

  app.post('/agents', agentsController.create);

  app.put('/agents/:id', agentsController.updateRequest);

  app.delete('/agents/:id', agentsController.delete);
};
