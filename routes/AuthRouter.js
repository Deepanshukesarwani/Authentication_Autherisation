const express=require("express");
const router=express.Router();

const {signupAuth}=require("../controller/SignUpAuth");
const {login}=require("../controller/LoginAuth");
router.post("/login",login);
router.post("/signup",signupAuth);
module.exports=router;