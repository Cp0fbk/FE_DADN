require("dotenv").config();
const User = require("../../models/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async(req,res) => {
    const { username, email, password} = req.body;
    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bycrypt.hash(password, 12);
    try{
        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        await user.save();
        return res.status(201).json({
        success: true,
        message: "User created successfully",
        });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const loginUser = async(req,res) => {
    const { username,password} = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    if (
        !existingUser ||
        !(await bycrypt.compare(password, existingUser.password))
      ) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
    }
    const accessToken = jwt.sign(
        {
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "360m" }
    );
    
    res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: {
          accessToken,
        },
      });
}
const profile  = async(req,res) => {
    const user_id = req.user._id;
    const existingUser = await User.findById(user_id)
    if(!existingUser){
        res.status(404).json({
            success: false,
            message: "no user found"
        })
    }else{
        res.status(200).json({
            success: true,
            user: existingUser
        })
    }
}
module.exports = {
    loginUser,
    registerUser,
    profile
}