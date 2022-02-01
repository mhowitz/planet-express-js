const routes = require('express').Router();
const { Router } = require('express');
const req = require('express/lib/request');
const htmlRoutes = require('./htmlRoutes.js');

routes.get('/',(req, res) => {
  res.render('home');
})

module.exports = routes;