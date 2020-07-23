const config = require('./config');
const {Pool} = require('pg');
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
