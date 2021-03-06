
const routes = require("express").Router();
const urlMetadata = require("url-metadata");
const {Articles, User, Comment, Vote} = require("../models");
const sequelize = require('../config/connection')

const categories = [
  {"lang": "HTML",        "id": 1},
  {"lang": "CSS",         "id": 2},
  {"lang": "Javascript",  "id": 3},
  {"lang": "MySQL",       "id": 4},
  {"lang": "express",     "id": 5},
  {"lang": "node",        "id": 6}
]

routes.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

routes.get ("/", async (req, res) => {

  var promises = [];

  const dbArticleData = await Articles.findAll({
    attributes: [
      'id',
      'title',
      'post_url',
      'user_id',
      'category_id',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE articles.id = vote.article_id)'),
      'vote_count'

    ]
    ], include: [
      {
        model: User, 
        attributes: ['id', 'username']
      },
      {
        model: Comment
      }
    ],
    order: [["created_at", "DESC"]]
  });

  const dbVoteData = await Vote.findAll({})

  let articles = dbArticleData.map((article) => article.get({ plain: true }));

  articles.forEach(article => {
    article.isHTML = false;
    article.isCSS = false;
    article.isJS = false;
    article.isSQL = false;
    article.isExpress = false;
    article.isNode = false;

    article.loggedIn = req.session.loggedIn
    article.comment_num = article.comments.length
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
  });

  articles.sort(function(a,b){return b.vote_count - a.vote_count})
  

  articles.forEach((article) =>
    promises.push(urlMetadata(article.post_url).then(
      function (metadata) {
        // success handler
        article.metadata = metadata.title;
        return article;
      },
      function (error) {
        // failure handler
        console.log(error);
      }
    )
  ))
  
  empty = false;

  if(articles.length === 0){
    empty = true
  }

  Promise.all(promises).then((data) => {
    res.render("home", {
      loggedIn: req.session.loggedIn,
      articles: data,
      empty: empty
    });
  });
});

routes.get('/articles/comments/:id', async (req, res) => {
  const dbArticleData = await Articles.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE articles.id = vote.article_id)'),
      'vote_count'

    ]
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'article_id','user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        },
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    if(!dbArticleData){
      res.status(404).json({ message: 'no article found with this id' });
      return;
    };

const article = dbArticleData.get({ plain: true })
  res.render("articles", {
    article,
        loggedIn: req.session.loggedIn,
    

    });
  });

routes.get("/:option?/:option2?", async (req, res) => {
  // /category/html&css&javascript&mysql something to allow user to search multiple categories
  categoriesParams = req.params.option2 ? req.params.option2.split("&") : []
  var promises = [];
  let filter;
  if(req.params.option === "category"){
    //sets filter automatically based on above category array
    // filter = {category_id : categories.find(x => x.lang.toLowerCase() === req.params.option2.toLowerCase()).id}
    filter = {category_id: categoriesParams.map(category => categories.find(x => x.lang.toLowerCase() === category.toLowerCase()).id)}
  } else if (req.params.option === "user"){
    //if there is a number after /user
    if(Number.isInteger(parseInt(req.params.option2))){
      filter = {user_id : req.params.option2};
    } else {
      filter = {user_id : req.session.user_id}
    }
    
  } else {
    filter = {};
  }

  const dbArticleData = await Articles.findAll({
    where: filter,
    attributes: [
      'id',
      'title',
      'post_url',
      'user_id',
      'category_id',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE articles.id = vote.article_id)'),
      'vote_count'

    ]
    ], include: [
      {
        model: User, 
        attributes: ['id', 'username']
      },
      {
        model: Comment
      }
    ],
    order: [["created_at", "DESC"]]
  });

  const dbVoteData = await Vote.findAll({})

  let articles = dbArticleData.map((article) => article.get({ plain: true }));

  articles.forEach(article => {
    article.isHTML = false;
    article.isCSS = false;
    article.isJS = false;
    article.isSQL = false;
    article.isExpress = false;
    article.isNode = false;

    article.loggedIn = req.session.loggedIn
    article.comment_num = article.comments.length
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
  });

  articles.sort(function(a,b){return b.vote_count - a.vote_count})

  articles.forEach((article) =>
    promises.push(urlMetadata(article.post_url).then(
      function (metadata) {
        // success handler
        article.metadata = metadata.title;
        return article;
      },
      function (error) {
        // failure handler
        console.log(error);
      }
    )
  ))
  
  empty = false;

  if(articles.length === 0){
    empty = true
  }

  Promise.all(promises).then((data) => {
    res.render("home", {
      loggedIn: req.session.loggedIn,
      articles: data,
      empty: empty
    });
  });


});



module.exports = routes;

