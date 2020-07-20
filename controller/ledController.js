var request = require('request');
var config = require('../config');

exports.setLEDColor = function (req, res) {


    var led_color = req.body;
    var r = led_color.r;
    var g = led_color.g;
    var b = led_color.b;

    request.post({
        url: 'http://' + clientIP + ':8080/update_rgb',
        json: {
            r: r, g: g, b: b
        }

    }, function (err, response) {

        if (err) {
            console.log(err);

        } else {

            if (response.statusCode == 200) {
                console.log("status code=" + response.statusCode);
                console.log("status code=" + response.statusMessage);
                res.send({
                    'code': 200,
                    'data': {
                        'r': r, 'b': b, 'g': g
                    },
                    'status': response.headers['content-type']
                });

            } else if (response.statusCode !== 200) {
                console.log("non 200 status code=" + response.statusCode);
                res.send({
                    'code': 200,
                    'data': {
                        'r': r, 'b': b, 'g': g
                    },
                    'status': response.headers['content-type']
                });
            }
        }

    });
};


// exports.testIOT = function (req, res) {
//
//     var blinkCount = req.body.input;
//     var delay = req.body.input1;
//
//     request.post({
//         url: config.environment.iot.server + ':8080/lightblink',
//         json: {
//             blinkCount: blinkCount,
//             delay: delay
//         }
//
//     }, function (err, response) {
//
//         if (err) {
//             console.log(err);
//
//         } else {
//
//             if (response.statusCode == 200) {
//
//             } else if (response.statusCode !== 200) {
//             }
//         }
//     });
// };

exports.setLEDBrightness = function (req, res) {

    var brightnessBody = req.body;
    var brightness = brightnessBody.brightness;


    request.post({
        url: 'http://' + clientIP + ':8080/update_brightness',
        json: {
            brightness: brightness
        }

    }, function (err, response) {

        if (err) {
            console.log(err);

        } else {

            if (response.statusCode == 200) {
                console.log("status code=" + response.headers['content-type']);

            } else if (response.statusCode !== 200) {
                console.log("non 200 status code=" + response.statusCode);
            }
        }

        res.send({
            'code': 200,
            'data': {
                'brightness': brightness
            },
            'status': response.headers['content-type']
        });
    });
};

exports.toggle = function (req, res) {

    var toggleBody = req.body;
    var toggle = toggleBody.toggle;


    request.post({
        url: 'http://' + clientIP + ':8080/toggle_led',
        json: {
            "toggle": toggle
        }

    }, function (err, response) {

        if (err) {
            console.log(err);

        } else {

            if (response.statusCode == 200) {
                console.log("status code=" + response.headers['content-type']);

            } else if (response.statusCode !== 200) {
                console.log("non 200 status code=" + response.statusCode);
            }
        }

        res.send({
            'code': 200,
            'data': {
                'toggle': toggle
            },
            'status': response.headers['content-type']
        });
    });
};

exports.getIP = function (req, res) {
    var ip = req.params.ip;
    clientIP = ip;
    res.send(200);
    console.log("Received IP is: " + ip);
};

exports.syncData = function (req, res) {
    request.get({
        url: 'http://' + clientIP + ':8080/sync_data',
    }, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            if (response.statusCode == 200) {
                console.log("status code=" + "200");
            } else if (response.statusCode != 200) {
                console.log("non 200 status code=");
            }
        }
        var resultJSON = JSON.parse(response.body);
        var resultToggle = resultJSON.toggle;
        var resultRed = resultJSON.red;
        var resultGreen = resultJSON.green;
        var resultBlue = resultJSON.blue;
        var resultBrightness = resultJSON.brightness;

        res.send({
            'code': 200,
            'status': resultJSON
        });
    });

};


