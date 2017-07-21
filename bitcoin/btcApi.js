var request       = require('request');
var xtend         = require('xtend');
var bitcore       = require('./bitcore');

var config        = require('../config/interfaces.json');

const URL_ROOT = 'https://api.blockcypher.com/v1/';

var btcApi = function() {
  if (!(this instanceof btcApi)) {
		return new btcApi();
	}
  this.bitcore = new bitcore();
};

module.exports = btcApi;

btcApi.prototype.checkBalance = function (address,callback) {
  var self = this;
	var urlr = URL_ROOT + 'btc/main/addrs/' + address + '/balance?token='+ config.bitcoin.token;
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


btcApi.prototype.newTxn = function(receivingAddress,amt,callback) {
	var self = this;
	var urlr = URL_ROOT + 'btc/main/txs/new?token=' + config.bitcoin.token;
	params = {"inputs":[{"wallet_name":config.bitcoin.wallet_name}],"outputs":[{"addresses": [receivingAddress], "value": amt}]};
	console.log(JSON.stringify(params),urlr);
	request.post({
		url:urlr,
		strictSSL:true,
		json: true,
		body: params
	}, function (error, response, body) {
		if (error || (response.statusCode !== 200 && response.statusCode !== 201)) {
      console.log(error);
      callback(error,null);
		} else {
      console.log(body);
			callback(null,body);
		}
	});
};

btcApi.prototype.sendFx = function(Txobj,callback) {
	var self = this;
	Txobj.signatures = [self.bitcore.sign(Txobj.tosign)];
  Txobj.pubkeys = [self.bitcore.fetchPubkey()];
  var params1 = Txobj;
  var urlr1 = URL_ROOT + 'btc/main/txs/send?token=' + config.bitcoin.token;
//  console.log(params1);
  request.post({
    url:urlr1,
    strictSSL:true,
    json: true,
    body: params1
  }, function (error, response, body) {
    if (error || (response.statusCode !== 200 && response.statusCode !== 201)) {
      callback(error,null);
		} else {
			callback(null,body);
    }
  });
};

btcApi.prototype.sendTxns = function (receivingAddress,amt,callback) {
  var self = this;
  self.newTxn(receivingAddress,amt,function(err,data){
    if (err) {
      callback(err,null);
    }else{
      self.sendFx(data,function(err1,data1){
        if(err1){
          callback(err1,null);
        }else{
          callback(null,data1);
        }
      })
    }
  })
};
