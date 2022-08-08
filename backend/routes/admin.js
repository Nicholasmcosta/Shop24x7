//Sakhan

var express = require('express');
var router = express.Router();
var User = require('../models/userModel')
var nodemailer = require('nodemailer')

var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/users', (req,res,next)=>{
    User.find((err,data)=>{
        if (err) throw  err;
        res.send(data);        
    })
})

router.get('/users/:id', (req,res)=>{
  User.findById(req.params.id, (err,user)=>{
    if (err) throw err;
    return res.send(user);
  })
})


router.post('/users/register', (req,res)=>{

  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password : req.body.password,
    phone: req.body.phone,
    admin: req.body.admin
  });

  console.log(user);

  User.register(user,req.body.password, function(err, user){
    if (err){
      console.log(err);
      var result = {
        "status" : "failure",
        "message" : "unable to create user."
      }
      return res.send(result);
    }
    passport.authenticate("local")(req,res,function(){
      var result = {
        "status" : "success",
        "message" : "User created successfully."
      }
     
      return res.send(result);

      sendMail(user, (err, info) => {
        if (err) {
          console.log(err);
          res.status(400);
          res.send({ error: "Failed to send email" });
        } else {
          console.log("Email has been sent");
          res.send(info);
        }
      });

    })
  })

  // Ajith's Nodemailer
  const mailOptions = {
    from: `"Ajith", "ajithumass2019@gmail.com"`,
    to: user.username,
      subject: "Shop 24x7 Account Registartion ",
    html: "<h4>Hello " + user.firstName + user.lastName+ ",</h4><p>Thanks for creating the 24x7 account, Happy Shopping . If you are not the recipient of this, please contact help@shop24x7.com </p>"
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
  
    console.log('Message sent: ' + info.response);
  });

})


router.put('/users/:id', (req, res)=>{
  var user = new User(req.body);
  console.log(user);
  User.findByIdAndUpdate(req.params.id, user, (err,result)=>{
    if (err) throw err;
    return res.send(result);
  })
})

router.delete('/users/delete/:id', (req, res)=>{
  User.findByIdAndRemove(req.params.id, (err, result)=>{
    if(err) throw err;
    return res.send(result);
  })
})



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ajithumass2019@gmail.com',
    pass: 'Ajith@0301' //Enter Gmail Password
  }
});

module.exports = router;
