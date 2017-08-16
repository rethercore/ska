var btcApi  = require('../bitcoin/btcApi');
var skaApi  = require('../ethereum/sikkaInterface');
var init    = require('./initializer');

var sikkaCore = function() {
  if (!(this instanceof sikkaCore)) {
		return new sikkaCore();
	}
  this.db      = global.db;
  this.init    = new init();
  this.balance = global.sch.RateCard.balance;
  this.rates   = global.sch.RateCard.rate;
}


sikkaCore.prototype.startTx = function (initObj,callback) {
  var self = this;
  if( initObj.Exchange == 'BTC/SKA'){
    console.log("E");
    self.init.btcska(initObj,function(err,data){
      if(err){
        callback(err,null)
      }
      callback(null,data)
    });
  }else if( initObj.Exchange == 'SKA/BTC' ){
    self.init.skabtc(initObj,function(err,data){
      if(err){
        callback(err,null)
      }
      callback(null,data)
    })
  }else if( initObj.Exchange == 'ETH/SKA' ){
    self.init.ethska(initObj,function(err,data){
      if(err){
        callback(err,null)
      }
      callback(null,data)
    })
  }else if( initObj.Exchange == 'SKA/ETH' ){
    self.init.skaeth(initObj,function(err,data){
      if(err){
        callback(err,null)
      }
      callback(null,data)
    })
  }else if( initObj.Exchange == 'MCAP/SKA' ){
    self.init.mcapska(initObj,function(err,data){
      if(err){
        callback(err,null)
      }
      callback(null,data)
    })
  }else if( initObj.Exchange == 'SKA/MCAP' ){
    self.init.skamcap(initObj,function(err,data){
      if(err){
        callback(err,null)
      }
      callback(null,data)
    })
  }else if( initObj.Exchange == 'BCH/SKA' ){
    self.init.bchska(initObj,function(err,data){
      if(err){
        callback(err,null)
      }
      callback(null,data)
    })
  }else if( initObj.Exchange == 'SKA/BCH' ){
    self.init.skabch(initObj,function(err,data){
      if(err){
        callback(err,null)
      }
      callback(null,data)
    })
  }
}
sikkaCore.prototype.fetchTxid = function (id,callback) {
  var self = this;
  self.db.sikkaModel.find( { Txno : id },function(err,data){
    if (err) {
      callback (err,null);
    }else{
      console.log(data);
      if(data.length != 0){
        callback ( null, data[0] );
      }else{
        callback ('No Record Found',null);
      }
    }
  });
};

module.exports = sikkaCore;

/*
Test Tx ID
var record = {
  "Txid"      : "asdadasdasdasdasdasd",
  "TxAddr"    : "1JU368qm7eJdVprTDBp2yXjwx3myhVA938",
  "TxKey"     : 123,
  "TxState"   : 1,
  "InHash"    : "",
  "OutHash"   : "",
  "Rate"      : 1,
  "Exchange"  : "BTC/SKA",
  "C1Addr"    : "1JU368qm7eJdVprTDBp2yXjwx3myhVA938",
  "C2Addr"    : "1JU368qm7eJdVprTDBp2yXjwx3myhVA938",
  "C1Value"   : 10,
  "C2Value"   : 10,
  "StartDate" : "2017-08-12T19:55:03.794Z",
  "EndDate"   : "2017-08-12T20:55:03.794Z",
  "Version"   : 1
};
*/
