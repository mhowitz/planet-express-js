const seedUsers = require('./user-seeds');
const seedCategories = require('./category-seeds');
const seedComments = require('./comment-seeds');

// const seedPosts = require('./post-seeds');
// const seedComments = require('./comment-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');
const seedArticles = require('./article-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');
  await seedCategories();
  console.log('--------------');
    await seedArticles();
  console.log('--------------');
  await seedComments();
  console.log('--------------');
  // await seedComments();
  // console.log('--------------');

  await seedVotes();
  console.log('--------------');

  process.exit(0);
};

seedAll();
