const User = require('../../models');

const routes = require('express').Router();

routes.get('/', async (req, res) => {
  const userData = await User.findAll({});
  res.json(userData);
})

module.exports = routes;