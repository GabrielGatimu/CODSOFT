const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {User} = require("../models");

// ---- Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const user = await User.findByPk(userId, {
        attributes: {
            exclude: [
                "password"
            ]
        }
    })

    if (!user){
        res.status(404)
        throw new Error('User not found')
    }
    res.status(200).json(user);
});

// ---- Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const user = await User.findByPk(userId);

    if (user) {
        if(req.body.email && (req.body.email !== user.email)){
            const existingEmail = await User.findOne({where: {email: req.body.email}})
            if (existingEmail){
                res.status(409)
                throw new Error('Such EMAIL is already in use. Use another one')
            }
        }
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await user.save();
        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            details: updatedUser
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// ---- Delete user profile
const deleteUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const user = await User.findByPk(userId);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const deletedUser = await user.destroy();

    if (deletedUser) {
        res.status(200).json({message: "Profile deleted successfully"});
    } else {
        res.status(500);
        throw new Error("Failed to delete user profile");
    }
});

module.exports = {
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}