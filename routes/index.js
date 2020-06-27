var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var mycookie = req.cookies[IOTCookie];
    if (!mycookie) {
        res.render('home', {loginMessage: ''});
    } else {
        res.render('signedInHome', {page: '', menuId: 'random', Username: mycookie});
    }
});

module.exports = router;
