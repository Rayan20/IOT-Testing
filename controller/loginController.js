const pool = require('../db');
var crypto = require('crypto');
var config = require('../config');

var iv;
var encrypted;
var key;
var cipher;
var decipher;
var decrypted;

function encrypt(text) {
    return new Promise((resolve, reject) => {
        try {
            var cipher = crypto.createCipher('aes-256-cbc', config.environment.encryption.key);
            var encrypted = cipher.update(text, 'utf-8', 'hex');
            encrypted += cipher.final('hex');
            resolve(encrypted);
        } catch (exception) {
            reject("error encrypting");
        }


    })
}

function decrypt(encryptedPass) {
    return new Promise((resolve, reject) => {
        var decrypted = null;
        try {
            var decipher = crypto.createDecipher("aes-256-cbc", config.environment.encryption.key);
            var decrypted = decipher.update(encryptedPass, 'hex', 'utf-8');
            decrypted += decipher.final('utf-8');
            resolve(decrypted.toString());
        } catch (exception) {
            var msg = 'decryptAsync error. The encryptedData=\n' + encryptedPass;
            reject({message: msg});
        }
    });
}

exports.queryAccountByUsername = function (username, callback) {

    const findAccountByUsername = {
        // give the query a unique name
        name: 'findAccount_by_username',
        text: 'SELECT * FROM test.account WHERE username = $1',
        values: [username],
    };

    pool.connect((err, client, release) => {
        if (err) {
            return callback(err.stack, null);
        }
        client.query(findAccountByUsername, (err, res) => {
            release();
            if (err) {
                console.error("error in queryAccountByUsername " + err.stack);
                return callback(err.stack, null);
            } else {
                if (res.rows.length > 0) {
                    callback(null, res);
                } else {
                    callback(null, null);
                }
            }
        })
    })
};

exports.login = function (userIdentifier, password, callback) {
    var sqlQuery;
    if (userIdentifier.includes('@')) {
        sqlQuery = 'SELECT * FROM test.account WHERE email = $1 and password= $2';
    } else {
        sqlQuery = 'SELECT * FROM test.account WHERE username = $1 and password= $2';
    }
    encrypt(password).then(result => {
        const findAccountByUsernamePassword = {
            // give the query a unique name
            name: 'findAccount_by_usernameAndpassword',
            text: sqlQuery,
            values: [userIdentifier, result],
        };

        pool.connect((err, client, release) => {
            if (err) {
                return callback(err.stack, null);
            }
            client.query(findAccountByUsernamePassword, (err, res) => {
                release();
                if (err) {
                    console.error("error in findAccount_by_usernameAndpassword " + err.stack);
                    return callback(err.stack, null);
                } else {
                    if (res.rows.length > 0) {
                        callback(null, res);
                    } else {
                        callback(null, null);
                    }
                }
            })
        })
    });
};

exports.registerAccount = function (registration, callback) {
    if (registration.password) {
        encrypt(registration.password).then(result => {
            const addAccount = {
                // give the query a unique name
                name: 'addAccount',
                text: 'INSERT INTO test.account(username, password, email, created_on) VALUES($1, $2, $3, $4) RETURNING *',
                values: [registration.username, result, registration.email, 'now()'],
            };
            pool.connect((err, client, release) => {
                if (err) {
                    return callback(err.stack, null);
                }
                client.query(addAccount, (err, res) => {
                    release();
                    if (err) {
                        console.error("error in addAccount " + err.stack);
                        return callback(err.stack, null);
                    } else {
                        if (res.rows.length > 0) {
                            callback(null, res);
                        } else {
                            callback(null, null);
                        }
                    }
                })
            })

        })
    } else {
        callback('error', null);
    }
};

