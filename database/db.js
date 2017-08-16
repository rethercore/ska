var mongoose  = require('mongoose');

var config    = require('../config/db.json');

mongoose.connect('mongodb://'+config.mongodb.host+':'+config.mongodb.port+'/'+config.mongodb.database, { useMongoClient: true});


var SikkaSchemaJSON = {
    Txid      : String,
    TxAddr    : String,
    TxKey     : Number,
    TxState   : Number,
    InHash    : String,
    OutHash   : String,
    Rate      : Number,
    Exchange  : String,
    C1Addr    : String,
    C2Addr    : String,
    C1Value   : Number,
    C2Value   : Number,
    StartDate : Date,
    EndDate   : Date,
    Auto      : Boolean,
    Version   : Number
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


module.exports = sikkaDB();
