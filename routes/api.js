var express = require('express');
var router = express.Router();
var ledController = require('../controller/ledController');

router.get('/LEDLight', function (req, res, next) {
    var mycookie = req.cookies[IOTCookie];
    if (!mycookie) {
        res.render('login', {loginMessage: ''});
    } else {
        res.render('LEDLight', {Username: mycookie, message: ''});
    }
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Express', loginMessage: ''});
});

router.get('/signup', function (req, res, next) {
    res.render('signup', {title: 'Express', signupMessage: ''});
});

router.get('/shoppingList', function (req, res, next) {
    res.render('shoppingList', {title: 'Express'});
});

router.get('/temperatureAndHumidity', function (req, res, next) {
    var mycookie = req.cookies[IOTCookie];
    if (!mycookie) {
        res.render('login', {loginMessage: ''});
    } else {
        res.render('temperatureAndHumidity', {Username: mycookie, message: ''});
    }
});

router.post('/led_control/color', ledController.setLEDColor);

router.post('/led_control/brightness', ledController.setLEDBrightness);

router.post('/led_control/toggle', ledController.toggle);

router.get('/clear_cookie', function (req, res, next) {
    res.clearCookie(IOTCookie);
    res.redirect('/login');
});

router.get('/led_control/client_ip/:ip', ledController.getIP);

router.get('/led_control/sync_data', ledController.syncData);

module.exports = router;
