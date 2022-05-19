const mongoose = require('mongoose')

const daySchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    day: {
        type: Number,
        required: true
    },

},)

module.exports = mongoose.model('Day', daySchema)