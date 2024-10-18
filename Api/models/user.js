const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username : {type:String, require:true, min: 4, unique:true},
    password :{type:String , requires:true},
});

const userModel = mongoose.model('user' , UserSchema);;

module.exports = userModel;