const model = require('../model/book.model'),
    DatabaseConnector = require('../classes/DatabaseConnector'),
    dbConnector = new DatabaseConnector(model),
    to = require('../utils/promise_handler'),
    Response = require("../utils/response"),
    StatusCodes = require("../utils/status_codes"),
    ResponseMessages = require("../utils/response_messages");

exports.addBook = async (data, res) => {
    try {
        [err, result] = await to(dbConnector.createOne(data));
        if (err) {
            let response = Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST);
            res.statusCode = StatusCodes.BAD_REQUEST;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        } else {
            let response = Response.sendResponse(true, result, ResponseMessages.CREATED, StatusCodes.CREATED);
            res.statusCode = StatusCodes.CREATED;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        }
    } catch (e) {
        console.log(e);
        let response = Response.sendResponse(false, null, e.message, StatusCodes.BAD_REQUEST);
        res.statusCode = StatusCodes.BAD_REQUEST;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    }
};

exports.getBook = async (query, res) => {
    try {
        [err, result] = await to(dbConnector.find({}, {}, query));
        if (err) {
            let response = Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST);
            res.statusCode = StatusCodes.BAD_REQUEST;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        } else {
            let response = Response.sendResponse(true, result, ResponseMessages.DATA_FOUND, StatusCodes.OK);
            res.statusCode = StatusCodes.OK;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        }
    } catch (e) {
        console.log(e);
        let response = Response.sendResponse(false, null, e.message, StatusCodes.BAD_REQUEST);
        res.statusCode = StatusCodes.BAD_REQUEST;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    }
};

exports.getBookById = async (params, res) => {
    try {
        let condition = {
            _id: params.id
        };
        [err, result] = await to(dbConnector.findOne(condition, {}));
        if (err) {
            let response = Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST);
            res.statusCode = StatusCodes.BAD_REQUEST;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        } else {
            if (result) {
                let response = Response.sendResponse(true, result, ResponseMessages.DATA_FOUND, StatusCodes.OK);
                res.statusCode = StatusCodes.OK;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
            } else {
                let response = Response.sendResponse(false, result, ResponseMessages.NOT_FOUND, StatusCodes.BAD_REQUEST);
                res.statusCode = StatusCodes.BAD_REQUEST;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
            }
        }
    } catch (e) {
        console.log(e);
        let response = Response.sendResponse(false, null, e.message, StatusCodes.BAD_REQUEST);
        res.statusCode = StatusCodes.BAD_REQUEST;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    }
};


exports.updateBook = async (params, data, res) => {
    try {
        let condition = {
            _id: params.id
        };
        [err, result] = await to(dbConnector.findOne(condition, {}));
        if (err) {
            let response = Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST);
            res.statusCode = StatusCodes.BAD_REQUEST;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        } else {
            if (result) {
                [err, result] = await to(dbConnector.updateOne(condition, data));
                if (err) {
                    let response = Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST);
                    res.statusCode = StatusCodes.BAD_REQUEST;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(response));
                } else {
                    let response = Response.sendResponse(true, result, ResponseMessages.UPDATED, StatusCodes.OK);
                    res.statusCode = StatusCodes.OK;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(response));
                }
            } else {
                let response = Response.sendResponse(false, result, ResponseMessages.NOT_FOUND, StatusCodes.BAD_REQUEST);
                res.statusCode = StatusCodes.BAD_REQUEST;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
            }
        }
    } catch (e) {
        console.log(e);
        let response = Response.sendResponse(false, null, e.message, StatusCodes.BAD_REQUEST);
        res.statusCode = StatusCodes.BAD_REQUEST;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    }
};

exports.deleteBook = async (params, res) => {
    try {
        let condition = {
            _id: params.id
        };
        [err, result] = await to(dbConnector.deleteOne(condition));
        if (err) {
            let response = Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST);
            res.statusCode = StatusCodes.BAD_REQUEST;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        } else {
            let response = Response.sendResponse(true, result, ResponseMessages.DELETED, StatusCodes.OK);
            res.statusCode = StatusCodes.OK;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        }
    } catch (e) {
        console.log(e);
        let response = Response.sendResponse(false, null, e.message, StatusCodes.BAD_REQUEST);
        res.statusCode = StatusCodes.BAD_REQUEST;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    }
};
