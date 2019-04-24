var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var db = require("./database");



passport.serializeUser((user,done)=>{
    console.log(user);
    
    done(null, user.id);
});
passport.deserializeUser((id,done)=>{
    var sql = `select * from Admin where id = ${id}`;
    db.query(sql, (err,result) => {
        if(err) throw err;
        done(null, result[0]);
    });
    
});
passport.use(
    new GoogleStrategy({
        callbackURL:'http://ec2-52-29-113-22.eu-central-1.compute.amazonaws.com/ema/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
        
    }, (accesToken, refreshToken, profile, done) =>{

        

       // console.log(profile.displayName +" "+ profile.emails[0].value);
        var email =  profile.emails[0].value;
        var name = profile.displayName;
        var id = profile.id;
        var role = "admin";
        var checkSql = `select * from Admin where id = ${id} LIMIT 1`;
        db.query(checkSql,(err,result) =>{
            if(err) throw err;
            if (result.length) {
                console.log("previous user"); 
                console.log(result);
                done(null, result[0]);
                
                
            } else {
                var sql = `INSERT INTO Admin (id, name, email, role) VALUES ('${id}','${name}','${email}','${role}')`;

                db.query(sql, (err,result) =>{
                    if(err) throw err;
                    console.log(result);
                });

                var newUser = {
                    id: id,
                    name: name,
                    email: email,
                    role: role
                };
                done(null, newUser);
            }
        })
        
        

    })
);