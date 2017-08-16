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
  if ((!self.bitcore.addressValid(initObj.C1Addr)) || (!self.ethcore.addressValid(initObj.C2Addr))) { callback({"Error":"Invalid Address"},null)}
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 10000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  console.log(self.RateCard);
  var record = {
    "Txid"      : self.ethcore.generateRandom(),
    "TxAddr"    : addr,
    "TxKey"     : key,
    "TxState"   : 1,
    "InHash"    : "",
    "OutHash"   : "",
    "Rate"      : this.RateCard.rate.BTC,
    "Exchange"  : initObj.Exchange,
    "C1Addr"    : initObj.C1Addr,
    "C2Addr"    : initObj.C2Addr,
    "C1Value"   : initObj.C1Value,
    "C2Value"   : initObj.C2Value,
    "StartDate" : new Date(Date.now()),
    "EndDate"   : new Date(Date.now() + global.constants.time),
    "Auto"      : true,
    "Version"   : 1
  };
  self.db.sikkaModel.create(record,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,record);
    }
  });
};

SInit.prototype.skabtc = function (initObj,callback) {
  var self = this;
  if ((!self.bitcore.addressValid(initObj.C2Addr)) || (!self.ethcore.addressValid(initObj.C1Addr))) { callback({"Error":"Invalid Address"},null)}
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 10000000000)
    var addr  = self.bitcore.deriveAddress(key);
  }
  var record = {
    "Txid"      : self.ethcore.generateRandom(),
    "TxAddr"    : addr,
    "TxKey"     : key,
    "TxState"   : 1,
    "InHash"    : "",
    "OutHash"   : "",
    "Rate"      : this.RateCard.rate.BTC,
    "Exchange"  : initObj.Exchange,
    "C1Addr"    : initObj.C1Addr,
    "C2Addr"    : initObj.C2Addr,
    "C1Value"   : initObj.C1Value,
    "C2Value"   : initObj.C2Value,
    "StartDate" : new Date(Date.now()),
    "EndDate"   : new Date(Date.now() + global.constants.time),
    "Auto"      : true,
    "Version"   : 1
  };
  self.db.sikkaModel.create(record,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,record);
    }
  });
};

SInit.prototype.ethska = function (initObj,callback) {
  var self = this;
  if ((!self.ethcore.addressValid(initObj.C1Addr)) || (!self.ethcore.addressValid(initObj.C2Addr))) { callback({"Error":"Invalid Address"},null)}
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 10000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  var record = {
    "Txid"      : self.ethcore.generateRandom(),
    "TxAddr"    : addr,
    "TxKey"     : key,
    "TxState"   : 1,
    "InHash"    : "",
    "OutHash"   : "",
    "Rate"      : this.RateCard.rate.ETH,
    "Exchange"  : initObj.Exchange,
    "C1Addr"    : initObj.C1Addr,
    "C2Addr"    : initObj.C2Addr,
    "C1Value"   : initObj.C1Value,
    "C2Value"   : initObj.C2Value,
    "StartDate" : new Date(Date.now()),
    "EndDate"   : new Date(Date.now() + global.constants.time),
    "Auto"      : auto[initObj.Exchange].auto,
    "Version"   : 1
  };
  self.db.sikkaModel.create(record,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,record);
    }
  });
};

SInit.prototype.skaeth = function (initObj,callback) {
  var self = this;
  if ((!self.ethcore.addressValid(initObj.C2Addr)) || (!self.ethcore.addressValid(initObj.C1Addr))) { callback({"Error":"Invalid Address"},null)}
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 10000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  var record = {
    "Txid"      : self.ethcore.generateRandom(),
    "TxAddr"    : addr,
    "TxKey"     : key,
    "TxState"   : 1,
    "InHash"    : "",
    "OutHash"   : "",
    "Rate"      : this.RateCard.rate.ETH,
    "Exchange"  : initObj.Exchange,
    "C1Addr"    : initObj.C1Addr,
    "C2Addr"    : initObj.C2Addr,
    "C1Value"   : initObj.C1Value,
    "C2Value"   : initObj.C2Value,
    "StartDate" : new Date(Date.now()),
    "EndDate"   : new Date(Date.now() + global.constants.time),
    "Auto"      : auto[initObj.Exchange].auto,
    "Version"   : 1
  };
  self.db.sikkaModel.create(record,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,record);
    }
  });
};

