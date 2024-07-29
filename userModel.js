const mongoose =require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required : [true,"add the user name "],

    },
    email:{
        type:String,
        required : [true,"add the email"],
        unique:[true,"Email already taken"],
    },
    password:{
        type:String,
        require :[true , "please add the user password"],
    },


},{
    timestamps:true,

});

module.exports = mongoose.model("User",userSchema);