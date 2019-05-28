var express = require('express');
var router = express.Router();
var db = require("../config/database");
var async = require('async');

var bodyParser = require('body-parser')
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get("/fetch",(req,res)=>{
	var id = req.query.id;
	var code = req.query.code;

	var sql = `select * from events where (id = ${id} and code = '${code}')`;

	db.query(sql, (err,result)=>{

		if(err) throw err;
		

		
			var found = {
				"id" : result[0].id,
				"name" : result[0].name,
				"location": result[0].location,
				"start_date": result[0].start_date,
				"end_date": result[0].end_date,
				"description": result[0].description,
				"longitude":result[0].longitude,
				"latitude":result[0].latitude 
			}
			console.log(found);
			res.end(JSON.stringify(found));
		

	})
});

router.post('/register', (req,res)=>{
	var e_id = req.query.e_id;
	var p_id = req.query.p_id;
	if(p_id==undefined || p_id=="") res.end("");
	var qry = `select * from event_participant where (e_id = ${e_id} and p_id = '${p_id}')`
	db.query(qry,(err1,result1)=>{
		if(err1) throw err1;
		if((result1.length>0)){
			var sql = `insert into event_participant (e_id,p_id) VALUES (${e_id},'${p_id}')`;

			db.query(sql,(err,result)=>{
				if(err) throw err;
				res.end("");
			})
		}
		res.end("");
	})

	

})

router.get('/joined/:id', (req,res)=>{
	var id = req.params.id;

	var id = req.params.id;
	var sql = `select * from event_participant where p_id = '${id}'`;
	var e = [];
	var bw = 0;
	db.query(sql,(err,result)=>{
		if(err) throw err;
		console.log(result.length)
		async.each(result, function(row,cb){
			var sql1 = `select * from events where id = '${row.e_id}'`;
			db.query(sql1, (err1,result1)=>{
				if(err1) throw err1;
				console.log(row)
				var event = {};
				if(row!=undefined){
					 event.id = result1[0].id;
					 event.name = result1[0].name;
					 event.location = result1[0].location;
					 event.start_date = result1[0].start_date;
					 event.end_date = result1[0].end_date;
					 event.description = result1[0].description;
					 event.longitude = result1[0].longitude;
					 event.latitude = result1[0].latitude;
					 event.code = result1[0].code;		

					e.push(event);
				}
				//console.log(p.length);
			
				cb();

			});
			
		}, function(err){
			console.log(e.length);
			res.json(e);

		});
		
		

		
	});
	
})

router.get('/nearme/:id',(req,res)=>{
	var id = req.params.id;
	var sql = "select * from nearby_places where eventId = '" +id +"'";
	var place = [];
	db.query(sql, (err,result)=>{
		if(err) throw err;

		async.each(result, function(row,cb){
			var temp = {}
			temp.lon = row.longitude;
			temp.lat = row.latitude;
			temp.loc = row.place_name;
			place.push(temp)
			
			
			
		}, function(err){
			console.log(place.length);
			

		});
		res.json(place);
	})
})

module.exports = router;