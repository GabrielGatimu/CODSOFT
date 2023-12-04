const jwt = require("jsonwebtoken");
const { authConfig } = require('../config')

const tokenGenerator = async (res, userId, userName, email, role) => {
    const accessToken = await jwt.sign(
        {userId, userName, email, role},
        authConfig.jwt_access_token_secret,
        {
            expiresIn: "24h",
        }
    );

    const refreshToken = jwt.sign(
        {userId},
        authConfig.jwt_refresh_token_secret,
        {
            expiresIn: "14d",
        }
    );

    res.cookie("x-access-token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // -- 1 day
    });

    res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 14 * 24 * 60 * 60 * 1000, // -- 14 days
    });

    return { accessToken, refreshToken };
}

module.exports = tokenGenerator
