const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "This is awesome!",
    user_id: 6,
    article_id: 1,
  },
  {
    comment_text:
      "So helpful.",
    user_id: 6,
    article_id: 2,
  },
  {
    comment_text: "I am a better programmer because of this article.",
    user_id: 3,
    article_id: 1,
  },
  {
    comment_text:
      "This documentation is SO confusing.",
    user_id: 3,
    article_id: 1,
  },
  {
    comment_text: "Do NOT use - last updated in 1890.",
    user_id: 7,
    article_id: 1,
  },
  {
    comment_text: "I love coding!",
    user_id: 1,
    article_id: 1,
  },
  {
    comment_text:
      "My boyfriend wrote this :)",
    user_id: 6,
    article_id: 2,
  },
  {
    comment_text: "Totally useless.",
    user_id: 7,
    article_id: 1,
  },
  {
    comment_text:
      "I <3 coding.",
    user_id: 6,
    article_id: 1,
  },
  {
    comment_text: "This is rad.",
    user_id: 6,
    article_id: 1,
  },
  {
    comment_text:
      "I got an A+++!",
    user_id: 3,
    article_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
