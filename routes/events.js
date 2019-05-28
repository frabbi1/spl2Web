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

router.get('/',authcheck, (req,res)=>{
  var sql = "select * from events order by id desc";
  db.query(sql, (err,result)=>{
    if(err) throw err;
    res.render('events',{
      lists: result
    });
  });

});

router.post('/nearby/:id',authcheck,(req,res)=>{

  var id = req.params.id;
  var p1 = req.body.p1;
  var p2 = req.body.p2;
  var p3 = req.body.p3;
  var l1 = req.body.l1;
  var l2 = req.body.l2;
  var l3 = req.body.l3;
  var lat1 = req.body.lat1;
  var lat2 = req.body.lat2;
  var lat3 = req.body.lat3;

  var sql1 = `insert into nearby_places (eventId, place_name, longitude, latitude) VALUES ('${id}','${p1}','${l1}','${lat1}' )`;
  var sql2 = `insert into nearby_places (eventId, place_name, longitude, latitude) VALUES ('${id}','${p2}','${l2}','${lat2}' )`;
  var sql3 = `insert into nearby_places (eventId, place_name, longitude, latitude) VALUES ('${id}','${p3}','${l3}','${lat3}' )`;

  db.query(sql1,(err,result)=>{
    if(err) throw err;
  })
  db.query(sql2,(err,result)=>{
    if(err) throw err;
  })
  db.query(sql3,(err,result)=>{
    if(err) throw err;
  })

  res.render('eventOptions',{
    "id":id
  });

})

module.exports = router;
