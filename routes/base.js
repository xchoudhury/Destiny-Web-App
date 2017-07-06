var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/home', function (req, res) {
  res.send('Hello World! This is my first node app! ' + process.env.TEST)
})

module.exports = router;
