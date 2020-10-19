const validation = require('../validation/book.validations'),
    factory = require('../factory/book.factory'),
    to = require('../utils/promise_handler'),
    url = require('url'),
    Response = require("../utils/response"),
    StatusCodes = require("../utils/status_codes"),
    ResponseMessages = require("../utils/response_messages");

exports.addBook = async (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', async () => {

        if (typeof body === 'string') {
            body = JSON.parse(body);
        }
        [err, validationResponse] = await to(validation.addBook(body));
        if (err) {
            let response = Response.sendResponse(false, validationResponse, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST);
            res.statusCode = StatusCodes.BAD_REQUEST;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        } else {
            factory.addBook(body, res);
        }
    });
};

exports.getBook = async (req, res) => {
    let parsedURL = url.parse(req.url, true);
    let query = {};
    if (parsedURL.query) {
        query = JSON.parse(JSON.stringify(parsedURL.query));
    }
    [err, validationResponse] = await to(validation.getBook(query));
    if (err) {
        let response = Response.sendResponse(false, validationResponse, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST);
        res.statusCode = StatusCodes.BAD_REQUEST;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    } else {
        factory.getBook(query, res);
    }
};

exports.getBookById = async (req, res) => {
    let parsedURL = url.parse(req.url, true);
    let params = {
        id: req.url.split('/').slice(1)[1]
    };
    [err, validationResponse] = await to(validation.getBookById(params));
    if (err) {
        let response = Response.sendResponse(false, validationResponse, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST);
        res.statusCode = StatusCodes.BAD_REQUEST;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    } else {
        factory.getBookById(params, res);
    }
};

exports.updateBook = async (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', async () => {

        if (typeof body === 'string') {
            body = JSON.parse(body);
        }
        let params = {
            id: req.url.split('/').slice(1)[1]
        };
        [err, validationResponse] = await to(validation.updateBook(body));
        if (err) {
            let response = Response.sendResponse(false, validationResponse, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST);
            res.statusCode = StatusCodes.BAD_REQUEST;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        } else {
            factory.updateBook(params, body, res);
        }
    });
};

exports.deleteBook = async (req, res) => {
    let parsedURL = url.parse(req.url, true);
    let params = {
        id: req.url.split('/').slice(1)[1]
    };
    [err, validationResponse] = await to(validation.deleteBook(params));
    if (err) {
        let response = Response.sendResponse(false, validationResponse, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST);
        res.statusCode = StatusCodes.BAD_REQUEST;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    } else {
        factory.deleteBook(params, res);
    }
};
