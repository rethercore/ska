var schedule = require('node-schedule');

var rc       = require('./ratecard');

var task = [];

task[0] = function(){
  console.log("Secheduler Executed at " + new Date() );
}

task[1] = function(){
  rc.getRate(function(err,data){
    if(err){
      console.log("Rate Fetch Failed");
    }else{
      rc.lastUpdatedrate = new Date();
    }
  })
}

task[2] = function(){
  rc.getLocalBalance(function(err,data){
    if(err){
      console.log("Balance Fetch Failed");
    }
    rc.lastUpdatedbalance = new Date();
  })
}

var mapTask = function(p){
  p.apply();
}

task.map(mapTask)

var sch      = schedule.scheduleJob('1 1 * * * *',function(){
  task.map(mapTask)
});

module.exports = { "RateCard" : rc , "Scheduler" :sch }
