const session = require('express-session');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Articles extends Model {

    static upvote(body, models) {
      return models.Vote.create({
        user_id: body.user_id,
        article_id: body.article_id
      }).then(() => {
        return Articles.findOne({
          where: {
            id: body.article_id
          },
          attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM vote WHERE articles.id = vote.article_id)'),
              'vote_count'
            ]
          ], include: [
          {
            model: models.User,
            attributes: ['id', 'username']
          }
          ]
        });
      });
    }
  }

// class Articles extends Model {}

Articles.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isURL: true
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'category',
            key: 'id'
        }
    },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'articles'
    // timestamps: false
}
);

module.exports = Articles;
