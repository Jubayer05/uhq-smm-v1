const mongoose = require('mongoose')

const fundSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true
    },
    method:{
        type: String,
        required: true
    },
   amount:{ 
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['Pending', 'Approved', 'Cancel', 'Refunded'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Funds', fundSchema)