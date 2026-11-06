const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    try {

        const {
            username,
            email,
            phone,
            dob,
            password
        } = req.body;

        const existingUser =
            await User.findOne({ username });

        if (existingUser) {

            return res.status(400).json({
                message: "Username already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            phone,
            dob,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.login = async (req, res) => {

    const { username, password } = req.body;

    try {

        const user =
            await User.findOne({ username });

        if (!user) {

            return res.status(400).json({
                message: "Invalid credentials"
            });

        }

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {

            return res.status(400).json({
                message: "Invalid credentials"
            });

        }

        const token =
            jwt.sign(
                {
                    id: user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

        res.json({
            token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getProfile = async (req, res) => {

    try {

        const user =
            await User.findById(req.user.id)
            .select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.updateProfile = async (req, res) => {

    try {

        const {
            username,
            email,
            phone,
            dob,
            newPassword
        } = req.body;

        const user =
            await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.username = username;
        user.email = email;
        user.phone = phone;
        user.dob = dob;

        if (
            newPassword &&
            newPassword.trim() !== ""
        ) {

            user.password =
                await bcrypt.hash(
                    newPassword,
                    10
                );

        }

        await user.save();

        res.json({
            message:
                "Profile updated successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                error.message
        });

    }

};