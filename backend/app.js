var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var productsRouter = require('./routes/product');
var orderRouter = require('./routes/index')



var cors = require('cors');
var mongoose = require('mongoose');

//Imports for Authentication
var passport = require('passport');
var LocalStrategy = require('passport-local');
passportLocalMongoose = require('passport-local-mongoose');
var session = require('express-session');
var User = require('./models/userModel');

var app = express();


//To allow a specific origin
app.use(cors({
    origin: 'http://localhost:4200'
}));

//mongoose.set('useFindAndModify', false);
//Connect to database
mongoose.connect('mongodb://localhost:27017/shop24x7',
{ useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> {console.log('Connected to Database')})
.catch((error)=>{ console.log(error)});

//Encode or Decode the session object
app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 2*60*1000
    }
  }));
  
passport.serializeUser(User.serializeUser());     //session encoding
passport.deserializeUser(User.deserializeUser()); //session decoding
passport.use(new LocalStrategy(User.authenticate()));
  

app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/products', productsRouter);
app.use('/orders', orderRouter);


module.exports = app;
