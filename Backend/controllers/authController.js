import jwt from "jsonwebtoken";
import User from "../Models/UserSchema.js";

import { OAuth2Client } from "google-auth-library";

const googleClient =
    new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID
    );

const generateToken = (id) => {


    return jwt.sign(

        {
            id
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "7d"
        }

    );
};

export const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all fields"

            });

        }
        const existingUser =
            await User.findOne({
                email
            });
        if (existingUser) {


            return res.status(400).json({

                success: false,

                message: "User already exists"

            });
        }
        const user = await User.create({
            name,
            email,
            password,
            authProvider: "local",
            role: "admin", // Always admin
        });

        const token =
            generateToken(user._id);
        res.status(201).json({
            success: true,
            message:
                "Registration successful",

            token,
            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,

                avatar: user.avatar,

                authProvider: user.authProvider

            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};
export const loginUser = async (req, res) => {

    try {
        const {
            email,
            password
        } = req.body;
        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password required"

            });

        }
        const user =
            await User
                .findOne({
                    email
                })
                .select("+password");
        if (!user) {
            return res.status(401).json({

                success: false,

                message:
                    "Invalid credentials"

            });
        }
        const match =
            await user.comparePassword(password);
        if (!match) {
            return res.status(401).json({

                success: false,

                message:
                    "Invalid credentials"

            });


        }
        const token =
            generateToken(user._id);
        res.json({

            success: true,

            message:
                "Login successful",

            token,


            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,

                avatar: user.avatar,

                authProvider: user.authProvider

            }
        });
    }
    catch (error) {
        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};
// GOOGLE LOGIN
export const googleAuth = async (req, res) => {
    try {
        const { idToken, googleId, email, name, avatar } = req.body;

        // If real idToken provided, verify with Google
        if (idToken) {
            const ticket = await googleClient.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const { name: gName, email: gEmail, picture, sub: gId } = payload;

            let user = await User.findOne({ email: gEmail });
            if (!user) {
                user = await User.create({
                    name: gName,
                    email: gEmail,
                    avatar: picture,
                    googleId: gId,
                    authProvider: "google",
                    role: "admin",
                });
            } else {
                user.googleId = gId;
                user.avatar = picture;
                await user.save();
            }

            const token = generateToken(user._id);
            return res.json({
                success: true,
                message: "Google Login Successful",
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, authProvider: user.authProvider },
            });
        }

        if (!email) {
            return res.status(400).json({ success: false, message: "Google token or email required" });
        }

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name: name || "Admin User",
                email,
                avatar: avatar || "",
                googleId: googleId || "",
                authProvider: "google",
                role: "admin",
            });
        } else {
            if (googleId) user.googleId = googleId;
            if (avatar) user.avatar = avatar;
            await user.save();
        }

        const token = generateToken(user._id);
        return res.json({
            success: true,
            message: "Google Login Successful",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, authProvider: user.authProvider },
        });

    } catch (error) {
        console.error("Google Auth Error", error);
        return res.status(500).json({ success: false, message: "Google authentication failed" });
    }
};
// GET CURRENT USER

export const getMe = async (req, res) => {

    try {
        res.json({

            success: true,

            user: req.user

        });
    }
    catch (error) {
        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};