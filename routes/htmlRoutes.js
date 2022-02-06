
const routes = require("express").Router();
const urlMetadata = require("url-metadata");
const {Articles} = require("../models");

routes.get("/", async (req, res) => {
  var promises = [];

  const dbArticleData = await Articles.findAll({
    attributes: ["id", "title", "post_url"],
  });

  let articles = dbArticleData.map((article) => article.get({ plain: true }));

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

routes.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});


module.exports = routes;

