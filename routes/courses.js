var express = require('express');
var router = express.Router();

/* GET  */
router.get('/', function (req, res, next) {
  res.json({ msg: 'courses get route' });
});

/* GET  */
router.get('/:id', function (req, res, next) {
  res.json({ msg: 'courses get route with id: ' + req.params.id + ' post route' });
});

/* POST  */
router.post('/courses', function (req, res, next) {
  res.json({ msg: 'courses post route' });
});

/* PUT  */
router.put('/courses/:id', function (req, res, next) {
  res.json({ msg: 'courses PUT route with id:' + req.params.id });
});

/* DELETE  */
router.put('/courses/:id/delete', function (req, res, next) {
  res.json({ msg: 'courses DELETE route with id:' + req.params.id });
});

module.exports = router;
