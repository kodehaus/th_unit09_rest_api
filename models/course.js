'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        notEmpty: {
          msg: 'Title name can not be empty. Please provide a value for the "title".'
        },
        notNull: {
          msg: 'Please provide a value for "title"'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:
      {
        notEmpty: {
          msg: 'Description can not be empty. Please provide a value for the "description".'
        },
        notNull: {
          msg: 'The value for the "description" can not be null.'
        }
      }
    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        notEmpty: {
          msg: 'Estimated time can not be empty. Please provide a value for the "estimatedTime".'
        },
        notNull: {
          msg: 'The value for the "estimatedTime" can not be null.'
        }
      }
    },
    materialsNeeded: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        notEmpty: {
          msg: 'Materials Needed can not be empty. Please provide a value for the "materialsNeeded".'
        },
        notNull: {
          msg: 'The value for the "materialsNeeded" can not be null.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Course'
  });
  Course.associate = (models) => {
    Course.belongsTo(models.User,{
      foreignKey: 'userId', 
      allowNull: false
    });
  };
  return Course;
};
