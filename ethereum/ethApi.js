var request       = require('request');
var xtend         = require('xtend');

var config        = require('../config/interfaces.json');

const URL_ROOT = 'https://api.etherscan.io/api?module=account&action=tokenbalance&';

var ethApi = function() {
  if (!(this instanceof ethApi)) {
		return new ethApi();
	}
};

module.exports = ethApi;

ethApi.prototype.checkTokenBalance = function (address,callback) {
  var self = this;
	var urlr = URL_ROOT + 'contractaddress=' + config.ethereum.contractAddress + '&address='+ address + '&tag=latest&apikey=' + config.ethereum.token;
	request.get({
		url:urlr,
		strictSSL:true,
		json: true
	}, function (error, response, body) {
		if (error || response.statusCode !== 200) {
			callback(error,null);
		} else {
		  callback(null,body);
		}
	});
};
