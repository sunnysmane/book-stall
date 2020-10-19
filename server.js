const http = require('http'),
    controller = require('./src/controller/book.controller'),
    responseObj = require('./src/utils/response'),
    statusCode = require('./src/utils/status_codes'),
    responseMessage = require('./src/utils/response_messages'),
    mongodb = require('./databases/mongodb'),
    url = require('url'),
    Config = require('config'),
    nodeStatic = require('node-static'),
    fs = require('fs');

exports.init = async () => {
    const server = http.createServer((req, res) => {
        if (req.url === '/book' && req.method === 'POST') {
            controller.addBook(req, res);
        } else if (req.url.includes('/book') && req.method === 'GET') {
            let urlSplit = req.url.split('/').slice(1);
            if (urlSplit.length === 2) {
                controller.getBookById(req, res);
            } else if (urlSplit.length === 1) {
                controller.getBook(req, res);
            } else {
                let response = responseObj.sendResponse(false, null, responseMessage.NOT_FOUND, statusCode.NOT_FOUND);
                res.statusCode = statusCode.NOT_FOUND;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
            }
        } else if (req.url.includes('/book') && req.method === 'PUT') {
            let urlSplit = req.url.split('/').slice(1);
            if (urlSplit.length === 2) {
                controller.updateBook(req, res);
            } else {
                let response = responseObj.sendResponse(false, null, responseMessage.NOT_FOUND, statusCode.NOT_FOUND);
                res.statusCode = statusCode.NOT_FOUND;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
            }
        } else if (req.url.includes('/book') && req.method === 'DELETE') {
            let urlSplit = req.url.split('/').slice(1);
            if (urlSplit.length === 2) {
                controller.deleteBook(req, res);
            } else {
                let response = responseObj.sendResponse(false, null, responseMessage.NOT_FOUND, statusCode.NOT_FOUND);
                res.statusCode = statusCode.NOT_FOUND;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));
            }
        } else if (req.url === '/swagger.json') {
            fs.readFile(`${__dirname}/swagger/swagger.json`, function(error, content) {
                if (error) {
                    if(error.code == 'ENOENT'){
                        let response = responseObj.sendResponse(false, null, responseMessage.NOT_FOUND, statusCode.NOT_FOUND);
                        res.statusCode = statusCode.NOT_FOUND;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(response));
                    } else {
                        let response = responseObj.sendResponse(false, null, `Sorry, check with the site admin for error: ${error.code} ..`, statusCode.INTERNAL_SERVER_ERROR);
                        res.statusCode = statusCode.INTERNAL_SERVER_ERROR;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(response));
                    }
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(content, 'utf-8');
                }
            });
        } else {
            let response = responseObj.sendResponse(false, null, responseMessage.NOT_FOUND, statusCode.NOT_FOUND);
            res.statusCode = statusCode.NOT_FOUND;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        }

    });

    let port = Config.server.port;
    server.listen(port, Config.server.host, () => {
        console.log(`Server is running on ${Config.server.host}:${port}`);
    });
    return server;
}
