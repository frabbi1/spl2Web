var express = require('express');
var router = express.Router();
var db = require("../config/database");

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
				"end_date": result[0].end_date  
			}
			console.log(found);
			res.end(JSON.stringify(found));
		

	})
});

router.post('/register', (req,res)=>{
	var e_id = req.query.e_id;
	var p_id = req.query.p_id;

	var qry = `select * from event_participant where (e_id = ${e_id} and p_id = '${p_id}')`
	db.query(qry,(err1,result1)=>{
		if(err1) throw err1;
		if(!(result1.length>0)){
			var sql = `insert into event_participant (e_id,p_id) VALUES (${e_id},'${p_id}')`;

			db.query(sql,(err,result)=>{
				if(err) throw err;
				res.end("");
			})
		}
		res.end("");
	})

	

})

module.exports = router;