const TX = require('../models/transaction');
const User = require('../models/user');
const mongoose = require('mongoose');

mongoose.promise = Promise;

export default function load(req) {
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
