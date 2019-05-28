var express = require('express');
var router = express.Router();
var db = require("../config/database");
var async = require('async');

var bodyParser = require('body-parser')
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({
    extended: true
}));

var authcheck = (req,res,next)=>{
  console.log(req.user);
  
  if(!req.user){  
    res.redirect('/ema');
    
  }
  else{
    next();
  }

};

router.get('/:id',authcheck,(req,res)=>{
	var id = req.params.id;
	res.render('notification',{
		"id":id
	})
})

router.post('/save/:id',(req,res)=>{
	var id = req.params.id;
	var text = req.body.notification;
  var sql = `insert into notification (eventId,text) VALUES ('${id}','${text}')`;
  db.query(sql, (err,result)=>{
    res.render('eventOptions',{
      "id":id
    })
  })
	
})

module.exports = router;