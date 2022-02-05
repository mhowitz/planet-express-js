const routes = require('express').Router();
const urlMetadata = require('url-metadata');
const { Articles, User, Comment } = require('../models');


routes.get('/', async (req, res) => {
  console.log(req.session);

  const dbArticleData = await Articles.findAll({
    attributes: [
      'id',
      'title',
      'post_url'
    ]
   });
   
  const articles = dbArticleData.map(article => article.get({ plain: true }));

  await Promise.all(articles.map(async (url) => {
    const title = await urlMetadata(url);
    console.log(title);
  }));


  res.render('home', {
    loggedIn: req.session.loggedIn,
    articles
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