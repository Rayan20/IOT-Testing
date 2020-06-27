
module.exports = {
    env: {
        name:"local",
        aws_region: 'us-east-1',

    },
    iot:{
       // server: "http://192.168.1.128"
        server: "http://63.152.45.86"
        // Riley's server: "50.80.241.185"
    },

    nodeJS: {
        enableCluster:false
    },
    db: {
        host: "ec2-34-194-198-176.compute-1.amazonaws.com",
        user: "opmhpgnyutvoux",
        password: "c1d6cd8a358c74c5fd7248720dbf33863d7d8bc2a8b9e01dea10a3f40e5c0904",
        port: "5432",
        database: "dfdbjkkk76vaff",
        debug: false,
        //multipleStatements: true,
        //connectionLimit: 10,
    },


};
