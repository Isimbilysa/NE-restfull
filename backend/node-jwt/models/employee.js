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
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    nationalId: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    department: DataTypes.STRING,
    position: DataTypes.STRING,
    laptopManufacturer: DataTypes.STRING,
    model: DataTypes.STRING,
    serialnumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
    freezeTableName: true,
    tableName: 'Employee',
    
  });
  return Employee;
};





