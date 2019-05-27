var express = require('express');
var router = express.Router();
var db = require("../config/database");


var authcheck = (req,res,next)=>{
  console.log(req.user);
  
  if(!req.user){  
    res.redirect('/ema');
  }
  else{
    next();
  }

};
router.get('/',authcheck,(req,res)=>{

  res.render('adminWelcome');
  
  //res.send(req.user);

});

router.get("/profile", authcheck, (req,res)=>{
 
  res.render("profile",{
    profile: req.user
  });
})
router.get("/events", authcheck, (req,res)=>{
  var sql = `select * from events where admin = '${req.user.email}' order by id desc`;
  db.query(sql, (err,result) =>{
    if(err) throw err;
    res.render("user-events",{
      events: result
    });
  })
 
})
router.get("/events/show/:id", authcheck, (req,res)=>{
  var id = req.params.id;
  var sql = "select * from `events` where id= '"+id+"' ";
  db.query(sql, (err,result)=>{
    if(err) throw err;
    console.log(result);
    res.render('event-details',{

      row: result[0]
    });
  });
});
router.get('/events/show/:id/options', authcheck,(req,res)=>{
  res.render('eventOptions',{
    id: req.params.id
  });

});

router.post('/saved', (req,res) => {
  var name = req.body.ename;
  var loc = req.body.location;
  var sdate = req.body.startDate;
  var edate = req.body.endDate;
  var id = req.body.eventId;
  var code = req.body.code;
 
  var desc = req.body.desc;
  var lon = req.body.long;
  var lat = req.body.lat;

  //res.send("Added succesfully");
    var sql = `UPDATE events SET name='${name}', location='${loc}', start_date = '${sdate}', end_date = '${edate}', code = '${code}', longitude = '${lon}', latitude = '${lat}', description = '${desc}' WHERE events.id='${id}'`;
    db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.redirect('/ema/adminWelcome/events');
  });
});

module.exports = router;