SInit.prototype.mcapska = function (initObj,callback) {
  var self = this;
  if ((!self.ethcore.addressValid(initObj.C1Addr)) || (!self.ethcore.addressValid(initObj.C2Addr))) { callback({"Error":"Invalid Address"},null)}
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 10000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  var record = {
    "Txid"      : self.ethcore.generateRandom(),
    "TxAddr"    : addr,
    "TxKey"     : key,
    "TxState"   : 1,
    "InHash"    : "",
    "OutHash"   : "",
    "Rate"      : this.RateCard.rate.MCAP,
    "Exchange"  : initObj.Exchange,
    "C1Addr"    : initObj.C1Addr,
    "C2Addr"    : initObj.C2Addr,
    "C1Value"   : initObj.C1Value,
    "C2Value"   : initObj.C2Value,
    "StartDate" : new Date(Date.now()),
    "EndDate"   : new Date(Date.now() + global.constants.time),
    "Auto"      : auto[initObj.Exchange].auto,
    "Version"   : 1
  };
  self.db.sikkaModel.create(record,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,record);
    }
  });
};

SInit.prototype.skamcap = function (initObj,callback) {
  var self = this;
  if ((!self.ethcore.addressValid(initObj.C2Addr)) || (!self.ethcore.addressValid(initObj.C1Addr))) { callback({"Error":"Invalid Address"},null)}
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 10000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  var record = {
    "Txid"      : self.ethcore.generateRandom(),
    "TxAddr"    : addr,
    "TxKey"     : key,
    "TxState"   : 1,
    "InHash"    : "",
    "OutHash"   : "",
    "Rate"      : this.RateCard.rate.MCAP,
    "Exchange"  : initObj.Exchange,
    "C1Addr"    : initObj.C1Addr,
    "C2Addr"    : initObj.C2Addr,
    "C1Value"   : initObj.C1Value,
    "C2Value"   : initObj.C2Value,
    "StartDate" : new Date(Date.now()),
    "EndDate"   : new Date(Date.now() + global.constants.time),
    "Auto"      : auto[initObj.Exchange].auto,
    "Version"   : 1
  };
  self.db.sikkaModel.create(record,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,record);
    }
  });
};

SInit.prototype.bchska = function (initObj,callback) {
  var self = this;
  if ((!self.bitcore.addressValid(initObj.C1Addr)) || (!self.ethcore.addressValid(initObj.C2Addr))) { callback({"Error":"Invalid Address"},null)}
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 10000000000)
    var addr  = self.ethcore.deriveAddress(key);
  }
  var record = {
    "Txid"      : self.ethcore.generateRandom(),
    "TxAddr"    : addr,
    "TxKey"     : key,
    "TxState"   : 1,
    "InHash"    : "",
    "OutHash"   : "",
    "Rate"      : this.RateCard.rate.BCH,
    "Exchange"  : initObj.Exchange,
    "C1Addr"    : initObj.C1Addr,
    "C2Addr"    : initObj.C2Addr,
    "C1Value"   : initObj.C1Value,
    "C2Value"   : initObj.C2Value,
    "StartDate" : new Date(Date.now()),
    "EndDate"   : new Date(Date.now() + global.constants.time),
    "Auto"      : auto[initObj.Exchange].auto,
    "Version"   : 1
  };
  self.db.sikkaModel.create(record,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,record);
    }
  });
};

SInit.prototype.skabch = function (initObj,callback) {
  var self = this;
  if ((!self.bitcore.addressValid(initObj.C2Addr)) || (!self.ethcore.addressValid(initObj.C1Addr))) { callback({"Error":"Invalid Address"},null)}
  if ( auto[initObj.Exchange].auto == false ){
    var addr  = auto[initObj.Exchange].address;
    var key   = '0';
  }else{
    var key   = math.round(math.random() * 10000000000)
    var addr  = self.bitcore.deriveAddress(key);
  }
  var record = {
    "Txid"      : self.ethcore.generateRandom(),
    "TxAddr"    : addr,
    "TxKey"     : key,
    "TxState"   : 1,
    "InHash"    : "",
    "OutHash"   : "",
    "Rate"      : this.RateCard.rate.BCH,
    "Exchange"  : initObj.Exchange,
    "C1Addr"    : initObj.C1Addr,
    "C2Addr"    : initObj.C2Addr,
    "C1Value"   : initObj.C1Value,
    "C2Value"   : initObj.C2Value,
    "StartDate" : new Date(Date.now()),
    "EndDate"   : new Date(Date.now() + global.constants.time),
    "Auto"      : auto[initObj.Exchange].auto,
    "Version"   : 1
  };
  self.db.sikkaModel.create(record,function(err,small){
    if (err) {
      callback({ "Error": "Saving Record" },null);
    }else{
      callback(null,record);
    }
  });
};


module.exports = SInit;
