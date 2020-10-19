const Joi = require('joi').extend(require('@hapi/joi-date'));

exports.addBook = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const schema = Joi.object({
                author: Joi.string().required().example('John Doe').description('Author Name'),
                title: Joi.string().required().example('John Biography').description('Book Title'),
                isbn: Joi.string().required().example('978-3-16-148410-0').description('ISBN of book'),
                release_date: Joi.date().required().format('YYYY-MM-DD').raw().example('2020-10-16').description('Release Date')
            });

            const value = schema.validate(data);
            if (value.error) {
                reject(value.error);
            }
            resolve(true);
        } catch (e) {
            reject(e);
        }
    })
};

exports.getBook = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const schema = Joi.object({
                page_no: Joi.number().allow(null).example(1).description('Page number starting from 1').min(0),
                page_size: Joi.number().allow(null).example(1).description('Page size').min(1),
                sort_by: Joi.string().valid('author', 'title', 'isbn', 'release_date').allow(null).example('author').description('Column name to sort'),
                sort_order: Joi.number().valid(1, -1).allow(null).example(-1).description('Order to sort')
            });

            const value = schema.validate(data);
            if (value.error) {
                reject(value.error);
            }
            resolve(true);
        } catch (e) {
            reject(e);
        }
    })
};

exports.getBookById = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const schema = Joi.object({
                id: Joi.string().required().example('512eabc6180edfab517ef').description('Book id')
            });

            const value = schema.validate(data);
            if (value.error) {
                reject(value.error);
            }
            resolve(true);
        } catch (e) {
            reject(e);
        }
    })
};

exports.updateBook = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const schema = Joi.object({
                author: Joi.string().allow(null).example('John Doe').description('Author Name'),
                title: Joi.string().allow(null).example('John Biography').description('Book Title'),
                isbn: Joi.string().allow(null).example('978-3-16-148410-0').description('ISBN of book'),
                release_date: Joi.date().allow(null).format('YYYY-MM-DD').raw().example('2020-10-16').description('Release Date')
            });

            const value = schema.validate(data);
            if (value.error) {
                reject(value.error);
            }
            resolve(true);
        } catch (e) {
            reject(e);
        }
    })
};


exports.deleteBook = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const schema = Joi.object({
                id: Joi.string().required().example('512eabc6180edfab517ef').description('Book id')
            });

            const value = schema.validate(data);
            if (value.error) {
                reject(value.error);
            }
            resolve(true);
        } catch (e) {
            reject(e);
        }
    })
};
