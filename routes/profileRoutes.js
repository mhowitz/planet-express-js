const routes = require("express").Router();
const req = require("express/lib/request");
const urlMetadata = require("url-metadata");
const { Articles, User, Comment, Category, Vote } = require("../models");
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection')

routes.get('/', async (req, res) => {
  const dbCatData = await Category.findAll({});


  const categories = dbCatData.map((category) => category.get({ plain: true}));

  categories.forEach(category => {
    category.isHTML = false;
    category.isCSS = false;
    category.isJS = false;
    category.isSQL = false;
    category.isExpress = false;
    category.isNode = false;

    category.loggedIn = req.session.loggedIn
    if(category.id === 1){
      category.isHTML = true;
    } else if (category.id === 2){
      category.isCSS = true;
    } else if (category.id === 3){
      category.isJS = true;
    } else if (category.id === 4){
      category.isSQL = true;
    } else if (category.id === 5){
      category.isExpress = true;
    } else if (category.id === 6){
      category.isNode = true;
    }
  });

  res.render("profile", {
    loggedIn: req.session.loggedIn,
    categories,
    username: req.session.username
  });
});

routes.get('/categories/:id', withAuth, async (req, res) => {
  const dbCatData = await Category.findAll({
    where: { 
      id: req.params.id,
    },
    include: [
      {
        model: Articles, 
        attributes: [
          'id',
          'title',
          'post_url',
          'category_id',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE articles.id = vote.article_id)'),
          'vote_count']
        ],
        include: [
        {
          model: User,
          attributes: ['id', 'username']
        },
        {
          model: Comment
        }
      ]
      }, 
    ]
  });



  const category = dbCatData.map((category) => category.get({ plain: true }));

  const dbVoteData = await Vote.findAll({})

  console.log("category1111111111", category[0].articles);

  category[0].articles.forEach(article => {
    article.isHTML = false;
    article.isCSS = false;
    article.isJS = false;
    article.isSQL = false;
    article.isExpress = false;
    article.isNode = false;
  
    article.loggedIn = req.session.loggedIn;
    article.comment_num = article.comments.length;
    dbVoteData.forEach((vote) => {
      if((vote.dataValues.user_id === req.session.user_id) && (vote.dataValues.article_id === article.id)){
        article.userVoted = true;
      }
    })
    if(article.category_id === 1){
      article.isHTML = true;
    } else if (article.category_id === 2){
      article.isCSS = true;
    } else if (article.category_id === 3){
      article.isJS = true;
    } else if (article.category_id === 4){
      article.isSQL = true;
    } else if (article.category_id === 5){
      article.isExpress = true;
    } else if (article.category_id === 6){
      article.isNode = true;
    }
  })





  empty = false;

  if(category[0].articles.length === 0){
    empty = true
  }
  var promises = [];

  category[0].articles.forEach((article) =>
    promises.push(urlMetadata(article.post_url).then(
      function (metadata) {
        // success handler
        article.metadata = metadata.title;
        return category;
      },
      function (error) {
        // failure handler
        console.log(error);
      }
    )
  ))


  console.log("category",category);

  Promise.all(promises).then((data) => {
    console.log("data",data);
    data = data[0][0];
    console.log(data);

    let dataFilter = [];

    data.articles.forEach(article => {
      console.log(req.session.user_id);
      if(article.user.id === req.session.user_id){
        dataFilter.push(article);
      }
    })

    console.log("outside datafilter", dataFilter);

    res.render("categories", {
      loggedIn: req.session.loggedIn,
      category: dataFilter,
      empty: empty
    });
    } 
  )
});

module.exports = routes;



// routes.get("/articles/id", withAuth, async (req, res) => {
//   var promises = [];

//   const dbArticleData = await Articles.findAll({
//     where: { user_id: req.session.user_id },
//     attributes: ["id", "title", "post_url"],
//     order: [["created_at", "DESC"]]
//   });


//   let articles = dbArticleData.map((article) => article.get({ plain: true }));
//   articles.forEach((article) =>
//     promises.push(
//       urlMetadata(article.post_url).then(
//         function (metadata) {
//           // success handler
//           article.metadata = metadata.title;
//           return article;
//         },
//         function (error) {
//           // failure handler
//           console.log(error);
//         }
//       )
//     )
//   );



//   Promise.all(promises).then((data) => {
//     res.render("profile", {
//       loggedIn: req.session.loggedIn,
//       articles: data,
//     });
//   });
// });
