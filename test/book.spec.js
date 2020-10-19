process.env.NODE_ENV = "test";
// process.env.PORT = 4000;
const chai = require("chai"),
    chaiHttp = require("chai-http"),
    should = chai.should(),
    qs = require("qs"),
    server = require("../server"),
    to = require('../src/utils/promise_handler'),
    Config = require('config');

const mongo = require("../databases/mongodb");

chai.use(chaiHttp);

describe("books", () => {
    let result;
    let mongo_result, _id;
    let test_url = `${Config.server.host}:${Config.server.port}`;
    before(async () => {
        // Before block
        try {
            global.sequelizeModels = null;
            result = await server.init();
            mongo_result = await mongo.init();
            console.log("Server Started :");
            return result;
        } catch (e) {
            console.log("Error in starting server : ", e);
            return e;
        }
    });


    describe("POST /book", () => {
        it("POST /book", done => {
            let options = {
                method: "POST",
                url: `/book`,
                payload: {
                    author: 'John Doe',
                    title: 'John Biography',
                    isbn: '978-3-16-148410-0',
                    release_date: '2020-10-16'
                },
                headers: {
                    
                },
            };
            chai
                .request(test_url)
                .post(options.url)
                .set(options.headers)
                .send(options.payload)
                .end((err, res) => {

                    _id = JSON.parse(res.text).result._id;
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe("PUT /book", () => {
        it("PUT /book", done => {
            let options = {
                method: "PUT",
                url: `/book/{id}`.replace(`{id}`.replace(/ /g, ''), `${_id}`),
                payload: {
                    author: 'Jane Doe'
                },
                headers: {
                    
                },
            };
            chai
                .request(test_url)
                .put(options.url)
                .set(options.headers)
                .send(options.payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("GET /book/{id}", () => {
        it("GET /book/{id}", done => {
            let options = {
                method: "GET",
                url: `/book/{id}`.replace(`{id}`.replace(/ /g, ''), `${_id}`),
                headers: {
                    
                },
            };
            chai
                .request(test_url)
                .get(options.url)
                .set(options.headers)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("GET /book", () => {
        it("GET /book", done => {
            let options = {
                method: "GET",
                url: `/book`,
                headers: {
                    
                },
            };
            chai
                .request(test_url)
                .get(options.url)
                .set(options.headers)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("GET with query /book", () => {
        it("GET /book", done => {
            let options = {
                method: "GET",
                url: `/book?sort_by=author&sort_order=-1&page_no=0&page_size=2`,
                headers: {
                    
                },
            };
            chai
                .request(test_url)
                .get(options.url)
                .set(options.headers)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("DELETE /book/{id}", () => {
        it("DELETE /book/{id}", done => {
            let options = {
                method: "GET",
                url: `/book/{id}`.replace(`{id}`.replace(/ /g, ''), `${_id}`),
                headers: {
                    
                },
            };
            chai
                .request(test_url)
                .delete(options.url)
                .set(options.headers)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("DELETE /book/{id}", () => {
        it("DELETE /book/{id}", done => {
            let options = {
                method: "GET",
                url: `/book/123`,
                headers: {
                    
                },
            };
            chai
                .request(test_url)
                .get(options.url)
                .set(options.headers)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    after(async () => {
        // Before block
        try {
            console.log("In after..");
            let mongo_close = await mongo.close();
            result.close();
            process.exit(0);
        } catch (e) {
            console.log("Error in starting server : ", e);
            return e;
        }
    });
});
