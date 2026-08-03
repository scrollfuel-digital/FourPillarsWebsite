import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            maxlength: [100, "Name cannot exceed 100 characters"],
        },

        email: {
            type: String,
            required: [true, "Email address is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address",
            ],
        },

        password: {
            type: String,
            minlength: [
                6,
                "Password must be at least 6 characters long"
            ],
            select: false,
        },

        authProvider: {
            type: String,
            enum: [
                "local",
                "google"
            ],
            default: "local",
        },

        googleId: {
            type: String,
            default: null,
        },

        avatar: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            default: "admin",
        },
    },

    {
        timestamps: true,
    }
);

userSchema.pre(
    "save",
    async function () {


        if (
            !this.isModified("password") ||
            !this.password
        ) {
            return;
        }
        this.password =
            await bcrypt.hash(
                this.password,
                10
            );


    }
);

// Compare Password

userSchema.methods.comparePassword =
    async function (candidatePassword) {


        if (!this.password) {

            return false;

        }


        return await bcrypt.compare(
            candidatePassword,
            this.password
        );


    };

const User =
    mongoose.models.User ||
    mongoose.model(
        "User",
        userSchema
    );


export default User;