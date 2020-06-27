
module.exports = {
    env: {
        name:"local",
        aws_region: 'us-east-1',

    },
    iot:{
      server: "http://192.168.1.128"
      //   server: "http://63.152.45.86"
        // Riley's server: "50.80.241.185"
    },

    nodeJS: {
        enableCluster:false
    },
    db: {
        host: "localhost",
        user: "root",
        password: "password",
        port: "5432",
        database: "web",
        debug: false,
        //multipleStatements: true,
        //connectionLimit: 10,
    },


};
