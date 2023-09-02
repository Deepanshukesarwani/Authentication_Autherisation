const mongoose=require("mongoose");
require('dotenv').config();

exports.dbconnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("DB connection is succesful");
    })
    .catch((err)=>{
        console.log("DB connection Issue");
        console.error(err);
        process.exit(1);
    })
}