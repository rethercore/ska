var math    = require('math');
var bitcore = require('../bitcoin/bitcore');
var ethcore = require('../ethereum/ethcore');

var auto    = require('../config/automatic.json');

var SInit = function() {
  if (!(this instanceof SInit)) {
		return new SInit();
	}
  this.bitcore = new bitcore();
  this.ethcore = new ethcore();
  this.db      = global.db;
  this.RateCard= global.sch.RateCard;
}

SInit.prototype.btcska = function (initObj,callback) {
  var self = this;
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 1000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  initObj.Txid      = self.ethcore.generateRandom();
  initObj.TxAddr    = addr;
  initObj.TxKey     = key;
  initObj.TxState   = 1;
  initObj.InHash    = "0x0";
  initObj.OutHash   = "0x0";
  initObj.Rate      = self.RateCard.rate.BTC;
  initObj.StartDate = new Date(Date.now());
  initObj.EndDate   = new Date(Date.now() + global.constants.time);
  initObj.Auto      = auto[initObj.Exchange].auto;
  initObj.Version   = 1
  self.db.sikkaModel.create(initObj,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,initObj);
    }
  });
};

SInit.prototype.skabtc = function (initObj,callback) {
  var self = this;
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 1000000000)
    var addr  = self.bitcore.deriveAddress(key);
  }
  initObj.Txid      = self.ethcore.generateRandom();
  initObj.TxAddr    = addr;
  initObj.TxKey     = key;
  initObj.TxState   = 1;
  initObj.InHash    = "0x0";
  initObj.OutHash   = "0x0";
  initObj.Rate      = self.RateCard.rate.BTC;
  initObj.StartDate = new Date(Date.now());
  initObj.EndDate   = new Date(Date.now() + global.constants.time);
  initObj.Auto      = auto[initObj.Exchange].auto;
  initObj.Version   = 1
  self.db.sikkaModel.create(initObj,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,initObj);
    }
  });
};

SInit.prototype.ethska = function (initObj,callback) {
  var self = this;
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 1000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  initObj.Txid      = self.ethcore.generateRandom();
  initObj.TxAddr    = addr;
  initObj.TxKey     = key;
  initObj.TxState   = 1;
  initObj.InHash    = "0x0";
  initObj.OutHash   = "0x0";
  initObj.Rate      = self.RateCard.rate.ETH;
  initObj.StartDate = new Date(Date.now());
  initObj.EndDate   = new Date(Date.now() + global.constants.time);
  initObj.Auto      = auto[initObj.Exchange].auto;
  initObj.Version   = 1
  self.db.sikkaModel.create(initObj,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,initObj);
    }
  });
};

SInit.prototype.skaeth = function (initObj,callback) {
  var self = this;
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 1000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  initObj.Txid      = self.ethcore.generateRandom();
  initObj.TxAddr    = addr;
  initObj.TxKey     = key;
  initObj.TxState   = 1;
  initObj.InHash    = "0x0";
  initObj.OutHash   = "0x0";
  initObj.Rate      = self.RateCard.rate.ETH;
  initObj.StartDate = new Date(Date.now());
  initObj.EndDate   = new Date(Date.now() + global.constants.time);
  initObj.Auto      = auto[initObj.Exchange].auto;
  initObj.Version   = 1
  self.db.sikkaModel.create(initObj,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,initObj);
    }
  });
};

SInit.prototype.mcapska = function (initObj,callback) {
  var self = this;
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 1000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  initObj.Txid      = self.ethcore.generateRandom();
  initObj.TxAddr    = addr;
  initObj.TxKey     = key;
  initObj.TxState   = 1;
  initObj.InHash    = "0x0";
  initObj.OutHash   = "0x0";
  initObj.Rate      = self.RateCard.rate.MCAP;
  initObj.StartDate = new Date(Date.now());
  initObj.EndDate   = new Date(Date.now() + global.constants.time);
  initObj.Auto      = auto[initObj.Exchange].auto;
  initObj.Version   = 1
  self.db.sikkaModel.create(initObj,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,initObj);
    }
  });
};

SInit.prototype.skamcap = function (initObj,callback) {
  var self = this;
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 1000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  initObj.Txid      = self.ethcore.generateRandom();
  initObj.TxAddr    = addr;
  initObj.TxKey     = key;
  initObj.TxState   = 1;
  initObj.InHash    = "0x0";
  initObj.OutHash   = "0x0";
  initObj.Rate      = self.RateCard.rate.MCAP;
  initObj.StartDate = new Date(Date.now());
  initObj.EndDate   = new Date(Date.now() + global.constants.time);
  initObj.Auto      = auto[initObj.Exchange].auto;
  initObj.Version   = 1
  self.db.sikkaModel.create(initObj,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,initObj);
    }
  });
};

SInit.prototype.bchska = function (initObj,callback) {
  var self = this;
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 1000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  initObj.Txid      = self.ethcore.generateRandom();
  initObj.TxAddr    = addr;
  initObj.TxKey     = key;
  initObj.TxState   = 1;
  initObj.InHash    = "0x0";
  initObj.OutHash   = "0x0";
  initObj.Rate      = self.RateCard.rate.BCH;
  initObj.StartDate = new Date(Date.now());
  initObj.EndDate   = new Date(Date.now() + global.constants.time);
  initObj.Auto      = auto[initObj.Exchange].auto;
  initObj.Version   = 1
  self.db.sikkaModel.create(initObj,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,initObj);
    }
  });
};

SInit.prototype.skabch = function (initObj,callback) {
  var self = this;
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 1000000000)
    var addr  = self.bitcore.deriveAddress(key);
  }
  initObj.Txid      = self.ethcore.generateRandom();
  initObj.TxAddr    = addr;
  initObj.TxKey     = key;
  initObj.TxState   = 1;
  initObj.InHash    = "0x0";
  initObj.OutHash   = "0x0";
  initObj.Rate      = self.RateCard.rate.BCH;
  initObj.StartDate = new Date(Date.now());
  initObj.EndDate   = new Date(Date.now() + global.constants.time);
  initObj.Auto      = auto[initObj.Exchange].auto;
  initObj.Version   = 1
  self.db.sikkaModel.create(initObj,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,initObj);
    }
  });
};
// Address Checker TBD  -   if ((!self.bitcore.addressValid(initObj.C2Addr)) || (!self.ethcore.addressValid(initObj.C1Addr))) { callback({"Error":"Invalid Address"},null)}


module.exports = SInit;
