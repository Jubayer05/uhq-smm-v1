

const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categoryname: {
        type: String,
        required: true
    },
    servicename: {
        type: String,
        required: true
    },
    orderId:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Ticket', TicketSchema);