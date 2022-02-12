const routes = require("express").Router();
const urlMetadata = require("url-metadata");
const { Articles, User, Comment, Category } = require("../models");
const withAuth = require('../utils/auth');

routes.get('/', async (req, res) => {
  try {
    const dbCatData = await Category.findAll({
      include: [
        {
          model: Articles,
          attributes: ['id', 'title', 'post_url'],
        },
      ],
    });
    const categories = dbCatData.map((category) => category.get({ plain: true}));

    res.render('profile', {
      loggedIn: req.session.loggedIn,
      categories
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

routes.get('/categories/:id', withAuth, async (req, res) => {
  try {
    const dbCatData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Articles, 
          attributes: [
            'id',
            'title',
            'post_url',
          ]
        }, 
      ]
    });
    const category = dbCatData.get({ plain: true });
    res.render('categories', { 
      category,
      loggedIn: req.session.loggedIn
   });
  }catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})





routes.get("/articles/id", withAuth, async (req, res) => {
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
