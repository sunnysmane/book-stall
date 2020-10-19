let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let bookSchema = new Schema(
    {
        author: {
            type: Schema.Types.String,
            default: ''
        },
        title: {
            type: Schema.Types.String,
            default: null
        },
        isbn: {
            type: Schema.Types.String,
            default: null
        },
        release_date: {
            type: Schema.Types.Date,
            default: null
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    },
    {strict: false });

module.exports = mongoose.model('book', bookSchema, 'book');
