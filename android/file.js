var express = require('express');
var router = express.Router();
var db = require("../config/database");
var async = require('async');

var bodyParser = require('body-parser')
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/photos/:id',(req,res)=>{
	var id = req.params.id;
	//res.end("bal")
	var sql = "select url from images where eventId = '" + id + "'";
	var output = []
	db.query(sql,(err,result)=>{
		if(err) throw err;
		
		async.each(result, function(row,cb){
			var url = row.url;
			output.push(url);

			
		}, function(err){
			console.log(output);
			

		});
		res.json(output);
		

	})
})

router.get('/resources/:id',(req,res)=>{
	var id  = req.params.id
	var sql = "select * from files where eventId = '" + id + "'";
	var output =[];
	db.query(sql,(err,result)=>{
		if(err) throw err;
		console.log(result.length)
		async.each(result, function(row,cb){
			var f = {}
			f.name = row.name
			f.url = row.url
			output.push(f);

			
		}, function(err){
			console.log(output);
			

		});
		res.json(output);
		
		

		
	});

})

module.exports = router;