const SignUpmodel = require("../models/Signup");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login =async(req,res)=>{
try{
 const {Email,Password}= req.body;
  
//  checking is there any field not empty 
if( !Email || !Password){
       try{  
            return res.status(200).json({
                success:false,
                message:"please fill the all details"
            })
          }
        catch(error){
        res.status(500).json({
                succes:false,
                message:`error in recieving Email and Password in login:-console.log(${error})`
        })
          }
}
else{
    try{
        // checking email is registered or not 
        const emailExist=await SignUpmodel.findOne({Email});
        if(!emailExist){
            try{
                res.status(200).json({
                    success:false,
                    message:"User is not registered please Create Your account",

                })
            }
            catch(error){
                res.status(500).json({
                    success:false,
                    message:`Error in finding the email console.log(${error})`
                })
            }
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:`internal server error console.log(${error})`
        })
    }
}
    
  
   



}
catch(error){

}
}