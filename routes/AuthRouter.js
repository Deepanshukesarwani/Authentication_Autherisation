const express=require("express");
const router=express.Router();

const {signupAuth}=require("../controller/SignUpAuth");
const {login}=require("../controller/LoginAuth");
const{Auth,Student,Admin}=require("../middleware/auth")

router.post("/login",login);
router.post("/signup",signupAuth);



// protected routes for middleware 

// student user protected route 
router.get("/student",Auth,Student,(req,res)=>{
    return res.status(200).json({
        succes:true,
        message:"welcome to Student DashBoard"
    })
})

// Admin user protected routes 
router.get("/admin",Auth,Admin,(req,res)=>{
    res.status(200).json({
        succes:true,
        message:"welcome to Admin DashBoard"
    })
})
// test route 
router.get("/test",Auth,(req,res)=>{
    res.status(200).json({
        succes:true,
        message:"welcome to Admin DashBoard"
    })
})

module.exports=router;