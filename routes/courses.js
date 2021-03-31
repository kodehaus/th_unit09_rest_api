var express = require('express');
var router = express.Router();
const { Course } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');
const   { asyncHandler } = require('../middleware/errorHandler');

/* GET  */
router.get('/', asyncHandler(async function (req, res, next) {
  let courses = await Course.findAll();
  res.json(courses);
}));

/* GET  */
router.get('/:id', asyncHandler(async function (req, res, next) {
  const course = await Course.findByPk(req.params.id);
 if(course){
  res.json({course});
 } else {
   next();
 }
}));

/* POST  */
router.post('/', authenticateUser, asyncHandler(async function (req, res, next) {
  let course = await Course.build(req.body);
  try{
    course = await course.save();
    res.status(201).location('/').json({course})
  } catch(error){
    throw error;
  }
}));

/* PUT  */
router.put('/:id', authenticateUser, asyncHandler(async function (req, res, next) {
  console.log('reqparam: ' + req.params.id);
  let course = await Course.findByPk(req.body.id);

  try{
    await Course.update({
      title:  req.body.title,
      description: req.body.description,
      estimatedTime: req.body.estimatedTime,
      materialsNeeded: req.body.materialsNeeded,
    },
    {
      where:{id: req.body.id}
    });
    res.status(204).send();
  } catch(error) {
    throw error;
  }
}));

/* DELETE  */
router.put('/:id/delete', authenticateUser, asyncHandler(async function (req, res, next) {
  let course = await Course.findByPk(req.body.id);
  await course.destroy();
  res.status(204).send();
}));

module.exports = router;
