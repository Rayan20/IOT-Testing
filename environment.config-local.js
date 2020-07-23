module.exports = {
    env: {
        name: "local",
        aws_region: 'us-east-1',

    },
    iot: {
        server: "http://192.168.1.128"
    },
    encryption: {
        key: 'x&-{0p7yE#x7}^a',
    },

    nodeJS: {
        enableCluster: false
    },
    db: {
        host: "localhost",
        user: "root",
        password: "password",
        port: "5432",
        database: "web",
        debug: false,
    },


};
