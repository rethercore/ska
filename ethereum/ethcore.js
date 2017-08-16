var keyeth    = require('keythereum');
var fs        = require('crypto');
var path      = require('path');
var crypto    = require('crypto');
var EthereumTx= require('ethereumjs-tx');
var ethAddr   = require('ethereum-address');


var keys = require('../config/ethereumKeys.json');

var ethcore = function() {
  if (!(this instanceof ethcore)) {
		return new ethcore();
	}
  this.keyeth = keyeth;
  this.crypto = crypto;
};

ethcore.prototype.generateRandom = function () {
  return this.crypto.randomBytes(32).toString('hex')
};

ethcore.prototype.generatePassword = function (value) {
  return this.crypto.createHash('sha256').update(value+keys.ethereum.secret).digest('hex')
};

ethcore.prototype.deriveAddress = function (value) {
  return this.keyeth.privateKeyToAddress(this.keyeth.deriveKey(this.generatePassword(value),keys.ethereum.secret));
};

ethcore.prototype.generateAddress = function (txno) {
  var self = this;
  var dk = self.keyeth.create({ keyBytes: 32, ivBytes: 16 });
  var options = {
      kdf: "pbkdf2",
      cipher: "aes-128-ctr",
      kdfparams: {
        c: 262144,
        dklen: 32,
        prf: "hmac-sha256"
      }
    };
  return self.keyeth.dump(self.generatePassword(txno),dk.privateKey,dk.salt,dk.iv,options)
};

ethcore.prototype.getLocalAddress = function () {
  return '0x'+keys.accounts.address
};

ethcore.prototype.signLocal = function(param){
  var tx = new EthereumTx(param)
  tx.sign(keyeth.recover(keys.ethereum.secret,keys.accounts))
  var serializedTx = tx.serialize()
  return serializedTx.toString('hex');
}

ethcore.prototype.addressValid = function (address) {
  return ethAddr.isAddress(address);
};

module.exports = ethcore;
