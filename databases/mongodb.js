
const Mongoose = require("mongoose"),
    log = require('../logger/logger'),
    Config = require('config');


const init = () => {

    let connection_uri = '';
    if(Config.database.mongo.username && Config.database.mongo.password) {
        connection_uri = `mongodb://${Config.database.mongo.username}:${Config.database.mongo.password}@${Config.database.mongo.host}:${Config.database.mongo.port}/${Config.database.mongo.name}?authSource=admin`;
    } else {
        connection_uri = `mongodb://${Config.database.mongo.host}:${Config.database.mongo.port}/${Config.database.mongo.name}`;
    }
    Mongoose.connect(connection_uri, {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000 });

    Mongoose.connection.on('connected', async () => {
        log.info(`Mongoose default connection open to ${connection_uri}`);
    });

    Mongoose.connection.on('error', function (err) {
        log.info(`Mongoose default connection error: ${err}`);
        init();
    });


    Mongoose.connection.on('disconnected', function () {
        log.info('Mongoose default connection disconnected');
    });


    process.on('SIGINT', function () {
        Mongoose.connection.close(function () {
            log.info('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};

exports.close = async () => {
    return await Mongoose.connection.close();
};

exports.init = init;
