const routes = require("express").Router();
const urlMetadata = require("url-metadata");
const { Articles, User, Comment, Category } = require("../models");
const withAuth = require('../utils/auth');

routes.get("/", withAuth, async (req, res) => {
  var promises = [];

  const dbArticleData = await Articles.findAll({
    where: { user_id: req.session.user_id },
    attributes: ["id", "title", "post_url"],
    order: [["created_at", "DESC"]]
  });

  let articles = dbArticleData.map((article) => article.get({ plain: true }));

  articles.forEach((article) =>
    promises.push(
      urlMetadata(article.post_url).then(
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
    )
  );

  Promise.all(promises).then((data) => {
    res.render("profile", {
      loggedIn: req.session.loggedIn,
      articles: data,
    });
  });
});

module.exports = routes;
