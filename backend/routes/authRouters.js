const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {check, validationResult} = require("express-validator")

const User = require("../models/user")

const router = express.Router();



//Sign up
router.post('/register',
    [
        check("username", "Username cannot be empty!").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({min:6}),
    ], 
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array()});
        }

        const {username, email, password} = req.body;
        try{
            let user = await User.findOne({email})
            if(user){
                return res.status(400).json({message: "User already exists"})
            }
            
            // hash mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)

            // ghi user mới vào db
            user = new User({
                username,
                email,
                password: hashedPassword,
            })

            await user.save();

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "24h"});

            res.status(201).json({token});
        } catch(err){
            res.status(500).json({message: "Server Error", error: err.message})
        }
    }
)


//sign in
router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try{   
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found!"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "24h"});

        res.json({token});
    } catch(err){
        res.status(500).json({message: "Server Error", error: err.message})
    }
})

//lấy thông tin user trong db bỏ password
//authentication
router.get('/profile', require('../middleware/auth'), async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user)
    } catch(err){
        res.status(500).json({message: "Server Error", error: err.message})
    }
})


module.exports = router;