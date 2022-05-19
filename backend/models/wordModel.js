const mongoose = require('mongoose')

const wordSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    eng: {
        type: String,
        required: true
    },
    kor: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        require: true
    },
    day: {
        type: Number,
        require: true
    }

},)

module.exports = mongoose.model('Word', wordSchema)