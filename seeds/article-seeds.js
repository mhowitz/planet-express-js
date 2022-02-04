const sequelize = require('../config/connection');
const {Articles } = require('../models');

const articleData = [
  {
    title: 'Javascript Chat Plugins',
    post_url: 'https://bashooka.com/coding/10-best-javascript-plugins-to-add-live-support-chat/',
    user_id: 1,
    category_id: 3
  },
  {
    title: 'Color Palette',
    post_url: 'https://coolors.co/',
    user_id: 4,
    category_id: 2
  }
];

const seedArticles = () => Articles.bulkCreate(articleData, {individualHooks: true});

module.exports = seedArticles;
