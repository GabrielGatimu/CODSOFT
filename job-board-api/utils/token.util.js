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


    return { accessToken, refreshToken };
}

module.exports = tokenGenerator
