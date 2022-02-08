
const routes = require("express").Router();
const urlMetadata = require("url-metadata");
const {Articles} = require("../models");

const categories = [
  {"lang": "HTML", "id": 1},
  {"lang": "CSS", "id": 2},
  {"lang": "Javascript", "id": 3},
  {"lang": "MySQL", "id": 4},
  {"lang": "express", "id": 5},
  {"lang": "node", "id": 6}
]

routes.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

routes.get("/:option?/:option2?", async (req, res) => {
  var promises = [];
  let filter;

  if(req.params.option === "category"){
    //sets filter automatically based on above category array
    filter = {category_id : categories.find(x => x.lang.toLowerCase() === req.params.option2.toLowerCase()).id}
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
    attributes: ["id", "title", "post_url"],
    order: [["created_at", "DESC"]]
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


module.exports = routes;

