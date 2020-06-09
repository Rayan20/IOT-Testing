var express = require('express');
var router = express.Router();

router.get('/LEDLight', function(req, res, next) {
    res.render('LEDLight', { title: 'Express' });
});

module.exports = router;
