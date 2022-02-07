const {Articles, Comment, User, Vote }= require('../../models');

const routes = require('express').Router();

// get all articles
routes.get('/', (req, res) => {
  Articles.findAll({
    attributes: [
      'id',
      'title',
      'post_url',
      'user_id',
      'category_id'
    ]
   })
    .then(dbArticleData => res.json(dbArticleData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one article
routes.get('/:id', (req, res) => {
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

// create one article
routes.post('/', (req, res) => {

  Articles.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.session.user_id,
    category_id: req.body.category_id
  })
    .then(dbArticleData => res.json(dbArticleData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


routes.put('/:id', (req, res) => {
  Articles.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbArticleData => {
    if (!dbArticleData) {
      res.status(404).json({ message: 'No article found with this id' });
      return;
    }
    res.json(dbArticleData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// PUT /api/articles/upvote
routes.put('/upvote', (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Articles.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

routes.delete('/:id', (req, res) => {
  Articles.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbArticleData => {
      if (!dbArticleData) {
        res.status(404).json({ message: 'No article found with this id' });
        return;
      }
      res.json(dbArticleData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports= routes;