const routes = require('express').Router();

const userRoutes = require('./user-routes');
const articleRoutes = require('./article-routes');

routes.use('/users', userRoutes);
routes.use('/articles', articleRoutes);

routes.get('/', async (req, res) => {
  const userData = await User.findAll({});
  res.json(userData);
})

module.exports = routes;