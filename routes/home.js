var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('home', { message1: '', docId:'',message2: ''});
});

module.exports = router;
