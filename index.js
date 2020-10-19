const server = require('./server'),
    mongodb = require('./databases/mongodb');


server.init();
mongodb.init();
