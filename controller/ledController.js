var request = require('request');
var config = require('../config');
exports.setLEDColor = function (req, res) {

    var led_color = req.body;
    var r = led_color.r;
    var g = led_color.g;
    var b = led_color.b;

    request.post({
        url: config.environment.iot.server + ':8080/update_light',
        data: {
            r: r, g: g, b: b
        },
        headers: {
            'Content-Type': 'application/json'
        }

    }, function (err, response) {

        if (err) {
            console.log(err);

        } else {

            if (response.statusCode == 200) {
                console.log("status code=" + response.statusCode);

            } else if (response.statusCode !== 200) {
                console.log("non 200 status code=" + response.statusCode);
            }
        }

        res.send({
            'code': 200,
            'data': {
                'r': r, 'b': b, 'g': g
            },
            'status': 'success'
        });
    });
};


exports.testIOT = function (req, res) {

    var blinkCount = req.body.input;
    var delay = req.body.input1;

    request.post({
        url: config.environment.iot.server + ':8080/lightblink_post',
        json: {
            blinkCount: blinkCount,
            delay: delay
        }

    }, function (err, response) {

        if (err) {
            console.log(err);

        } else {

            if (response.statusCode == 200) {

            } else if (response.statusCode !== 200) {
            }
        }
    });
};

exports.setLEDBrightness = function (req, res) {

    var brightness = req.body;

    request.post({
        url: config.environment.iot.server + ':8080/lightblink',
        data: {
            brightness: brightness
        },
        headers: {
            'Content-Type': 'application/json'
        }

    }, function (err, response) {

        if (err) {
            console.log(err);

        } else {

            if (response.statusCode == 200) {
                console.log("status code=" + response.statusCode);

            } else if (response.statusCode !== 200) {
                console.log("non 200 status code=" + response.statusCode);
            }
        }

        res.send({
            'code': 200,
            'data': {
                'brightness': brightness
            },
            'status': 'success'
        });
    });
};

exports.toggle = function (req, res) {

    var toggle = req.body;

    request.post({
        url: config.environment.iot.server + ':8080/lightblink',
        data: {
            toggle: toggle
        },
        headers: {
            'Content-Type': 'application/json'
        }

    }, function (err, response) {

        if (err) {
            console.log(err);

        } else {

            if (response.statusCode == 200) {
                console.log("status code=" + response.statusCode);

            } else if (response.statusCode !== 200) {
                console.log("non 200 status code=" + response.statusCode);
            }
        }

        res.send({
            'code': 200,
            'data': {
                'toggle': toggle
            },
            'status': 'success'
        });
    });
};

