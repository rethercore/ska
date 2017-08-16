var math      = require('math')
var request   = require('request');
var schedule  = require('node-schedule');
var btcApi    = require('../bitcoin/btcApi');
var skaApi    = require('../ethereum/sikkaInterface');

var BApi      = new btcApi();
var SApi      = new skaApi();

var ratecard = function() {
  if (!(this instanceof ratecard)) {
		return new ratecard();
	}
  this.rate               = {};
  this.margin             = 0.01
  this.lastUpdatedrate    = new Date();
  this.lastUpdatedbalance = new Date();
  this.RateArray          = [ 'ETH','BTC', 'BCH', 'MCAP' ];
  this.balance            = {};
};

ratecard.prototype.getRate = function (callback) {
  var self = this;
  var urlr = 'https://api.coinmarketcap.com/v1/ticker/';
  request.get({
    url:urlr,
    strictSSL:true,
    json: true
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      callback(false,null);
    } else {
      for (var i in body) {
        if (self.RateArray.includes(body[i].symbol)){
          self.setRate(body[i].symbol,(body[i].price_usd*(1+self.margin)).toFixed(4));
        }
      }
      callback(null,true);
    }
  });
};
ratecard.prototype.getLocalBalance = function (callback) {
    var self = this;
    BApi.getLocalBalance(function(err,data){
      if (err){
        callback(false,null);
      }
      self.setBalance('BTC',data)
    });
    SApi.getLocalBalance(function(err,data){
      if (err){
        callback(false,null);
      }
      self.setBalance('SKA',data)
    });
    callback(null,true)
};

ratecard.prototype.setBalance = function(symbol, rate){
  this.balance[symbol] = rate;
}

ratecard.prototype.setRate = function(symbol, rate){
  this.rate[symbol] = rate;
}

module.exports = ratecard();
