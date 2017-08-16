var math = require('math')
var request = require('request');

var sikkaExchange = function() {
  if (!(this instanceof sikkaExchange)) {
		return new sikkaExchange();
	}
  this.rate = 0.00001 // Default
  this.percent = 0.01
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

sikkaExchange.prototype.getBTCRate = function (callback) {
  var self = this;
  var urlr = 'http://api.coindesk.com/v1/bpi/currentprice.json';
  request.get({
    url:urlr,
    strictSSL:true,
    json: true
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      callback(false,null);
    } else {
      self.setrate(body.bpi.USD.rate_float*(1+self.percent))
      callback(null,true);
    }
  });
};

sikkaExchange.prototype.setrate = function(rate){
  this.rate = rate * (1 + this.percent);
}


module.exports = sikkaExchange;


/*

sikkaCore.prototype.check = function (txno,callback) {
  var self = this;
  self.db.sikkaModel.find( { Txno : txno },function(err,data){
    if (err) {
      callback (null,err);
    }else{
      var query = self.db.sikkaModel.find( { Txno : txno});
      var expDate = new Date(data[0].EndDate)
      var now = new Date();
      console.log(expDate.getTime()>now.getTime(),expDate.getTime(),now.getTime());
      if( expDate.getTime() > now.getTime() && data[0].state == 1 ){
        self.ethApi.checkTokenBalance(data[0].ethAddress,function(err1,data1){
          if (err1) {
            callback (err1,null);
          }else{
            if (data1.result == 0){
              callback( null, {state:1, Address : data[0].ethAddress })
            }else{
              self.btcApi.checkBalance(self.bitcore.fetchAddres(),function(err2,data2){
                if (err2) {
                  callback (err2,null);
                }else{
                  var eb = self.exchange.sikkaExE2B(data1.result);
                  console.log(eb,data1.result);
                  if( eb <= (data2.balance-2000) ){
                    self.btcApi.sendTxns(data[0].btcAddress,eb,function(err3,data3){
                      if(err3){
                        callback(err3,null);
                      }else{
                        query.findOneAndUpdate({Txno: txno}, {state :2,  InValue : data1.result, txhash : data3.tx.hash, OutValue : { ethereum : 0, bitcoin : eb, IsOverFlow : false}}).exec()
                        callback(null,{ state:2, txhash : data3.tx.hash })
                      }
                    })
                  }else{
                    query.findOneAndUpdate({Txno: txno}, {state :3,  InValue : data1.result, OutValue : { ethereum : 0, bitcoin : eb, IsOverFlow : true}}).exec()
                    callback(null,{ state:3  })
                  }
                }
              });
            }
          }
        });
      }else{
        console.log(data[0].state);
        if ( data[0].state == 2 ){
          callback( null, {state:2, txhash : data[0].txhash, Address : data[0].ethAddress })
        }else {
          query.findOneAndUpdate({Txno: txno}, {state :4}).exec()
          callback( null, {state:4})
        }
      }
    }
  });
};

sikkaCore.prototype.fetchTxn = function (txno,callback) {
  var self = this;
  self.db.sikkaModel.find( { Txno : txno },function(err,data){
    if (err) {
      callback (err,null);
    }else{
      var expDate = new Date(data[0].EndDate)
      var now = new Date();
      if( expDate.getTime() > now.getTime() && data[0].state == 1 ){
        callback (null,{ Address : data[0].ethAddress , State : data[0].state , StartDate : data[0].StartDate , EndDate : data[0].EndDate });
      }else{
        if( data[0].state == 2 ){
          callback (null,{ Txhash : data[0].txhash , State : data[0].state });
        } else if ( data[0].state == 3 ){
          callback (null,{ "Error" : "Overflow Detected", State : data[0].state});

        } else if ( data[0].state == 4 ){
          callback (null,{ "Error" : "Expired", State : data[0].state});
        }
      }
    }
  })
};
*/
