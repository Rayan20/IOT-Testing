const config = require('./config');
const { Pool } = require('pg');
const pool = new Pool({
    user: config.environment.db.user,
    host: config.environment.db.host,
    database: config.environment.db.database,
    password: config.environment.db.password,
    port: config.environment.db.port,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});
module.exports = pool;


// module.exports = {
//     /**
//      * Get a connection from the pool.
//      *
//      * @param callback - A callback that takes in an error and a connection.
//      */
//     getConnection: function (callback) {
//         pool.getConnection((err, connection) => callback(err, connection));
//     },
//
//     /**
//      * Release a connection back into the pool.
//      *
//      * @param connection - The connection to release.
//      */
//     releaseConnection: function (connection) {
//         if (connection) {
//             connection.release();
//         }
//     }
// };