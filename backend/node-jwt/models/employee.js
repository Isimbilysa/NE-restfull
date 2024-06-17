'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    nationalIdentity: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    department: DataTypes.STRING,
    position: DataTypes.STRING,
    laptopManufacturer: DataTypes.STRING,
    model: DataTypes.STRING,
    serialNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};