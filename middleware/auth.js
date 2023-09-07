const jwt=require("jsonwebtoken");
require("dotenv").config();
// Auth 
exports.Auth=async(req,res,next)=>{
    // const token=req.body;
    // const decode=jwt.verify(token,process.env.JWT_Secrete);
    try {
        const token=req.body.token;
        // console.log(typeof(token));
        if(token){
            const decode=jwt.verify(token,process.env.JWT_Secrete);
            // console.log(decode);

           req.User=decode;
        }
        else{
            res.status(200).json({
                succes:false,
                message:`token is not valid, you r not registered candidate`
            })
        }
    } catch (error) {
       return res.status(400).json({
            success:false,
            message:error.message

        })
        
    }
    next();
}
//student
exports.Student=async(req,res,next)=>{
    // const token=req.body;
    // const decode=jwt.verify(token,process.env.JWT_Secrete);
    // console.log(decode.role);
    try {
     const token=req.body.token;
    const decode=jwt.verify(token,process.env.JWT_Secrete);
    console.log(decode.Role);
    console.log(typeof(decode.Role));
    if(!((decode.Role)==="Student"))
    {
        return res.status(200).json({
            succes:false,
            message:"You dont have an access for Student profile"
        })
    }
    } catch (error) {
       return res.status(400).json({
            succes:false,
            message:`error in Student routes ${error.message}`
        })
    }
 next();
}
//admin
exports.Admin=async(req,res,next)=>{
    try {
        const token=req.body.token;
        const decode=jwt.verify(token,process.env.JWT_Secrete);
        if(!((decode.Role)==="Admin"))
        {
            return res.status(401).json({
                success:false,
                Message:"You dont have an Acess of Admin route"
            })
        }
    } catch (error) {
        res.status(400).json({
            succes:false,
            message:error.message
        })  
    }
    next()
}
// test  