const JWT = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')
const {User}  = require('../models')

const verifyToken = asyncHandler(async (req, res, next) => {
    const access_token =
        req.headers["x-access-token"] || req.cookies["x-access-token"]

    if (!access_token) {
        return res.status(403).json({
            success: false,
            message: "Missing Token",
        });
    }

    await JWT.verify(
        access_token,
        process.env["JWT_SECRET_ACCESS_TOKEN"],
        (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Unauthorized!");
            }

            // console.log(decoded)
            req.user = decoded;
            next();
        }
    );
})

const requireEmployer = asyncHandler(async (req, res, next) => {
    const user = await  User.findOne({where: {id: req.user.userId}});

    if (!user) {
        req.status(404);
        throw new Error("Unknown User!");
    } else {
        if (user.role !== 'employer') {
            res.status(403);
            throw new Error(
                "Forbidden! You must be an Employer to complete the action"
            );
        }
    }
    next();
})

const requireCandidate = asyncHandler(async (req, res, next) => {
    const user = await  User.findOne({where: {id: req.user.userId}});

    if (!user) {
        req.status(404);
        throw new Error("Unknown User!");
    } else {
        if (user.role !== 'candidate') {
            res.status(403);
            throw new Error(
                "Forbidden! You must be Candidate to complete the action"
            );
        }
    }
    next();
})

const authMiddleware = {
    verifyToken,
    requireEmployer,
    requireCandidate
};
module.exports = authMiddleware;
