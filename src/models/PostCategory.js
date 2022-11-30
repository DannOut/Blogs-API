'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      modelName: 'PostCategory',
      tableName: 'posts_categories',
      timestamps: false,
      underscored: true,
    }
  );
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'postId',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categoryId',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return PostCategory;
};
