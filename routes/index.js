const routes = require('express').Router();
const htmlRoutes = require('./htmlRoutes.js');
const apiRoutes = require('./api');

routes.use('/', htmlRoutes);
routes.use('/api', apiRoutes);

module.exports = routes;