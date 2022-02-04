const routes = require('express').Router();

const userRoutes = require('./user-routes');
const categoryRoutes = require('./category-routes');
const commentRoutes = require('./comment-routes');

routes.use('/users', userRoutes);
routes.use('/categories', categoryRoutes)
routes.use('/comments', commentRoutes);

routes.get('/', async (req, res) => {
  const userData = await User.findAll({});
  res.json(userData);
})

module.exports = routes;