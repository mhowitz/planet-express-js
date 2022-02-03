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
module.exports = { User, Category, Articles, Comment, Vote };
