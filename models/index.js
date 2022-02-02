const User = require('./User');
const Category = require('./Category');
const Articles = require('./Articles');

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
module.exports = { User, Category, Articles };