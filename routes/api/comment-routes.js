const routes = require('express').Router();
const { Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

routes.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// with auth goes after the '/',
routes.post('/', (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, article_id: 2}
  Comment.create({
    comment_text: req.body.comment_text,
    // req.session uses the users id from their session the
    user_id: req.session.user_id,
    article_id: req.body.article_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// with auth needs included after '/:id', withAuth,(req,res)
routes.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = routes;