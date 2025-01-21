// AUTH , IS STUDENT , IS INSTRUCTOR , IS ADMIN

const jwt = require("jsonwebtoken");
require('dotenv').config();


// ================ AUTH ================
// user Authentication by checking token validating
exports.auth = (req, res, next) => {
    const token = req.body?.token || req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '').trim();
    console.log("Extracted token:", token);
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token is missing',
        });
    }

    

    try {
        // Check if token has 3 parts (header, payload, signature)
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token structure');
        }
        console.log(parts)

        // Decode token to inspect header and payload
        const decoded = jwt.decode(token, { complete: true });
        console.log("Decoded token (header + payload):", decoded);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format',
            });
        }

        // Check if the token is expired
        if (decoded.payload.exp < Math.floor(Date.now() / 1000)) {
            return res.status(401).json({
                success: false,
                message: 'Token has expired',
            });
        }

        // Verify the token with the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        console.log("Verified token:", verified);

        req.user = verified;  // Attach the verified user data to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error during token verification:", error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired',
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
};











// ================ IS STUDENT ================
exports.isStudent = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user?.accountType != 'Student') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for student'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with student accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with student accountType'
        })
    }
}


// ================ IS INSTRUCTOR ================
exports.isInstructor = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user?.accountType != 'Instructor') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for Instructor'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with Instructor accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with Instructor accountType'
        })
    }
}


// ================ IS ADMIN ================
exports.isAdmin = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user.accountType != 'Admin') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for Admin'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with Admin accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with Admin accountType'
        })
    }
}


