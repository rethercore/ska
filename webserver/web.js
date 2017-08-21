global = require('../sikka/global');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser')
var { validate, ValidationError } = require('express-json-validator');
var path = require('path');
var fs = require('fs');
var rfs = require('rotating-file-stream')
var sikka = require('../sikka/sikka');
var coin = new sikka();
var config = require('../config/web.json');

var schemaInit = {
  properties: {
    Exchange  : { type: 'string' },
    C1Addr    : { type: 'string' },
    C2Addr    : { type: 'string' },
    C1Value   : { type: 'number' },
    C2Value   : { type: 'number' }
},
  required: [ 'Exchange', 'C1Addr', 'C2Addr', 'C1Value' , 'C2Value' ]
};

var app  = express();


var logDirectory = path.join(__dirname, '../log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})

app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser());

// Add Validation
app.post('/api/v1/startTx', function(req,res){
  coin.startTx(req.body,function(err,data){
    if(err){
      res.status(500).send({ "Error": err });
    }else{
      res.status(200).send(data);
    }
  });
});

app.get('/api/v1/fetchId',function(req,res){
  coin.fetchTxid(req.query.Txid,function(err,data){
    if(err){
      res.status(500).send({ "Error": err });
    }else{
      res.status(200).send(data);
    }
  })
})

app.get('/api/v1/getRates',function(req,res){
  res.status(200).send(coin.rates);
})

app.get('/api/v1/getBalance',function(req,res){
  res.status(200).send(coin.balance);
})

app.use('/', express.static(path.resolve('./webserver/public')));

app.listen(config.web.port,() => {
  console.info(`server started on port ${config.web.port} `);
});
