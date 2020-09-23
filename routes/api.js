var express = require('express');
var router = express.Router();
var iot_controller = require('../controller/iot_controller');

router.get('/LEDLight', function (req, res, next) {
    var mycookie = req.cookies[IOTCookie];
    if (!mycookie) {
        res.render('login', {loginMessage: ''});
    } else {
        res.render('LEDLight', {Username: mycookie, message: ''});
    }
});

router.get('/monitor', function (req, res, next) {
    var mycookie = req.cookies[IOTCookie];
    if (!mycookie) {
        res.render('login', {loginMessage: ''});
    } else {
        res.redirect('https://angular-iot.herokuapp.com');
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

router.post('/led_control/color', iot_controller.setLEDColor);

router.post('/led_control/brightness', iot_controller.setLEDBrightness);

router.post('/led_control/toggle', iot_controller.toggle);

router.get('/clear_cookie', function (req, res, next) {
    res.clearCookie(IOTCookie);
    res.redirect('/login');
});

router.get('/led_control/client_ip/:ip', iot_controller.getIP);

router.get('/led_control/sync_data', iot_controller.syncData);

router.get('/temp_control/temperature', iot_controller.get_weather_data);

router.get('/weatherHistory', function (req, res, next) {
    res.render('weatherHistory', {title: 'Express'});
});

router.get('/temp_control/query_data/:history', iot_controller.queryData);

module.exports = router;
