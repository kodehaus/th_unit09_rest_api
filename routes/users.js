var express = require('express');
var router = express.Router();

/* GET  */
router.get('/', function (req, res, next) {
  res.json({ msg: 'users get route' });
});

/* POST  */
router.post('/', function (req, res, next) {
  res.json({ msg: 'users post route' });
});

module.exports = router;
