const jwt = require("jsonwebtoken");
require("dotenv").config();


// auth
exports.auth = async (req, res, next) => {
    try {
        // extract the token
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization")?.replace("Bearer ", "").trim();

        // if token missing ,then send response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
        } catch (error) {
            // verification issue
            return res.status(401).json({
                success: false,
                message: "Token is Invalid",
            });
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token ",
        });
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only",
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified ,please try again later",
        });
    }
}

// is User
exports.isUser = async(req, res, next) => {
    try{
        if (req.user.accountType !== "User") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for User only",
            });
        }

        next();
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified ,please try again later",
        });
    }
}