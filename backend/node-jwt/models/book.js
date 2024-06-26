'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('./index');

  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    publicationYear: DataTypes.INTEGER,
    subject: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
    freezeTableName: true,
    tableName: 'books',
    
  });
  
  module.exports = Book;

