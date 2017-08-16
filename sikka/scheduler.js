var schedule = require('node-schedule');

var rc       = require('./ratecard');

var sch      = schedule.scheduleJob('1 * * * * *',function(){

  // Task 1
  rc.getRate(function(err,data){
    if(err){
      console.log("Rate Fetch Failed");
    }else{
      rc.lastUpdatedrate = new Date();
    }
  })

  // Task 2
  rc.getLocalBalance(function(err,data){
    if(err){
      console.log("Balance Fetch Failed");
    }
    rc.lastUpdatedbalance = new Date();
  });

  // Task 3
  console.log(" Scheduler Executed at " + new Date());
});

module.exports = { "RateCard" : rc , "Scheduler" :sch }
