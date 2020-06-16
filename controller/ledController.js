var request = require('request');
var config = require('../config');
exports.setLEDColor = function (req, res) {
    var led_color = req.body;
    if (!led_color) {
        res.send({'code': 400, 'data': null, 'status': 'LED color is invalid'});
    } else {
        var r = led_color.r;
        var b = led_color.b;
        var g = led_color.g;

        res.end({
            'code': 200,
            'data': {
                r: r, b: b, g: g
            },
            'status': 'success'
        });
        //call remote device's api
        //reqest.post();
//// Request sample: /?r201g32b255&


    }
} ;

// function callIOT() {
//
//     request.post({
//         //url: your IoT device url,
//         //headers: requestHeaders,
//         json: data
//
//     }, function (err, response) {
//
//         if (err) {
//             if (callback) callback(err, null);
//         } else {
//             // logger.info('postScoreToPA http response=' + JSON.stringify(response.body));
//             if (response.statusCode == 200) {
//
//                 if (callback) callback(null, 'ok');
//             } else if (response.statusCode !== 200) {
//             }
//         }
//     });
// }

exports.testIOT = function (req,res) {
    request.get({
        url: config.environment.iot.server+':8080/lightblink',
        //headers: requestHeaders,
       // json: data

    }, function (err, response) {

        if (err) {
            if (callback) callback(err, null);
        } else {
            // logger.info('postScoreToPA http response=' + JSON.stringify(response.body));
            if (response.statusCode == 200) {

                if (callback) callback(null, 'ok');
            } else if (response.statusCode !== 200) {
            }
        }
    });

}

exports.testBlinker = function (req, res) {
    let inputNumber = req.body;
    if (!inputNumber) {
        res.send({'code': 400, 'data': null, 'status': 'Number is invalid'});
    } else {

        res.send({
            'code': 200,
            'data': {
                input: inputNumber
            },
            'status': 'success'
        });
        //call remote device's api
        //request.post();
//// Request sample: /?r201g32b255&


    }
};