'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define(
    'BlogPost',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      modelName: 'BlogPost',
      tableName: 'blog_posts',
      timestamps: false,
      underscored: true,
    }
  );

  BlogPostModel.associate = (model) => {
    BlogPostModel.belongsTo(model.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return BlogPostModel;
};
