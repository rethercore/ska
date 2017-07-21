var mongoose  = require('mongoose');

var config    = require('../config/db.json');

mongoose.connect('mongodb://'+config.mongodb.host+':'+config.mongodb.port+'/'+config.mongodb.database, { useMongoClient: true});


var SikkaSchemaJSON = {
  Txno: String,
  ethAddress : String,
  btcAddress : String,
  txhash : String,
  InValue : Number,
  OutValue : {
    ethereum : Number,
    bitcoin : Number,
    IsOverFlow : Boolean
  },
  state : Number,
  StartDate : Date,
  EndDate : Date,
  EthKeyObj : {
    Address : String,
      crypto : {
        cipher : String,
        ciphertext : String,
        cipherparams : {
          iv : String
        },
        mac : String,
        kdf : String,
        kdfparams : {
          c : Number,
          dklen : Number,
          prf : String,
          salt : String
        }
      },
    id : String,
    version : Number
  }
}
//  1 - Init , 2 - Completed , 3 - Overflow, 4 - Expired
var sikkaSchema = mongoose.Schema(SikkaSchemaJSON);

var sikkaModel = mongoose.model('sikka',sikkaSchema);

var sikkaDB = function() {
  if (!(this instanceof sikkaDB)) {
		return new sikkaDB();
	}
  this.mongoose         = mongoose;
  this.SikkaSchemaJSON  = SikkaSchemaJSON;
  this.sikkaSchema      = sikkaSchema;
  this.sikkaModel       = sikkaModel;
};


module.exports = sikkaDB;
