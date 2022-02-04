const seedUsers = require('./user-seeds');
const seedCategories = require('./category-seeds');
// const seedPosts = require('./post-seeds');
// const seedComments = require('./comment-seeds');
// const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');
const seedArticles = require('./article-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');
<<<<<<< HEAD
  await seedArticles();

=======
  await seedCategories();
  console.log('--------------');
  // await seedPosts();
  // console.log('--------------');

  // await seedComments();
  // console.log('--------------');

  // await seedVotes();
  // console.log('--------------');
>>>>>>> cc2ff7deb2721499ae8979428c3883902dc422d3

  process.exit(0);
};

seedAll();
