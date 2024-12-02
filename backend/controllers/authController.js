
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');

exports.signup = async (req, res, next) => {
    const { email } = req.body;

    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse("E-mail already registered", 400));
    }

    // Handle resume upload if it exists
    let resumePath = null;
    if (req.file) {
        // resumePath = req.file.path;  
        console.log('Uploaded file path:', req.file.path);
        // resumePath = path.relative(process.cwd(), req.file.path);
        resumePath = path.posix.join('/uploads', path.basename(req.file.path));
    }

    try {
        // Add the resumePath to the body if a resume was uploaded
        const userData = { ...req.body, resume: resumePath };

        // Create new user
        const user = await User.create(userData);

        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
}



exports.signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        //validation
        if (!email) {
            return next(new ErrorResponse("please add an email", 403));
        }
        if (!password) {
            return next(new ErrorResponse("please add a password", 403));
        }

        //check user email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("invalid credentials", 400));
        }
        //check password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("invalid credentials", 400));
        }

        sendTokenResponse(user, 200, res);

    } catch (error) {
        next(error);
    }
}

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res
        .status(codeStatus)
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true,
            role: user.role,
            id: user._id,
            
        })
}


// log out
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    })
}

// user profile
exports.userProfile = async (req, res, next) => {

    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
        success: true,
        user
    })
}








