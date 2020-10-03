const UsersRoutes = require('./users');
const AgentsRoutes = require('./agents');
const intentsRoutes = require('./intents');

module.exports = (app) => {
  UsersRoutes(app);
  AgentsRoutes(app);
  intentsRoutes(app);
};
