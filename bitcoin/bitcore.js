var bitc    = require('bitcore-lib');
var fs      = require('fs');
var binstr  = require('binstring');
var shell   = require('shelljs');
var path    = require('path');

var keys = require('../config/bitcoreKeys.json');

var bitcore = function() {
  if (!(this instanceof bitcore)) {
		return new bitcore();
	}
  this.bitcore = bitc;
  this.bitcoinseq = keys.bitcoin.seq;
};

module.exports = bitcore;

bitcore.prototype.generatePrivateKeys = function () {
  if (keys.bitcoin.HDPrivatekey == ''){
    var xp = new this.bitcore.HDPrivateKey();
    keys.bitcoin.HDPrivatekey = xp.xprivkey;
    fs.writeFileSync('../config/bitcoreKeys.json',JSON.stringify(keys));
    return true;
  }else {
    return false;
  }
};

bitcore.prototype.fetchAddres = function () {
  var HDKey = this.bitcore.HDPrivateKey(keys.bitcoin.HDPrivatekey)
  return HDKey.derive(keys.bitcoin.seq).privateKey.toAddress().toString();
};

bitcore.prototype.fetchPubkey = function () {
  var HDKey = this.bitcore.HDPrivateKey(keys.bitcoin.HDPrivatekey)
  return HDKey.derive(keys.bitcoin.seq).publicKey.toString();
};

bitcore.prototype.fetchHDpublicKey = function () {
  var HDKey = this.bitcore.HDPrivateKey(keys.bitcoin.HDPrivatekey)
  return HDKey.hdPublicKey.toString();
};

bitcore.prototype.sign = function (msg) {
  var signer = path.resolve();
  var sign = shell.exec(signer + '/bitcoin/signer ' + msg + ' '+ this.bitcore.HDPrivateKey(keys.bitcoin.HDPrivatekey).derive(keys.bitcoin.seq).privateKey.toObject().bn);
  return sign.split('\n')[0];
};

bitcore.prototype.addressValid = function (addr) {
  return this.bitcore.Address.isValid(addr);
};
