var request = require('request');
var config = require('../config');
const pool = require('../db');

exports.setLEDColor = function (req, res) {


    var led_color = req.body;
    var r = led_color.r;
    var g = led_color.g;
    var b = led_color.b;

    request.post({
        url: 'http://' + clientIP + ':8080/update_rgb',
        json: {
            r: r, g: g, b: b
        },
        timeout: 5000

    }, function (err, response) {

        if (err) {
            console.log(err);
            if (err.code === 'EHOSTUNREACH') {
                return res.send("500");
            } else {
                return res.send("500");

            }
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

exports.setLEDBrightness = function (req, res) {

    var brightnessBody = req.body;
    var brightness = brightnessBody.brightness;


    request.post({
        url: 'http://' + clientIP + ':8080/update_brightness',
        json: {
            brightness: brightness
        },
        timeout: 5000

    }, function (err, response) {

        if (err) {
            console.log(err);
            if (err.code === 'EHOSTUNREACH') {
                return res.send("500");
            } else {
                return res.send("500");
            }
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
        },
        timeout: 5000

    }, function (err, response) {

        if (err) {
            console.log(err);
            if (err.code === 'EHOSTUNREACH') {
                return res.send("500");
            } else {
                return res.send("500");
            }
        } else {

            if (response.statusCode == 200) {
                console.log("status code=" + response.headers['content-type']);

            } else if (response.statusCode !== 200) {
                console.log("non 200 status code=" + response.statusCode);
            }
            res.send({
                'code': 200,
                'data': {
                    'toggle': toggle
                },
                'status': response.headers['content-type']
            });
        }
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
        timeout: 5000
    }, function (err, response) {
        if (err) {
            if (err.code === 'EHOSTUNREACH') {
                return res.send("500");
            } else {
                return res.send("500");
            }
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

exports.get_weather_data = function (req, res) {
    request.get({
            url: 'http://' + clientIP + ':8080/get_weather_data',
            timeout: 5000
        }, function (err, response) {
            if (err) {
                if (err.code === 'EHOSTUNREACH') {
                    return res.send("500");
                } else {
                    return res.send("500");
                }
                console.log(err);
            } else {
                if (response.statusCode == 200) {
                    console.log("status code=" + "200");
                } else if (response.statusCode != 200) {
                    return console.log("non 200 status code=");
                }
            }
            var resultJSON = JSON.parse(response.body);

            res.send({
                'code': 200,
                'status': resultJSON
            });
        }
    );
};

var requestLoop = setInterval(function () {
    request.get({
        url: 'http://' + clientIP + ':8080/get_weather_data',
        timeout: 5000
    }, function (err, response) {
        if (err) {
            if (err.code === 'EHOSTUNREACH') {
                return console.log(err);
            } else {
                return console.log(err);
            }
            return console.log(err);
        } else {
            if (response.statusCode == 200) {
                console.log("status code=" + "200");
            } else if (response.statusCode != 200) {
                console.log("non 200 status code=");
            }
        }

        var resultJSON = JSON.parse(response.body);
        exports.addData(resultJSON);

    })
}, 60000);

exports.addData = function (data) {
    var celsius = data.temp;
    var fahrenheit_unround = (celsius * 9 / 5) + 32;
    var fahrenheit = fahrenheit_unround.toFixed(2);
    var humidity = data.humidity;
    const addData = {
        name: 'addWeather',
        text: 'INSERT INTO test.weather(time_stamp, fahrenheit, celsius, humidity) VALUES($1, $2, $3, $4) RETURNING *',
        values: ['now()', fahrenheit, celsius, humidity]
    };
    pool.connect((err, client, release) => {
        if (err) {
            console.log(err);
        }
        client.query(addData, (err, res) => {
            release();
            if (err) {
                console.error("error in addData " + err.stack);
            }
        })
    })
};

exports.queryData = function (req, res) {

    var history = req.params.history;
    var weatherJSON = [];
    var mycookie = req.cookies[IOTCookie];


    if (history === "hour") {

        const getData = {
            name: 'getWeather',
            text: 'SELECT * FROM test.Weather AS "Weather" WHERE "Weather"."time_stamp" BETWEEN NOW() - INTERVAL \'1 HOURS\' AND NOW() ORDER BY "Weather"."time_stamp" DESC'
        };
        pool.connect((err, client, release) => {
            release();
            if (err) {
                console.log(err);
                res.send("error");
            }
            client.query(getData).then((result) => {
                if (!result) {
                    return console.log("result.rows is empty");
                }
                for (let row in result.rows) {
                    var weatherArray = result.rows[row];
                    weatherJSON.push(weatherArray);
                }
                client.end();
                console.log(weatherJSON);

                if (err) {
                    console.log('error in addWeather' + err.stack);
                }
                return res.render('weatherHistory', {"data": weatherJSON, "Username": mycookie});
            }).then(f => {
                console.log(f);
            }).catch(e => {
                if (err) {
                    return console.error('error running query', err);
                }

            })
        })

    } else if (history === "day") {

        var history = req.params.history;

        const getData = {
            name: 'getWeather',
            text: 'SELECT * FROM test.weather AS "Weather" WHERE "Weather"."time_stamp" BETWEEN NOW() - INTERVAL \'24 HOURS\' AND NOW() ORDER BY "Weather"."time_stamp" DESC'
        };
        pool.connect((err, client, release) => {
            release();
            if (err) {
                console.log(err);
                res.send("error");
            }
            client.query(getData).then((result) => {
                if (!result) {
                    return console.log("result.rows is empty");
                }
                for (let row in result.rows) {
                    var weatherArray = result.rows[row];
                    weatherJSON.push(weatherArray);
                }
                client.end();
                console.log(weatherJSON);

                if (err) {
                    console.log('error in addWeather' + err.stack);
                }
                return res.render('weatherHistory', {"data": weatherJSON, "Username": mycookie});
            }).then(f => {
                console.log(f);
            }).catch(e => {
                if (err) {
                    return console.error('error running query', err);
                }

            })
        });

    } else if (history === "week") {

        var history = req.params.history;

        const getData = {
            name: 'getWeather',
            text: 'SELECT * FROM test.weather AS "Weather" WHERE "Weather"."time_stamp" BETWEEN NOW() - INTERVAL \'148 HOURS\' AND NOW() ORDER BY "Weather"."time_stamp" DESC'
        };
        pool.connect((err, client, release) => {
            release();
            if (err) {
                console.log(err);
                res.send("error");
            }
            client.query(getData).then((result) => {
                if (!result) {
                    return console.log("result.rows is empty");
                }
                for (let row in result.rows) {
                    var weatherArray = result.rows[row];
                    weatherJSON.push(weatherArray);
                }
                client();
                console.log(weatherJSON);

                if (err) {
                    console.log('error in addWeather' + err.stack);
                }
                return res.render('weatherHistory', {"data": weatherJSON, "Username": mycookie});
            }).then(f => {
                console.log(f);
            }).catch(e => {
                    if (err) {
                        return console.error('error running query', err);
                    }

                })
        })

    }
};

