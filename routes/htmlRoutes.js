const routes = require('express').Router();
const { Articles, User, Comment } = require('../models');


routes.get('/',(req, res) => {
  res.render('home');
});

routes.get('/login', (req, res) => {
  if(req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

module.exports = routes;