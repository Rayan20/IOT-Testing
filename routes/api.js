var express = require('express');
var router = express.Router();
var ledController = require('../controller/ledController');

router.get('/LEDLight', function (req, res, next) {
    res.render('LEDLight', {title: 'Express', message: ''});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Express'});
});

router.get('/signup', function (req, res, next) {
    res.render('signup', {title: 'Express'});
});

router.post('/led_control/color', ledController.setLEDColor);
router.post('/test_blinker', ledController.testIOT);

module.exports = router;
