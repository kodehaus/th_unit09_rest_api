'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        notEmpty: {
          msg: 'First name can not be empty. Please provide a value for the "firstName".'
        },
        notNull: {
          msg: 'Please provide a value for "firstName"'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        notEmpty: {
          msg: 'lastName can not be empty. Please provide a value for the "lastName".'
        },
        notNull: {
          msg: 'The value for the "lastName" can not be null.'
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:
      {
        notEmpty: {
          msg: 'emailAddress can not be empty. Please provide a value for the "emailAddress".'
        },
        notNull: {
          msg: 'The value for the "emailAddress" can not be null.'
        },
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        if(val){
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);  
        }
      },
      validate: {
        notEmpty: {
          msg: 'Password can not be empty. Please provide a value for the "password".'
        },
        notNull: {
          msg: 'The value for the "password" can not be null.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: 'userId'
    });
  };
  return User;
};
