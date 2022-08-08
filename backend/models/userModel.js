//User Collection:Sakhan
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username:String,
    password:String,
    phone:Number,
    profilePic:{
        type:String,
        default:"./images/profilePic.png"
    },
    address:String,
    admin: {type:Boolean, default:false}
});

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('user', userSchema);