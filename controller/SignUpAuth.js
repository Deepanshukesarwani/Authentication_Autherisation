
const SignUpmodel = require("../models/Signup");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signupAuth = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;

        // checking the user exist or not 
        const emailExist=await SignUpmodel.findOne({Email});
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
        const response = await SignUpmodel.create({ Name, Email, Password: hashedPassword });

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
        console.error(error);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message
        });
    }
};

