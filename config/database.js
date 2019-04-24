var mysql = require('mysql');


var db = mysql.createConnection({
    host: "localhost",
    user: "root2",
    database: "spl2DB",
    password: "123password"
  });
  
db.connect((err) => {
    if(err) throw err;
    console.log("Database connected");
});

module.exports = db;
