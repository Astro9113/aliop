const TX = require('../../models/transaction');
const User = require('../../models/user');
const meta = require('../../ethereum/poe_meta');
const poeService = require('../../ethereum/poe');
const mongoose = require('mongoose');
const SolidityCoder = require("web3/lib/solidity/coder.js");

mongoose.promise = Promise;

export function add(req) {
	const input = req.body;
	const inputJSONStr = JSON.stringify(input);
	var transaction = new TX();
	transaction.meta = inputJSONStr;
	transaction.servicePK = meta.privateKey;
	transaction.serviceAccount = meta.defaultAccount;
	transaction.status = 'pending';

	return new Promise((resolve, reject) => {
		poeService.addData( transaction.serviceAccount, transaction.servicePK, inputJSONStr, (err, hash) => {
			if (err) reject(err);
			if (hash) {
				transaction.txHash = hash;
				const { username } = req.session.user;
				User
				    .findOne({username: username})
				    .then((user) => {
				    	transaction.initiatedBy = user._id;
                        return Promise.all([user, transaction.save()]);
				    })
				    .then((res) => {
				    	res[0].transactions.push(res[1]._id);
				    	return res[0].save();
				    })
				    .then((res) => {
				    	if (res) resolve({data: hash});
				    })
				    .catch((err) => {
				    	reject(err)
				    })
			}
		})
	})
}

export function getShortLink(req) {
	const { txHash } = req.body;
	return new Promise((resolve, reject) => {
		poeService.getShortLink( txHash, (err, receipt) => {
			if (err) reject(err);
			if (receipt) {
				const { link, blockNumber, timestamp } = receipt;
				TX
					.findOneAndUpdate({ txHash: txHash }, {$set: {blockNumber: blockNumber, timestamp: timestamp, link: link, status: 'confirmed' }}, { new: true})
					.then((res) => {
						resolve({data: res})
					})
					.catch((err) => {
						reject(err);
					})
			}
		})
	})
}

export function getTxHash(req) {
    const { shortLink } = req.body;
    return new Promise((resolve, reject) => {
    	poeService.getTxHash( shortLink, (err, res) => {
  			if (err) reject(err);
  			if (res) {
  			  resolve(res);
  			};
  	})
  })
}


export function verify(req) {
	const { shortLink } = req.body;
	return new Promise((resolve, reject) => {
		poeService.verify( shortLink, (err, meta) => {
			if (err) reject(err);
			if (meta) resolve(meta);
		})
	})
}


export default {
	add,
	getShortLink,
	getTxHash,
	verify
}
