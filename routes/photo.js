var express = require('express');
var router = express.Router();
var db = require("../config/database");
var multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/photos')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})


function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).array('photo', 15);

const uploadFile = multer({
  storage: storage,
  
}).array('file', 15);


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
 
  res.render("upload",{
    id: req.params.id,
    msg: "",
    msg1:""
  });
})

router.post('/:id/uploads', (req, res) => {
	var id = req.params.id;
  upload(req, res, (err) => {
    if(err){
      res.render('upload', {
      	id: req.params.id,
        msg: err,
         msg1:""
      });
    } else {
      if(req.files.length == 0){
        res.render('upload', {
        id: req.params.id,
          msg: 'Error: No File Selected!',
           msg1: ""
        });
      } else {
      	var url = "http://ec2-52-29-113-22.eu-central-1.compute.amazonaws.com/ema/uploads/photos/";
      	var i;
      	for(i=0;i<req.files.length;i++){
      		var url1 = url+req.files[i].filename;
      		console.log(url1);
  			var qry = `INSERT INTO images (eventId, name, url) VALUES ('${id}','${req.files[i].filename}','${url1}' )`;
  			db.query(qry, (err,result) =>{
			    if(err) throw err;
			    
  			})
		}
      	
        res.render('upload', {
        id: req.params.id,
          msg: 'File Uploaded',
           msg1: ""
        });
      }
    }
  });
});



router.get("/gallery/:id", authcheck, (req,res)=>{
 
 var id = req.params.id;
 var photos;
 var sql = "select * from `images` where eventId= '"+id+"' ";
	 db.query(sql,(err,result)=>{
	 	if(err) throw err;
	 	res.render('gallery',{
	 		id:id,
	 		p:result
	 
		});

	 });
	 
});
router.get("/gallery/:id/:photo/delete", authcheck, (req,res)=>{
 
 var id = req.params.id;
 var photo = req.params.photo;
 var photos;
 var sql = "delete from `images` where id= '"+photo+"' ";
	 db.query(sql,(err,result)=>{
	 	if(err) throw err;
	 	var sql2 = "select * from `images` where eventId= '"+id+"' ";
	 	db.query(sql2,(err,result)=>{
		 	if(err) throw err;
		 	res.render('gallery',{
		 		id:id,
		 		p:result
		 
			});

	 	});
	 	

	 });
	 
});
module.exports = router;