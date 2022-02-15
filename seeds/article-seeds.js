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
  {
    title: 'MYSQL cheatsheet',
    post_url: 'https://www.mysqltutorial.org/mysql-cheat-sheet.aspx',
    user_id: 2,
    category_id: 4
  },
  {
    title: 'sequelize models',
    post_url: 'https://sequelize.org/v5/manual/models-definition.html',
    user_id: 2,
    category_id: 4
  },
  {
    title: 'Node.appendChild()',
    post_url: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild',
    user_id:5,
    category_id:6
  },
  {
    title: 'Flexbox Froggy',
    post_url: 'https://flexboxfroggy.com/',
    user_id: 2,
    category_id: 2
  }
];

const seedArticles = () => Articles.bulkCreate(articleData, {individualHooks: true});

module.exports = seedArticles;
