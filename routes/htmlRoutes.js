const routes = require('express').Router();
const { Articles, User, Comment, Category } = require('../models');


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

// routes.get('/post/:id', (req,res) => {
//   Articles.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'title',
//       'post_url',
//       'user_id',
//       'category_id'
//     ],
//     include: [
//       {
//         model: Category,
//         attributes: ['id', 'category_name']
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   }).then(dbArticlePost => {

//   })
// })

module.exports = routes;