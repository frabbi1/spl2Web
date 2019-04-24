var express = require('express');
var router = express.Router();
var db = require("../config/database");

var bodyParser = require('body-parser')
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/add', (req,res)=>{
	console.log("inserting...")

	var id = req.body.id;
	var name = req.body.name;
	var email = req.body.email;
	var age = req.body.age;
	var gender = req.body.gender;
	var occupation = req.body.occupation;
	var institution = req.body.institution;
	var phone = req.body.phone;
	var nationality = req.body.nationality;
	var photo = req.body.photo;
	var sql = `INSERT INTO Participants (id, name, email, age, gender, occupation, institution, phone, nationality, photo) VALUES ('${id}','${name}','${email}','${age}','${gender}','${occupation}','${institution}','${phone}','${nationality}','${photo}' )`;

	db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
     
    });
    var newParticipant = {
    	"id" : id,
    	"name" : name,
    	"email":email,
    	"age":age,
    	"gender":gender,
    	"occupation":occupation,
    	"institution":institution,
    	"phone":phone,
    	"nationality":nationality,
    	"photo":photo
    };
    res.end(JSON.stringify(newParticipant));



})
// router.get('/', (req,res)=>{
// 	res.send("jhsgfjsdg");
// })
router.get('/check/:id', (req,res)=>{

	var id = req.params.id;
	var sql = `select * from Participants where id = '${id}'`;
	db.query(sql,(err,result)=>{
		if(err) throw err;
		var value = result.length;

		if(value){
			console.log(result[0])
			res.end(JSON.stringify(result[0]));
		}
		else{
			var n = {
				"id" : "0"
			}
			res.end(JSON.stringify(n));
		}
	});

})
router.get('/:id' ,(req,res)=>{
	var id = req.params.id;
	var sql = `select * from Participants where id = '${id}'`;
	db.query(sql,(err,result)=>{
		if(err) throw err;
		console.log(JSON.stringify(result[0]))
		res.end(JSON.stringify(result[0]));
	});
});



router.put('/update/:id', (req,res)=>{
	console.log("inserting...")

	var id = req.params.id;
	var name = req.body.name;
	var email = req.body.email;
	var age = req.body.age;
	var gender = req.body.gender;
	var occupation = req.body.occupation;
	var institution = req.body.institution;
	var phone = req.body.phone;
	var nationality = req.body.nationality;
	var photo = req.body.photo;
	var sql = `UPDATE Participants SET name = '${name}',age='${age}',gender = '${gender}',occupation = '${occupation}',institution= '${institution}',phone = '${phone}',nationality = '${nationality}',photo = '${photo}' where id  = '${id}'`;
	db.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
     
    });
    var updateduser = {
    	"id" : id,
    	"name" : name,
    	"email":email,
    	"age":age,
    	"gender":gender,
    	"occupation":occupation,
    	"institution":institution,
    	"phone":phone,
    	"nationality":nationality,
    	"photo":photo
    };

    res.end(JSON.stringify(updateduser));




})
module.exports = router;