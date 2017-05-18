const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    meta: {
		type: String,
		required: true
	},

	initiatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
	},

	createdOn: {
		type: Date,
		"default": Date.now
	},

	serviceAccount: {
		type: String,
		required: true
	},

	servicePK: {
		type: String,
		required: true
	},

	txHash: {
		type: String,
		required: true
	}, 

	blockNumber: {
		type: Number
	},

	link: {
		type: String
	},

	timestamp: {
		type: Date
	},

	status: {
		type: String
	}
})


module.exports = mongoose.model('transaction', transactionSchema);