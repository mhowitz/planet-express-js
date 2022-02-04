const routes = require('express').Router();

const userRoutes = require('./user-routes');
const categoryRoutes = require('./category-routes');

routes.use('/users', userRoutes);
routes.use('/categories', categoryRoutes)

routes.get('/', async (req, res) => {
  const userData = await User.findAll({});
  res.json(userData);
})

module.exports = routes;