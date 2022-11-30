'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      modelName: 'User',
      tableName: 'users',
      timeStamps: false,
      underscored: true,
    }
  );

  UserModel.associate = (model) => {
    UserModel.hasMany(model.BlogPosts, {
      foreignKey: 'id',
      as: 'BlogPost',
    });
  };
  return UserModel;
};
