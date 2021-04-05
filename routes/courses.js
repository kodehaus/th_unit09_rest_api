var express = require('express');
var router = express.Router();
const { Course } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');
const   { asyncHandler } = require('../middleware/errorHandler');
const  { propertyFilter } = require('../middleware/propertyFilter')


const courseRequestHandler =  (cb) => {
   return asyncHandler(async function (req, res, next) {
    try{
      await cb(req, res, next);
    } catch(error) {
      let err = new Error('There was a problem processing your Course API request');
      if ((error.name == 'SequelizeForeignKeyConstraintError')  || (error.name == 'SequelizeValidationError')) {
        console.dir(error)
        if(error.errors){
          err.errors = error.errors;
        } else {
          err.errors= [error];
        }
        err.status = 400
        next(err);
      } else {
        next(error)
      } 
    }
  })
}

/* GET  */
router.get('/', courseRequestHandler(async function (req, res, next) {
  let courses = await Course.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt','userId']},
    include: {
      association: 'User',
      attributes: {exclude: ['createdAt', 'updatedAt','password']}
    }
  });
  res.json(courses);
}));

/* GET  */
router.get('/:id', courseRequestHandler(async function (req, res, next) {
  const course = await Course.findByPk(req.params.id,{
    attributes: ['id','title', 'description', 'estimatedTime', 'materialsNeeded'],
    include: {
      association: 'User',
      attributes: {exclude: ['createdAt', 'updatedAt','password']}
    }
  });
 if(course){
  res.json({course});
 } else {
   next();
 }
}));

/* POST  */
router.post('/', authenticateUser, courseRequestHandler(async function (req, res, next) {
  let course = await Course.build(req.body);
  course = await course.save();
  course = await Course.findAll({
    attributes: ['id','title', 'description', 'estimatedTime', 'materialsNeeded'],
    where:{id: course.id},
    include: {
      association: 'User',
      attributes: {exclude: ['createdAt', 'updatedAt','password']}
    }
  });
  res.status(201).location('/').json({course})
}));

/* PUT  */
router.put('/:id', authenticateUser, courseRequestHandler(async function (req, res, next) {
  let course = await Course.findByPk(req.params.id);
  if(course){
    await Course.update(req.body,
    {
      where:{id: course.id}
    });
    res.status(204).send();    
  } else {
    next();
  }
}));

/* DELETE  */
router.put('/:id/delete', authenticateUser, courseRequestHandler(async function (req, res, next) {
  let course = await Course.findByPk(req.params.id);
  if(course){
    if((course.userId === + req.currentUser.id)){
      const courseTitle = course.title;
      await course.destroy();
      res.status(204).location('/').end();
    } else if(course.userId !== req.currentUser.id){
      let authErr = new Error('unable to update resource');
      authErr.status = 403;
      next(authErr);
    } 

  } else {
    next();
  }
}));



module.exports = router;
