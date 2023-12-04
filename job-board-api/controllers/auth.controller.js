const asyncHandler = require('express-async-handler')
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {Op, Sequelize} = require("sequelize");

const {User, Token} = require('../models')
const {tokenGenerator, nodemailer} = require('../utils')

// @ desc ---- Google Authentication (Signup/Signin)
// route  --POST-- [base_api]/auth/google
const googleAuth = asyncHandler(async (req, res) => {
    const {email, first_name, last_name} = req.body;
    const userName = `${first_name} ${last_name}`;

    // check the user with the given Google email
    const existingUser = await User.findOne({where: {email}});
    if (existingUser && existingUser.auth_source === 'google') {
        // User exists --> signin
        const {accessToken} = await tokenGenerator(res, existingUser.id, userName, existingUser.email, existingUser.role);
        res.status(201).json({
            userName: userName,
            accessToken: accessToken
        });
    }else{
        if (existingUser && existingUser.auth_source !== 'google'){
            res.status(400)
            throw new Error('This email was not registered via google. Use email and password to login')
        }
        // res.status(409)
        // throw new Error('Email already registered. Use another email')
    }

    // user does not exist --> signup
    const newUser = await User.create({
        first_name,
        last_name,
        email,
        auth_source: 'google',
        verified: true,
    });

    if (!newUser) {
        res.status(500);
        throw new Error('Failed to signup with Google. Try again later');
    }

    // signin the new user
    const {accessToken} = await tokenGenerator(res, newUser.id, userName, newUser.email, newUser.role);

    res.status(201).json({
        userName: userName,
        accessToken: accessToken
    });
});

// @ desc --- Register new user
// route  --POST-- [base_api]/auth/signup
const signUp = asyncHandler(async (req, res) => {
    const {first_name, last_name, email, password, auth_source} = req.body;

    console.log(req.body)

    const userExists = await User.findOne({where: {email}});
    if (userExists) {
        res.status(400);
        throw new Error("This EMAIL is already in use. Use another email");
    }

    const newUser = await User.create({
        first_name,
        last_name,
        email,
        password,
        auth_source,
        verified: auth_source === 'google'
    });
    if (!newUser) {
        res.status(500)
        throw new Error('Failed to register user. Try again later')
    }

    // -- send verification email -- //
    // generating verification code
    const newToken = await Token.create({
        user_id: newUser.id,
        token: crypto.randomBytes(20).toString("hex"),
        action: 'email-verification',
        expires: Date.now() + 2 * 60 * 60 * 1000 // 2 hours
    })

    // send email
    await nodemailer.sendVerificationEmail(
        newUser.first_name,
        newUser.email,
        newToken.token
    )

    res.status(201).json({
        message:
            "Registered Successfully. Check your email to verify your account ",
    })
})

// @desc ---- Verify email
// route --POST-- [base_api]/auth/:userId/verify-email/:confirmationCode
const verifyEmail = asyncHandler(async (req, res) => {
    const {userId, verificationCode} = req.params

    const user = await User.findByPk(userId);
    const token = await Token.findOne({where: {token: verificationCode}})

    if (!user || !token) {
        res.status(404);
        throw new Error("Invalid/Expired link!");
    }

    user.verified = true
    await user.save()
    await token.destroy()

    const userName = `${user.first_name} ${user.last_name}`;
    const {accessToken} = tokenGenerator(
        res,
        user.id,
        userName,
        user.email,
        user.role
    );

    res.status(200)
        .json({message: "Email verified successfully"})
})

// @ desc ---- User Login -> set cookies(token)
// route  --POST-- [base_api]/auth/signIn
const signIn = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});

    if (!user) {
        res.status(404);
        throw new Error("Invalid credentials");
    }

    if(user.auth_source !== 'self'){
        res.status(400);
        throw new Error(`This email was registered via ${user.auth_source}. To login, use ${user.auth_source}`);
    }

    // -- send verification email if user is !verified
    if (!user.verified) {
        // --- destroy old token and assign a new one
        await Token.destroy({where: {user_id: user.id, action: 'email-verification'}})
        // await Token.save()

        // verification code
        const verificationCode = crypto.randomBytes(20).toString("hex")
        const newToken = await Token.create({
            user_id: user.id,
            token: verificationCode,
            action: 'email-verification',
            expires: Date.now() + 3 * 60 * 60 * 1000 // 3 hours
        })

        // send email
        await nodemailer.sendVerificationEmail(
            user.first_name,
            user.email,
            newToken.token
        )

        res.status(201).json({
            emailVerificationMessage:
                "Verification email sent to your inbox. Check your email to verify your account ",
        })
    }

    const userName = `${user.first_name} ${user.last_name}`;
    const {accessToken} = await tokenGenerator(
        res,
        user.id,
        userName,
        user.email,
        user.role
    );

    // compare password
    if (await user.matchPassword(password)) {
        return res.status(200).json({accessToken: accessToken});
    } else {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});

// @ desc ---- Logout user -> destroy cookies
// route  --POST-- [base_api]/auth/sign-out
const signOut = asyncHandler(async (req, res) => {
    res.cookie("x-access-token", " ", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(0),
    });
    res.cookie("refresh-token", " ", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(0),
    });

    res.status(200).json({message: "Logged Out"});
});

// -- Forgot & Reset Password -- //
const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({where: {email}});

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    } else {
        if (user.status !== "Active") {
            res.status(422);
            throw new Error(
                "You need to confirm your account first. Check your email for confirmation link"
            );
        }
        const resetToken = crypto.randomBytes(20).toString("hex");
        const expiresIn = Date.now() + 2 * 60 * 60 * 1000; // 2 hours

        // Update user with the new reset token and expiration time
        const updateUser = await user.update({
            access_code: resetToken,
            access_code_expires: new Date(expiresIn),
        });
        if (updateUser) {
            const sendMail = await sendResetPassword(
                user.email,
                user.first_name,
                user.access_code
            );
            if (!sendMail) {
                res.status(422);
                throw new Error("Failed to send mail verification");
            } else {
                res.status(201).json({
                    message: "Reset link sent. Check your email to reset your password ",
                });
            }
        } else {
            res.status(500);
            throw new Error("Server Error");
        }
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const {password, confirmPassword} = req.body;
    const token = req.params.resetToken;

    console.log(token, ">>>>", req.body);
    const user = await User.findOne({
        where: {
            access_code: token,
            access_code_expires: {[Op.gt]: Sequelize.fn("NOW")},
        },
    });
    if (!user) {
        res.status(400);
        throw new Error("Password reset link is invalid or has expired.");
    } else {
        if (password !== confirmPassword) {
            res.status(400);
            throw new Error("Passwords do not match");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await user.update({
                password: hashedPassword,
                access_code: null,
                access_code_expires: null,
            });
            res.status(200).json({message: "Your password has been reset"});
        }
    }
});

module.exports = {
    googleAuth,
    signUp,
    verifyEmail,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
}