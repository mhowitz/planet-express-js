
const { Vote } = require('../models');


const votedata = [
  {
    user_id: 9,

    article_id:1

  },
  {
    user_id: 1,
    article_id:1
  },
  {
    user_id: 8,
    article_id:1

  },
  {
    user_id: 8,
    article_id:2

  },
  {
    user_id: 9,
    article_id:2
  },
  {
    user_id: 3,
    article_id:1

  },
  {
    user_id: 4,
    article_id:1
  }
];

const seedVotes = () => Vote.bulkCreate(votedata);

module.exports = seedVotes;
