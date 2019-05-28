var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');
var cookieSession = require('cookie-session');
var passport = require('passport');
var keys = require('./config/keys');
var passportSetup = require("./config/passport-setup");
var session = require('express-session');
var cookieParser = require('cookie-parser');


var app = express();
var port = 3009;

//web
var auth = require("./routes/auth");
var events = require('./routes/events');
var newEvent = require('./routes/newEvent');
var welcome = require('./routes/first');
var show = require('./routes/show');
var homepage = require('./routes/homepage');
var users = require("./routes/users");
var showUser = require("./routes/showUser");
var adminWelcome = require('./routes/adminWelcome');
var photo = require('./routes/photo');
var files = require('./routes/files');
var nearby = require('./routes/nearby');
var notification = require('./routes/notification');

//android
var participantInfo = require("./android/participants")
var event = require("./android/event")
var file = require("./android/file")


app.use('/ema/public', express.static(path.join(__dirname, 'public')))
app.use('/ema/uploads', express.static(path.join(__dirname, 'uploads')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
//app.use(express.static('./public'));
app.use(cookieSession({
  name: 'session',
  maxAge: 24*60*60*1000,
  keys: ['key1', 'key2']
}));


app.use(passport.initialize());
app.use(passport.session());

//web
app.use('/ema/events', events);
app.use('/ema/newEvent', newEvent);
app.use('/ema/show', show);
app.use('/ema/', homepage);
app.use("/ema/auth", auth);
app.use('/ema/welcome', welcome);
app.use('/ema/users', users);
app.use('/ema/showUser', showUser);
app.use('/ema/adminWelcome', adminWelcome);
app.use('/ema/photo', photo);
app.use('/ema/files', files);
app.use('/ema/nearby', nearby);
app.use('/ema/notification', notification);


//android
app.use('/ema/participants', participantInfo)
app.use('/ema/event',event);
app.use('/ema/file',file);

app.listen(port, (err)=>{
  if(err) console.log("Error in connection");
  console.log("connected to port: " + port );
});
