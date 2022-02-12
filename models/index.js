const User = require('./User');
const Category = require('./Category');
const Articles = require('./Articles');
const Comment = require('./Comment');
const Vote = require('./Vote');

User.hasMany(Articles, {
    foreignKey: 'user_id'
});

Articles.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Category.hasMany(Articles, {
    foreignKey: 'category_id'
});

Articles.belongsTo(Category, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
})

Vote.belongsTo(Articles, {
    foreignKey: 'article_id'
});

Articles.hasMany(Vote, {
    foreignKey: 'article_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Articles, {
    foreignKey: 'article_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Articles.hasMany(Comment, {
    foreignKey: 'article_id'
});

User.belongsToMany(Articles, {
    through: Vote,
    as: 'voted_articles',
    foreignKey: 'user_id',
    // onDelete: 'SET NULL'
  });
  
 Articles.belongsToMany(User, {
    through: Vote,
    as: 'articles_voted',
    foreignKey: 'article_id',
    // onDelete: 'SET NULL'
  });

module.exports = { User, Category, Articles, Comment, Vote };
