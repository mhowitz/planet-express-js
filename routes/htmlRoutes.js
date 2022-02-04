const routes = require('express').Router();
const { Articles, User, Comment } = require('../models');


routes.get('/', (req, res) => {
  console.log(req.session);

  Articles.findAll({
    attributes: [
      'id',
      'title',
      'post_url'
    ]
   })
    .then(dbArticleData => {
      const articles = dbArticleData.map(article => article.get({ plain: true }));
      res.render('home', {
        loggedIn: req.session.loggedIn,
        articles
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });



  
});

routes.get('/login', (req, res) => {
  if(req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

module.exports = routes;