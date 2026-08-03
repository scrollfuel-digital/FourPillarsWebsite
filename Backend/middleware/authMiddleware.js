import jwt from "jsonwebtoken";
import User from "../Models/UserSchema.js";


export const protect = async (req, res, next) => {

    try {
        let token;
        // Get token from Authorization header

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {

            token =
                req.headers.authorization.split(" ")[1];

        }
        if (!token) {

            return res.status(401).json({

                success: false,

                message:
                    "Access denied. Authentication token missing."

            });

        }
        // Check JWT Secret

        if (!process.env.JWT_SECRET) {

            console.error(
                "JWT_SECRET missing in environment variables"
            );


            return res.status(500).json({

                success: false,

                message:
                    "Server configuration error"

            });

        }
        // Verify Token
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );
        // Find User
        const user =
            await User
                .findById(decoded.id)
                .select("-password");
        if (!user) {
            return res.status(401).json({

                success: false,

                message:
                    "User account not found"

            });

        }
        // Attach user
        req.user = user;
        next();
    }
    catch (error) {
        console.error(
            "Auth Middleware Error:",
            error.message
        );
        if (error.name === "JsonWebTokenError") {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid authentication token"

            });

        }
        if (error.name === "TokenExpiredError") {

            return res.status(401).json({

                success: false,

                message:
                    "Session expired. Please login again."

            });

        }
        return res.status(500).json({

            success: false,

            message:
                "Authentication failed"

        });
    }
};