const routes = require('express').Router();
const htmlRoutes = require('./htmlRoutes.js');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard');

routes.use('/', htmlRoutes);
routes.use('/api', apiRoutes);
routes.use('/dashboard', dashboardRoutes);

module.exports = routes;