var bitcore = require('../bitcoin/bitcore');
var ethcore = require('../ethereum/ethcore');
var btcApi  = require('../bitcoin/btcApi');
var ethApi  = require('../ethereum/ethApi');
var db      = require('../database/db');
var exchange= require('./exchange');

var sikkaCore = function() {
  if (!(this instanceof sikkaCore)) {
		return new sikkaCore();
	}
  this.bitcore = new bitcore();
  this.ethcore = new ethcore();
  this.btcApi  = new btcApi();
  this.ethApi  = new ethApi();
  this.db      = new db();
  this.exchange= new exchange();
}

sikkaCore.prototype.init = function (address,callback) {
  var self = this;
  var date = new Date();
  if (self.bitcore.addressValid(address)){
    var txno = self.ethcore.generateRandom();
    var ethAddr = self.ethcore.generateAddress(txno);
    var record = {
      Txno :  txno,
      ethAddress : ethAddr.address,
      btcAddress : address,
      EthKeyObj : ethAddr,
      state : 1,
      EndDate : new Date(date.setTime( date.getTime() + 3 * 86400000 )),
      StartDate : new Date()
    }
    self.db.sikkaModel.create(record,function(err,small){
      if (err) {
        callback({ "Error": [1.1,err] },null);
      }else{
        callback(null,{ Txno :record.Txno, ethAddr :record.ethAddress } );
      }
    })
  }else{
    callback({ "Error": [1.2,"Invalid BTC address"] },null);
  }
};

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
              callback( null, {state:1})
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
        query.findOneAndUpdate({Txno: txno}, {state :4}).exec()
        callback( null, {state:4})
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

module.exports = sikkaCore;
