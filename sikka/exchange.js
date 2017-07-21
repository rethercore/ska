var math = require('math')
var request = require('request');

var sikkaExchange = function() {
  if (!(this instanceof sikkaExchange)) {
		return new sikkaExchange();
	}
  this.rate = 0.00001 // Default
};

sikkaExchange.prototype.sikkaExB2E = function (btcValue) {
  var self = this;
  if (btcValue > 0){
    return btcValue/self.rate;
  }else {
    return 0
  }
};

sikkaExchange.prototype.sikkaExE2B = function (skaValue) {
  var self = this;
  if (skaValue > 0){
    return math.round((skaValue * (self.rate)));
  }else {
    return 0
  }
};

sikkaExchange.prototype.setRate = function (val) {
  var self = this;
  if (typeof(val) === 'number' && val > 0 && val < 10 ){
    this.rate = val
    return true;
  }else{
    return false;
  }
}; 

sikkaExchange.prototype.getBTCrate = function (callback) {
  var self = this;
  var urlr = 'http://api.coindesk.com/v1/bpi/currentprice.json';
  request.get({
    url:urlr,
    strictSSL:true,
    json: true
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      callback(error,null);
    } else {
      console.log( 1/body.bpi.USD.rate_float);
      callback(null,body);
    }
  });

};

module.exports = sikkaExchange;
