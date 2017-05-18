const TX = require('../../models/transaction');
const User = require('../../models/user');
const mongoose = require('mongoose');

mongoose.promise = Promise;

export function load(req, params) {
	if (params.length) {
		const [ id ] = params;
		return new Promise((resolve, reject) => {
          TX
			  .findOne({_id: id})
			  .populate('initiatedBy')
			  .then((tx) => {
	            resolve(tx);
			  })
			  .catch((error) => {
			    reject(error);
			  })
		})
	}
	return new Promise((resolve, reject) => {
		TX
		    .find({}).sort('-createdOn')
		     .then((data) => {
		       resolve(data);
		     })
		     .catch((err) => {
		       reject(error);
		     })
	})
  
}

export function loadByUser(req) {
  const { username } = req.body;
  return new Promise((resolve, reject) => {
    User
	     .findOne({username: username})
	     .populate({
	     	path: 'transactions',
	     	options: {
	     		sort: {
	     			createdOn: -1
	     		}
	     	}
	     })
	     .select('transactions')
	     .then((res) => {
	     	resolve(res);
	     })
	     .catch((err) => {
	     	reject(err)
	     })
  })
}

export default {
	load,
	loadByUser
} 