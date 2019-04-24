var express = require('express');
var router = express.Router();


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

  res.render('first');
  
  //res.send(req.user);

});

module.exports = router;
