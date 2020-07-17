var express = require('express');
var router = express.Router();
var ledController = require('../controller/ledController');

router.get('/LEDLight', function (req, res, next) {
    var mycookie = req.cookies[IOTCookie];
    if(!mycookie){
        res.render('login', {loginMessage: ''});
    }
    else{
        res.render('LEDLight', {Username: mycookie, message: '', toggle_response: '', color_response: '', brightness_response: ''});
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
    if(!mycookie){
        res.render('login', {loginMessage: ''});
    }
    else{
        res.render('temperatureAndHumidity', {Username: mycookie, message: ''});
    }
});

router.post('/led_control/color', ledController.setLEDColor);

// router.post('/test_blinker', ledController.testIOT);

router.post('/led_control/brightness', ledController.setLEDBrightness);

router.post('/led_control/toggle', ledController.toggle);

router.get('/clear_cookie', function (req, res, next) {
    res.clearCookie(IOTCookie);
    res.redirect('/login');
});

router.get('/led_control/client_ip/:ip', ledController.getIP);

router.post('/led_control/color_response'), function(req,res, next){
    var response_body = req.body;
    if(response_body == 1){
        res.send('LEDLight', {color_response: "Color has been updated", brightness_response: '', toggle_response: ''});
    }
    else{
        res.send('LEDLight', {color_response: "Error changing color", brightness_response: '', toggle_response: ''});
    }
};

router.post('/led_control/brightness_response'), function(req,res, next){
    var response_body = req.body;
    if(response_body == 1){
        res.send('LEDLight', {color_response: '', brightness_response: "Brightness has been updated", toggle_response: ''});
    }
    else{
        res.send('LEDLight', {color_response: '', brightness_response: "Error changing brightness", toggle_response: ''});
    }
};

router.post('/led_control/toggle_response'), function(req,res,next){
    var response_body = req.body;
    if(response_body == 1){
        res.send('LEDLight', {color_response: '', brightness_response: '', toggle_response: "LED is on"});
    }
    else{
        res.send('LEDLight', {color_respnse: '', brightness_response: '', toggle_response: ''});
    }
};

module.exports = router;
