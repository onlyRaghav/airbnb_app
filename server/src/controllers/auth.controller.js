import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // 1.basic vaildation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        // 2.Check whether user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User Already exists",
            });
        }
        // 3.Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4.Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // 5.generate token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        )
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({
            message: "Server error!"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1.Basic Validation
        if (!email || !password) {
            res.status(400).json({
                message: "Email and password required"
            })
        }
        // 2.find user and explicitly select password
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        // 3.Compare password with the hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        // 4.generate token
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '1d'
            }
        );
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }catch(error){
        console.error("Login Error:",error)
        res.status(500).json({
            message:"Server error!"
        })
    }
}