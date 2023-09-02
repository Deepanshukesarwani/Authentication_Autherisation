const express=require("express");
const app=express();

require("dotenv").config();
const PORT=process.env.PORT || 8080;
app.use(express.json());
const AuthRouter=require("./routes/AuthRouter");
app.use('/',AuthRouter);

require("./config/database").dbconnection();
app.listen(PORT,(err)=>{
    if (err) {
        console.error("Error starting the server:", err);
    } else {
        console.log(`App is running on port ${PORT}`);
    };
})
app.get("/",(req,res)=>{
    res.send(`homepage`);
})



