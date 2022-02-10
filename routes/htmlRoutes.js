
const routes = require("express").Router();
const req = require("express/lib/request");
const urlMetadata = require("url-metadata");
const {Articles, User, Comment} = require("../models");
const sequelize = require('../config/connection');


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

  let articles = dbArticleData.map((article) => article.get({ plain: true }));

  articles.forEach(article => {
    article.loggedIn = req.session.loggedIn
    article.comment_num = article.comments.length
  });

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
  
  Promise.all(promises).then((data) => {
    res.render("home", {
      loggedIn: req.session.loggedIn,
      articles: data
    });
  });
});

routes.get("/:option?/:option2?", async (req, res) => {
  // /category/html&css&javascript&mysql something to allow user to search multiple categories
  categoriesParams = req.params.option2 ? req.params.option2.split("&") : []
  var promises = [];
  let filter;
console.log(req.params)
  if(req.params.option === "category"){
    //sets filter automatically based on above category array
    // filter = {category_id : categories.find(x => x.lang.toLowerCase() === req.params.option2.toLowerCase()).id}
    console.log(categoriesParams)
    filter = {category_id: categoriesParams.map(category => globalCategoriesArray.find(x => x.lang.toLowerCase() === category.toLowerCase()).id)}
    console.log(filter)
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

  let articles = dbArticleData.map((article) => article.get({ plain: true }));

  articles.forEach(article => {
    article.loggedIn = req.session.loggedIn
    article.comment_num = article.comments.length
  });

  console.log(articles);

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
  
  Promise.all(promises).then((data) => {
    res.render("home", {
      loggedIn: req.session.loggedIn,
      articles: data
    });
  });


});


module.exports = routes;

