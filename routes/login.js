var express = require('express');
var router = express.Router();
const loginController = require('../controller/loginController');

router.get('/', function (req, res, next) {
    res.render('login', {loginMessage: ' '});
});

router.get('/findAccount/:username', function (req, res, next) {
    var username = req.params.username;
    loginController.queryAccountByUsername(username, function (error, result) {
        if (error) {
            res.render('error');
        } else {
            res.status(200);
            if (!result) {
                res.send('no account found for ' + username);
            } else {
                res.redirect('/home');
            }
        }
    });
});

router.post('/registerAccount', function (req, res, next) {
    var accountForm = req.body;
    var username = accountForm.username;
    loginController.queryAccountByUsername(username, function (error, queryResult) {
        if (error) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({"signupMessage": "Encountered an internal error"}));
        } else {
            res.status(200);
            if (!queryResult || queryResult.rows.length < 1) {
                loginController.registerAccount(accountForm, function (error1, result) {
                    if (error1) {
                        console.log(error1);
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({"signupMessage": "Email already taken"}));
                    } else {
                        if (!result || result.rows.length < 1) {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({"signupMessage": "Registration failed" + error}));
                        } else {
                            res.status(200);
                            res.end('{"signupMessage":""}');
                        }
                    }

                })
            } else {
                 res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({"signupMessage": "Username already exists"}));
            }
        }
    })
});

router.post('/userLogin', function (req, res, next) {
    var loginForm = req.body;
    loginController.login(loginForm.username, loginForm.password, function (error, result) {
        if (error) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({"loginMessage": "Encountered an error during registration"}));
        } else {
            if (!result) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({"loginMessage": "Incorrect username or password"}));
            } else {
                var userNameFromDB = result.rows[0].username;
                if (req.body.stayLoggedIn === "true") {
                    var oneWeek = 7 * 24 * 3600 * 1000; //1 weeks
                    res.cookie(IOTCookie, userNameFromDB, {maxAge: oneWeek, httpOnly: false});
                } else {
                    var oneHour = 3600 * 1000; //1 HOUR
                    res.cookie(IOTCookie, userNameFromDB, {maxAge: oneHour, httpOnly: false});
                }
                res.status(200);
                res.end('{"loginMessage":""}');
            }
        }
    });
});

module.exports = router;
