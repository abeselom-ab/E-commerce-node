const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
email:{type:String},
profilePicture:{type:String},
password:{type:String},

});

const user = mongoose.model('user', userSchema);

module.exports = user;