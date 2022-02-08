const { Vote } = require("../models");

const votedata = [
  {
    user_id: 9,
    article_id: 3,
  },
  {
    user_id: 1,
    article_id: 1,
  },
  {
    user_id: 8,
    article_id: 1,
  },
  {
    user_id: 8,
    article_id: 4,
  },
  {
    user_id: 9,
    article_id: 3,
  },
  {
    user_id: 3,
    article_id: 2,
  },
  {
    user_id: 4,
    article_id: 1,
  },
  {
    user_id: 10,
    article_id: 2,
  },
  {
    user_id: 3,
    article_id: 2,
  },
  {
    user_id: 9,
    article_id: 2,
  },
  {
    user_id: 3,
    article_id: 2,
  },
  {
    user_id: 10,
    article_id: 2,
  },
  {
    user_id: 6,
    article_id: 2,
  },
  {
    user_id: 5,
    article_id: 2,
  },
  {
    user_id: 6,
    article_id: 2,
  },
  {
    user_id: 9,
    article_id: 2,
  },
  {
    user_id: 6,
    article_id: 2,
  },
  {
    user_id: 6,
    article_id: 2,
  },
  {
    user_id: 6,
    article_id: 2,
  },
  {
    user_id: 1,
    article_id: 2,
  },
  {
    user_id: 10,
    article_id: 2,
  },
  {
    user_id: 4,
    article_id: 2,
  },
  {
    user_id: 10,
    article_id: 2,
  },
  {
    user_id: 5,
    article_id: 5,
  },
  {
    user_id: 6,
    article_id: 2,
  },
  {
    user_id: 1,
    article_id: 2,
  },
  {
    user_id: 7,
    article_id: 2,
  },
  {
    user_id: 6,
    article_id: 2,
  },
  {
    user_id: 6,
    article_id: 2,
  },
  {
    user_id: 7,
    article_id: 2,
  },
  {
    user_id: 4,
    article_id: 2,
  },
  {
    user_id: 2,
    article_id: 2,
  },
  {
    user_id: 9,
    article_id: 2,
  },
  {
    user_id: 10,
    article_id: 2,
  },
  {
    user_id: 8,
    article_id: 2,
  },
  {
    user_id: 10,
    article_id: 2,
  },
  {
    user_id: 2,
    article_id: 2,
  },
  {
    user_id: 9,
    article_id: 2,
  },
  {
    user_id: 1,
    article_id: 2,
  },
  {
    user_id: 10,
    article_id: 2,
  },
  {
    user_id: 10,
    article_id: 2,
  },
  {
    user_id: 5,
    article_id: 2,
  },
  {
    user_id: 6,
    article_id: 2,
  },
  {
    user_id: 5,
    article_id: 2,
  },
  {
    user_id: 6,
    article_id: 2,
  },
  {
    user_id: 8,
    article_id: 2,
  },
  {
    user_id: 3,
    article_id: 2,
  },
];

const seedVotes = () => Vote.bulkCreate(votedata);

module.exports = seedVotes;
