var request       = require('request');
var xtend         = require('xtend');

var web3          = require('web3');
var ethcore       = require('./ethcore');

var config        = require('../config/interfaces.json');
var URL_ROOT      = 'https://api.etherscan.io/api?module=account&action=tokenbalance&';
var Web3          = new web3(new web3.providers.HttpProvider(config.ethereum.infraToken));

var sikkaInterface = function() {
  if (!(this instanceof sikkaInterface)) {
		return new sikkaInterface();
	}
  this.ethcore    = new ethcore();
  this.address    = config.ethereum.ERC20.sikka.address;
  this.abi        = config.ethereum.ERC20.sikka.abi;
  this.web3       = Web3;
  this.contract   = this.web3.eth.contract(this.abi);
  this.contractInterface = this.contract.at(this.address);
};

module.exports = sikkaInterface;
// Call Tx
// Get Data
sikkaInterface.prototype.balanceOfGetData = function(address){
  return this.contractInterface.balanceOf.getData(address)
}


// Send Tx
// Get Data
sikkaInterface.prototype.TransferGetData = function(address,value){
  return this.contractInterface.transfer.getData(address,value)
}

// Estimate Gas
sikkaInterface.prototype.TransferEstimateGas = function(address,value){
  return this.web3.eth.estimateGas({ data: this.TransferGetData(address,value)})
}

sikkaInterface.prototype.SendToken = function (address,value,callback) {
  var self = this;
  var value = value * 100000000;
  var txparam = {
    nonce: self.web3.eth.getTransactionCount('0x'+self.ethcore.getLocalAddress()),
    gasPrice: self.web3.eth.gasPrice.c[0],
    gasLimit: '0x61a80',
    to: self.address,
    value: '0x00',
    data: self.TransferGetData(address,value),
    chainId: '0x01'
  }
  var rawTx = '0x' + self.ethcore.signLocal(txparam);
  console.log(rawTx);
  this.web3.eth.sendRawTransaction(rawTx,function(err,data){
    if(err){
      callback(err,null);
    }
    callback(null,{"TxHash": data })
  })
};

sikkaInterface.prototype.getBalance = function(address,callback){
  var callData = {
    to    : this.address,
    gas   : '0x61a80',
    data  : this.balanceOfGetData(address)
  }
  this.web3.eth.call(callData,function(err,data) {
    if(err){
      callback(err,null);
    }else{
      callback(null,data/100000000);
    }
  })
}

sikkaInterface.prototype.getLocalBalance = function(callback){
  var self = this;
  self.getBalance(self.ethcore.getLocalAddress(),function(err,data){
    if(err){
      callback(err);
    }
    callback(null,data);
  });
}
