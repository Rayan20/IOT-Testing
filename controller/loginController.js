const pool = require('../db');
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
    const findAccountByUsernamePassword = {
        // give the query a unique name
        name: 'findAccount_by_usernameAndpassword',
        text: sqlQuery,
        values: [userIdentifier, password],
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
};

exports.registerAccount = function (registration, callback) {
    const addAccount = {
        // give the query a unique name
        name: 'addAccount',
        text: 'INSERT INTO test.account(username, password, email, created_on) VALUES($1, $2, $3, $4) RETURNING *',
        values: [registration.username, registration.password, registration.email, 'now()'],
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

};
