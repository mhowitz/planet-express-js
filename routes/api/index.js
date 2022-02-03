const routes = require('express').Router();

const userRoutes = require('./user-routes');

routes.use('/users', userRoutes);

routes.get('/', async (req, res) => {
  const userData = await User.findAll({});
  res.json(userData);
})

module.exports = routes;