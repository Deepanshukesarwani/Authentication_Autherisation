const user = require("../models/User");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const saltRounds = 10;
require("dotenv").config();
const cookie = require('cookie');
exports.login =async(req,res)=>{
const JWT_Secrete=process.env.JWT_Secrete;
try{
 const {Email,Password}= req.body;
  console.log(Email);
//  checking is there any field is empty 
if( !Email || !Password){
       
    return res.status(400).json({
        succes:false,
        message:"please fill the field "
    })
}
else{
     // checking email is registered or not 
     let User=await user.findOne({Email})
    //  console.log(User);
        if(!User){
            console.log("!user",User)
            try{
                
               return res.status(200).json({
                    success:false,
                    message:"User is not registered please Create Your account",

                })
            }
            catch(error){
               return res.status(500).json({
                    success:false,
                    message:`Error in finding the email console.log(${error})`
                })
            }
        }
        else{
            // checking the password is correct or not /
            
            const checkPass= bcrypt.compare(Password,User.Password);
            // const User=await user.findOne({Email});
            console.log(User);

            const payload={
                Name:User.Name,
                Email:User.Email
            }

            // password checked 
            if(checkPass){

                // token creation 
                let token=jwt.sign(payload,JWT_Secrete,{
                    expiresIn:"2h"
                })
                User=User.toObject();
                User.token=token;
                User.Password=undefined;
                
                console.log(User);

                // option that send in cookie 
                const option={
                    expiresIn:new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly:true

                }


                // using token in cookie 
                return res.cookie("Cookiename",token,option).status(200).json({
                    success:true,
                    token,
                    User,
                    message:"User login SuccesFully"
                });

            }
            else{
                return res.status(200).json({
                    success:false,
                    message:`please fill the correct password `
                })
            }

        }
}

}
catch(error){
    res.status(400).json({
        succes:false,
        message:error.message
    })

}
}