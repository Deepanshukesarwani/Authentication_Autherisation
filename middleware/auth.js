const jwt=require("jsonwebtoken");
require("dotenv").config();
// Auth 
exports.Auth=async(req,res,next)=>{
    const token=req.body;
    const decode=jwt.verify(token,process.env.JWT_Secrete);

}
//student
exports.Student=async(req,res,next)=>{

}
//admin
exports.Admin=async(req,res,next)=>{

}
// test  