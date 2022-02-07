const routes = require("express").Router();
const urlMetadata = require("url-metadata");
const { Articles, User, Comment, Category } = require("../models");

routes.get("/", async (req, res) => {
  var promises = [];
  console.log(req.session);
  console.log(req.session.user_id);

  const dbArticleData = await Articles.findAll({
    where: { user_id: req.session.user_id },
    attributes: ["id", "title", "post_url"],
    order: [["created_at", "DESC"]]
  });

  console.log(dbArticleData);

  let articles = dbArticleData.map((article) => article.get({ plain: true }));

  console.log(articles);

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
    console.log("data", data);
    res.render("profile", {
      loggedIn: req.session.loggedIn,
      articles: data,
    });
  });
});

module.exports = routes;
