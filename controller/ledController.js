var request = require('request');
var config = require('../config');
exports.setLEDColor = function (req, res) {
    var led_color = req.body;
    var r = led_color.r;
    var g = led_color.g;
    var b = led_color.b;
    request.post({
        url: config.environment.iot.server + ':8080/lightblink',
        data: {
            r: r, g: g, b: b
        },
        headers: {
            'Content-Type': 'application/json'
        }

    }, function (err, response) {

        if (err) {
            //if (callback) callback(err, null);
            console.log(err);
        } else {

            if (response.statusCode == 200) {
                console.log("status code=" + response.statusCode);
                //if (callback) callback(null, 'ok');
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
    var input = req.body.input;
    request.post({
        url: config.environment.iot.server + ':8080/lightblink',
        data: input

    }, function (err, response) {

        if (err) {
            if (callback) callback(err, null);
        } else {
            if (response.statusCode == 200) {

                if (callback) callback(null, 'ok');
            } else if (response.statusCode !== 200) {
            }
        }
    });
};
