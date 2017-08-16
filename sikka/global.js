var sch     = require('./scheduler');
var db      = require('../database/db');

module.exports = {
  sch : sch,
  db  : db,
  constants : {
    time    : 3600000,
    btcDec  : 100000000,
    skaDec  : 100000000
  }
}
