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
      timestamps: false,
      underscored: true,
    }
  );

  UserModel.associate = (model) => {
    UserModel.hasMany(model.BlogPost, {
      foreignKey: 'userId',
      as: 'blogposts',
    });
  };
  return UserModel;
};
