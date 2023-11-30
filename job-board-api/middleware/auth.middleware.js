const JWT = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {

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
};

const authMiddleware = {
    verifyToken: verifyToken,
};
module.exports = authMiddleware;
