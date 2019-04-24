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

router.get('/:id', authcheck,(req,res)=>{
  var id = req.params.id;
  var sql = "select * from `events` where id= '"+id+"' ";
  db.query(sql, (err,result)=>{
    if(err) throw err;
    console.log(result);
    res.render('show',{

      row: result[0]
    });
  });

});


module.exports = router;
