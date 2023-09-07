
const user = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signupAuth = async (req, res) => {
    try {
        const { Name, Email, Password,Role } = req.body;

        // checking the user exist or not 
        const emailExist=await user.findOne({Email});
        console.log(emailExist);
        if(emailExist){
            return res.status(500).json({
                success:false,
                message:"User is already register" 
            })
        }

         // Hash the password before storing it in the database
        try{
            const hashedPassword = await bcrypt.hash(Password, saltRounds);

        // Create a new user record
        const response = await user.create({ Name, Email, Password: hashedPassword,Role });

        return res.status(200).json({
            success: true,
            data: response,
            message: "Entry is done from the signup page"
        });

        }catch(error)
        {   
            res.status(500).json({
                success:false,
                message:"error in hashing password"
            })

        }        
    } catch (error) {
        // console.error(error);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message
        });
    }
};

