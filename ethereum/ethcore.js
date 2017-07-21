var keyeth    = require('keythereum');
var fs        = require('crypto');
var path      = require('path');
var crypto    = require('crypto');

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

module.exports = ethcore;
