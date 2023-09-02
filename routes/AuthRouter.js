const express=require("express");
const router=express.Router();

const {signupAuth}=require("../controller/SignUpAuth");

router.post("/signup",signupAuth);
module.exports=router;