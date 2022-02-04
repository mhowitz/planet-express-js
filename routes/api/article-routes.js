const {Articles }= require('../../models');

const routes = require('express').Router();

// get all articles
routes.get('/', (req, res) => {
  Articles.findAll({
    attributes: [
      'id',
      'title',
      'post_url'
    ]
   })
    .then(dbArticleData => res.json(dbArticleData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one article
routes.get('/', (req, res) => {
  Articles.findOne({
    where: {
      id: req.params.id
    }
   })
    .then(dbArticleData => res.json(dbArticleData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one article
routes.post('/', (req, res) => {

  Articles.create({
    title: req.body.title,
    post_url: req.body.url,
    user_id: req.body.user_id,
    category_id: req.body.category_id
  })
    .then(dbArticleData => res.json(dbArticleData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports= routes;