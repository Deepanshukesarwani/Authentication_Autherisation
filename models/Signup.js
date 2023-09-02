const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({


    Name:{
        type:String,
        required:true,
        trim:true,
    },
    Email:{
        type:String,
        required:true,
        trim:true
    },
    Password:{
        type:String,
        required:true,
    },
    Role:{
        type:String,
        enum:["Admin","Student","Visitor"]
    }
})
module.exports=mongoose.model("user",userSchema);