var express = require('express');
var router = express.Router();
const { User } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');
const   { asyncHandler } = require('../middleware/errorHandler');
const { UniqueConstraintError } = require('sequelize');
const  { propertyFilter } = require('../middleware/propertyFilter')


const userRequestHandler =  (cb) => {
  return asyncHandler(async function (req, res, next) {
   try{
     await cb(req, res, next);
   } catch(error) {
     let err = new Error('There was a problem processing your User API request');
     err.status = 400;
     if ((error.name == 'SequelizeForeignKeyConstraintError')  || (error.name == 'SequelizeValidationError') || (error.name == 'SequelizeUniqueConstraintError'))  {
       if(error.errors){
        err.errors = error.errors;
      } else {
        err.errors = [error];
       }

       next(err);
     } else {
       next(err)
     } 
   }
 })
}
/* GET  */
router.get('/', authenticateUser, userRequestHandler(function (req, res, next) {
  propertyFilter(res, req.currentUser.dataValues);
}));

/* POST  */
router.post('/', userRequestHandler(async function (req, res, next) {
  let user = await User.build(req.body);
  user = await user.save();
  user = await User.findAll({
    attributes: {exclude : ['createdAt','updatedAt','password']},
    where:{id: user.id}
  })
  res.json(user);
}));

module.exports = router;
