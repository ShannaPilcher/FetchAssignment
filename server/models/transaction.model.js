const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    payer: {
        type: String
    },
    points: {
        type: Number
    },
}, {timestamps: true});

module.exports = mongoose.model('Transaction', TransactionSchema)