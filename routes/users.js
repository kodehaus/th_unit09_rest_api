var express = require('express');
var router = express.Router();
const { User } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');
const   { asyncHandler } = require('../middleware/errorHandler');
const { UniqueConstraintError } = require('sequelize');

/* GET  */
router.get('/', authenticateUser, asyncHandler(function (req, res, next) {
  res.json(req.currentUser);
}));

/* POST  */
router.post('/', asyncHandler(async function (req, res, next) {
  let user = await User.build(req.body);
  try{
    user = await user.save();
    res.status(201).location('/').send();
  } catch(error){
    throw error;
  }
}));


module.exports = router;
