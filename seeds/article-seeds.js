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
  },
  {
    title: 'Font Awesome Icons',
    post_url: 'https://fontawesome.com/v5.15/icons?d=gallery&p=2',
    user_id: 5,
    category_id: 1
  },
  {
    title: 'Bulma',
    post_url: 'https://bulma.io/',
    user_id: 5,
    category_id: 2
  },
  {
    title: 'HTML attributes',
    post_url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes',
    user_id: 2,
    category_id: 1
  },
];

const seedArticles = () => Articles.bulkCreate(articleData, {individualHooks: true});

module.exports = seedArticles;
