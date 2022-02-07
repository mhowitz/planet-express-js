const routes = require('express').Router();
const htmlRoutes = require('./htmlRoutes.js');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard');
const profileRoutes = require('./profileRoutes');

routes.use('/', htmlRoutes);
routes.use('/api', apiRoutes);
routes.use('/dashboard', dashboardRoutes);
routes.use('/profile', profileRoutes);

module.exports = routes;