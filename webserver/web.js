var sikka = require('../sikka/sikka');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');
var rfs = require('rotating-file-stream')
var sch = require('node-schedule');
var coin = new sikka();
var config = require('../config/web.json');

var app  = express();

var logDirectory = path.join(__dirname, '../log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})

app.use(morgan('combined', {stream: accessLogStream}));

var j = sch.scheduleJob('/1 * * * * *', function(){
  coin.exchange.getBTCrate(function(error,result){
    if(error){
      console.log("Error fetching current rate");
    }
  })
})

app.get('/api/init',function(req,res){
  coin.init(req.query.address,function(err,data){
    if(err){
      res.status(500).send({ "Error": err });
    }else{
      res.status(200).send(data);
    }
  })
})

app.get('/api/check',function(req,res){
  coin.check(req.query.id,function(err,data){
    if(err){
      res.status(500).send({ "Error": err });
    }else{
      res.status(200).send(data);
    }
  })
})

app.get('/api/fetchTxn',function(req,res){
  coin.fetchTxn(req.query.id,function(err,data){
    if(err){
      res.status(500).send({ "Error": err });
    }else{
      res.status(200).send(data);
    }
  })
})

app.get('/api/getRate',function(req,res){
  res.status(200).send({ "rate": coin.exchange.rate });
})

app.use('/', express.static('./webserver/public'));

app.listen(config.web.port,() => {
  console.info(`server started on port ${config.web.port} `);
});
