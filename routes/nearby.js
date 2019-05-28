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

router.get("/:id", authcheck, (req,res)=>{
 
 var id = req.params.id;
  res.render("nearby",{
    id: id
  });
})


module.exports = router;