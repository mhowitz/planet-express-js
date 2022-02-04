const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'HTML',
  },
  {
    category_name: 'CSS',
  },
  {
    category_name: 'Javascript',
  },
  {
    category_name: 'MYSQL',
  },
  {
    category_name: 'Express',
  },
  {
      category_name: 'Node'
  }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
