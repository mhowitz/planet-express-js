const routes = require('express').Router();
const {Category, User, Articles } = require('../../models');


// The `/api/categories` endpoint

routes.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Articles,
      }
    ]
  })
  .then(data => {
    res.json(data);
  })
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  });
  // find all categories
  // be sure to include its associated Products
});

routes.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Articles,
      }
    ]
  })
  .then(data => {
    res.json(data);
  })
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  });
  // find one category by its `id` value
  // be sure to include its associated Products
});

routes.post('/', (req, res) => {
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name,
  })
  .then(data => {
    res.json(data);
  })
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  });
  // create a new category
});

routes.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.json(data);
  })
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  });
});

routes.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.json(data);
  })
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  });
  // delete a category by its `id` value
});

module.exports = routes;